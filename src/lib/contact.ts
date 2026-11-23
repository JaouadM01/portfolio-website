// zod/mini: dezelfde validatie als de klassieke API, maar tree-shakeable (veel kleinere bundle).
import * as z from 'zod/mini'

export const CONTACT_TOPICS = ['baan', 'freelance', 'anders'] as const
export type ContactTopic = (typeof CONTACT_TOPICS)[number]

export const topicLabels: Record<ContactTopic, string> = {
  baan: 'Baan of stage',
  freelance: 'Freelance project',
  anders: 'Iets anders',
}

export const NAME_MAX = 100
export const MESSAGE_MIN = 10
export const MESSAGE_MAX = 2000

export const contactSchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, 'Vul je naam in (minimaal 2 tekens).'),
      z.maxLength(NAME_MAX, `Je naam mag maximaal ${NAME_MAX} tekens zijn.`),
    ),
  email: z.pipe(
    z.string().check(z.trim()),
    z.email('Vul een geldig e-mailadres in, bijvoorbeeld naam@bedrijf.nl.'),
  ),
  topic: z.enum(CONTACT_TOPICS, { error: 'Kies waar je bericht over gaat.' }),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(MESSAGE_MIN, `Je bericht is wat kort: vertel iets meer (minimaal ${MESSAGE_MIN} tekens).`),
      z.maxLength(MESSAGE_MAX, `Je bericht mag maximaal ${MESSAGE_MAX} tekens zijn.`),
    ),
})

export type ContactValues = z.infer<typeof contactSchema>
export type ContactField = keyof ContactValues
export type FieldErrors = Partial<Record<ContactField, string>>

export type ValidationResult =
  | { success: true; data: ContactValues }
  | { success: false; errors: FieldErrors }

function isContactField(key: unknown): key is ContactField {
  return typeof key === 'string' && key in contactSchema.shape
}

/** Valideert ruwe formulierinvoer en geeft per veld de eerste foutmelding terug. */
export function validateContact(input: unknown): ValidationResult {
  const result = contactSchema.safeParse(input)
  if (result.success) return { success: true, data: result.data }

  const errors = result.error.issues.reduce<FieldErrors>((acc, issue) => {
    const field = issue.path[0]
    if (!isContactField(field) || acc[field]) return acc
    return { ...acc, [field]: issue.message }
  }, {})

  return { success: false, errors }
}

export interface EmailConfig {
  serviceId: string
  templateId: string
  publicKey: string
}

type EnvLike = Record<string, string | boolean | undefined>

/** EmailJS is optioneel: zonder alle drie de variabelen valt het formulier terug op mailto. */
export function getEmailConfig(env: EnvLike = import.meta.env): EmailConfig | null {
  const read = (key: string): string => {
    const value = env[key]
    return typeof value === 'string' ? value.trim() : ''
  }
  const serviceId = read('VITE_EMAILJS_SERVICE_ID')
  const templateId = read('VITE_EMAILJS_TEMPLATE_ID')
  const publicKey = read('VITE_EMAILJS_PUBLIC_KEY')

  return serviceId && templateId && publicKey ? { serviceId, templateId, publicKey } : null
}

export function buildMailtoUrl(values: ContactValues, to: string): string {
  const subject = `${topicLabels[values.topic]}: bericht van ${values.name}`
  const body = `${values.message}\n\n${values.name}\n${values.email}`
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export interface SendOptions {
  publicKey: string
  limitRate?: { id?: string; throttle?: number }
}

export type SendFn = (
  serviceId: string,
  templateId: string,
  params: Record<string, unknown>,
  options: SendOptions,
) => Promise<unknown>

/** EmailJS weigert met status 429 als de throttle hieronder geraakt wordt. */
export function isRateLimitError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'status' in error && error.status === 429
}

/** Minimaal 10 seconden tussen twee verzendingen vanuit dezelfde browser. */
const THROTTLE_MS = 10_000

/** Verstuurt het bericht via EmailJS. De SDK wordt pas geladen als iemand echt verstuurt. */
export async function sendWithEmailJs(
  values: ContactValues,
  config: EmailConfig,
  send?: SendFn,
): Promise<void> {
  const sender: SendFn = send ?? (await import('@emailjs/browser')).send
  await sender(
    config.serviceId,
    config.templateId,
    {
      from_name: values.name,
      reply_to: values.email,
      topic: topicLabels[values.topic],
      message: values.message,
    },
    { publicKey: config.publicKey, limitRate: { id: 'portfolio-contact', throttle: THROTTLE_MS } },
  )
}
