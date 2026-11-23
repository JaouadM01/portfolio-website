# Portfolio · Jaouad M'chichi

Single-page portfolio voor stagebedrijven, werkgevers en freelance klanten. Donker en tech-achtig, met een licht thema als
alternatief. De stijlregels staan in [`context/project-styledocument.html`](context/project-styledocument.html).

**Stack:** React 19 · TypeScript · Vite 8 · Motion · Zod (`zod/mini`) · EmailJS · Vitest · Playwright · Vercel

## Wat erin zit

- **Hero** met typewriter, een code-kaart die meebeweegt met de muis en statistieken die uit de data berekend worden
- **Projecten** met filters per type (freelance, stage, vrijwillig, persoonlijk, school), een uitgelicht project en een
  detail-dialoog met galerij. Elk project heeft een deelbare link (`/#project-mooiprijsje`)
- **Ervaring** als tijdlijn, met de bijbanen ingeklapt onderaan
- **Opleiding & certificaten**
- **Contactformulier** met validatie, een honeypot tegen spam en verzending via EmailJS. Zonder EmailJS-configuratie
  valt het terug op een `mailto:`-link
- **Licht/donker thema** dat het systeemthema volgt, de keuze onthoudt en niet flitst bij het laden
- **Toegankelijk:** skip-link, toetsenbordbediening, native `<dialog>`, `prefers-reduced-motion`, contrast ≥ 4.5:1
- **SEO:** meta- en Open Graph-tags, JSON-LD (`Person`), plus `robots.txt`, `sitemap.xml` en `llms.txt`, die bij de
  build gegenereerd worden

## Snel starten

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

| Commando | Doel |
| --- | --- |
| `npm run dev` | ontwikkelserver |
| `npm run build` | typecheck + productiebuild in `dist/` |
| `npm run preview` | productiebuild lokaal bekijken, met dezelfde security-headers als op Vercel |
| `npm test` | unit- en componenttests (Vitest + Testing Library) |
| `npm run coverage` | tests met coverage (drempel 80%) |
| `npm run test:e2e` | end-to-end tests (Playwright, desktop + mobiel) tegen de productiebuild |
| `npm run lint` | ESLint |
| `npm run images` | nieuwe screenshots in `src/assets/` omzetten naar geoptimaliseerde WebP |
| `npm run check` | typecheck, lint, tests en build achter elkaar |

De E2E-tests gebruiken standaard je geïnstalleerde Chrome. In CI: `npx playwright install chromium`.

## Inhoud aanpassen

Alle tekst staat in `src/data/`, los van de componenten:

| Bestand | Inhoud |
| --- | --- |
| `site.ts` | naam, rol, beschikbaarheid, e-mail, socials, typewriter-rollen |
| `projects.ts` | projecten (tekst). Precies één project heeft `featured: true` |
| `projectImages.ts` | screenshots per project-id, elk met alt-tekst |
| `experience.ts` | tijdlijn. Met `sideJob: true` komt een item bij de ingeklapte bijbanen |
| `skills.ts`, `education.ts` | skills, opleiding en certificaten |

Een nieuw project toevoegen:

1. Zet de screenshots in `src/assets/projecten/` en draai `npm run images`.
2. Voeg het project toe aan `projects.ts` en de afbeeldingen aan `projectImages.ts`.
3. Draai `npm test`. `src/data/data.test.ts` controleert unieke ids, alt-teksten en links.

## Omgevingsvariabelen

Kopieer `.env.example` naar `.env.local`. Alles is optioneel:

| Variabele | Waarvoor |
| --- | --- |
| `VITE_SITE_URL` | absolute URL voor canonical, Open Graph en sitemap. Op Vercel mag je hem leeg laten |
| `VITE_EMAILJS_SERVICE_ID` / `_TEMPLATE_ID` / `_PUBLIC_KEY` | contactformulier via EmailJS. Zonder deze drie wordt het een mailto-link |

EmailJS instellen:

- Gebruik in je template `{{from_name}}`, `{{reply_to}}`, `{{topic}}` en `{{message}}`. Gebruik dubbele accolades,
  geen drievoudige, zodat HTML in berichten ge-escaped wordt.
- Zet in het dashboard **Allowed origins** op je eigen domein.
- Zet er een **captcha** en een maandlimiet op. De public key staat in de browser, dus de limieten aan de serverkant
  zijn de echte bescherming tegen misbruik.

## Deployen (Vercel)

1. Importeer de GitHub-repo in Vercel. Framework, build-commando en output staan al in `vercel.json`.
2. Zet eventueel de `VITE_EMAILJS_*`-variabelen in de projectinstellingen.
3. Elke push naar `main` wordt automatisch gedeployed.

`vercel.json` zet onder meer een strikte Content-Security-Policy. Voeg je een externe dienst toe (analytics, een andere
API), zet die host dan bij `connect-src`, anders blokkeert de browser hem. `npm run preview` en de E2E-tests gebruiken
dezelfde headers, dus zo'n probleem zie je al lokaal.

## Structuur

```
src/
  components/   een map per sectie (component + CSS), plus gedeelde onderdelen
  data/         alle inhoud
  hooks/        useTheme, useTypewriter, useActiveSection
  lib/          contactformulier (validatie + verzenden), projectlinks
  styles/       global.css: design tokens voor donker en licht thema, reset, knoppen, badges
  test/         testsetup en render-helper
e2e/            Playwright-tests
scripts/        beeldoptimalisatie
context/        CV, design document en styleguide
```
