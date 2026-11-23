import type { Project } from '../types'

// Alleen tekst: afbeeldingen staan in projectImages.ts, zodat vite.config.ts
// deze data in Node kan importeren (voor llms.txt) zonder asset-imports.
export const projects: readonly Project[] = [
  {
    id: 'mooiprijsje',
    name: 'Mooiprijsje',
    tagline: 'Headless React-webshop die een Shopify-winkel als backend gebruikt.',
    description:
      "Betaalde opdracht: de React-versie van het Shopify-thema van mooiprijsje.nl. Zelfde design, dezelfde pagina's en dezelfde URL's, maar als losse frontend die producten en de winkelwagen via de Storefront API ophaalt. Afrekenen gebeurt op de beveiligde checkout van Shopify.",
    highlights: [
      'Demo-modus met voorbeeldproducten, of live gekoppeld aan de winkel via de Storefront API.',
      'Data ophalen met TanStack Query en externe data valideren met Zod.',
      'Tekst uit Shopify wordt gesaneerd met DOMPurify; Content-Security-Policy en security-headers via Vercel.',
      'Getest met Vitest en Testing Library, met een aparte typecheck in de build.',
    ],
    kind: 'freelance',
    period: '2026',
    tech: ['React 19', 'TypeScript', 'Vite', 'React Router 7', 'TanStack Query', 'Zod', 'Shopify Storefront API', 'Vitest'],
    github: 'https://github.com/JaouadM01/mooiprijsje-react',
    live: 'https://mooiprijsje-react.vercel.app',
    featured: true,
  },
  {
    id: '3ilm',
    name: '3ilm',
    tagline: 'Website en leerlingadministratie voor Arabische les aan kinderen in Gouda.',
    description:
      'Vrijwillige bijdrage aan een moskee in Gouda. Eén Next.js-applicatie met een publieke site en inschrijfformulier aan de voorkant, en een afgeschermd dashboard voor de leerlingadministratie aan de achterkant.',
    highlights: [
      'Inschrijvingen goedkeuren, leerlingen zoeken en filteren, en niveaus beheren.',
      'Maandelijks betalingsoverzicht met gezinskorting, logboek en CSV-export.',
      'WhatsApp-knop om ouders direct te bereiken vanuit het dashboard.',
      'Spamcontrole met Cloudflare Turnstile en een limiet op aanmeldingen per IP-adres.',
      'Draait in Docker met PostgreSQL en Caddy als reverse proxy.',
    ],
    kind: 'volunteer',
    period: '2026',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Zod', 'Docker', 'Caddy'],
    note: 'Privé-repository · de screenshots tonen testdata',
  },
  {
    id: 'noveliya',
    name: 'Noveliya design document',
    tagline: 'Interactief design document en UX-map voor een luxe Shopify-webshop.',
    description:
      'Freelance opdracht voor Noveliya, een webshop in luxe make-up-kaptafels voor de Nederlandse markt. Het document legt de visuele en UX-basis vast voor een Shopify-build op het Dawn-thema, gericht op advertentieverkeer dat mobiel binnenkomt.',
    highlights: [
      "Vijf tabbladen: overzicht, design system, pagina's met geannoteerde wireframes, user flows en e-mails.",
      'Doelgroepen, sitemap en funnel uitgewerkt rond advertenties die direct op de productpagina landen.',
      'Gebouwd zonder dependencies of buildstap: puur HTML, CSS en JavaScript.',
    ],
    kind: 'freelance',
    period: 'jul. 2026',
    tech: ['HTML', 'CSS', 'JavaScript', 'UX-design', 'Shopify (Dawn)'],
    github: 'https://github.com/JaouadM01/noveliya-design',
    live: 'https://noveliya-design.vercel.app',
  },
  {
    id: 'sunnahmail',
    name: 'SunnahMail',
    tagline: 'Nieuwsbriefplatform in Spring Boot met CQRS en Event Sourcing.',
    description:
      'Een Spring Boot-applicatie voor een e-mailnieuwsbrief met islamitische content (Sunnah). Bezoekers kunnen zich aan- en afmelden; beheerders werken in een beveiligd adminportaal.',
    highlights: [
      'Slice-gebaseerde architectuur met CQRS en Event Sourcing via Axon Framework.',
      'Adminportaal beveiligd met Spring Security en JWT-authenticatie.',
      'PostgreSQL voor opslag en Thymeleaf voor de server-side views.',
    ],
    kind: 'personal',
    period: '2026',
    tech: ['Java 21', 'Spring Boot', 'Axon Framework', 'PostgreSQL', 'JWT', 'Spring Security', 'Thymeleaf', 'Maven'],
    github: 'https://github.com/JaouadM01/SunnahMail',
  },
  {
    id: 'gatekeeper',
    name: 'Gatekeeper',
    tagline: 'Centraal authenticatie- en autorisatiesysteem met Axon Framework.',
    description:
      'Teamproject: een identity- en toegangsbeheerplatform dat gebruikersauthenticatie, roltoewijzing, applicatieregistratie en de levenscyclus van API-keys beheert.',
    highlights: [
      'CQRS en Event Sourcing via Axon Framework.',
      'Gebouwd met Spring Boot en PostgreSQL, gecontaineriseerd met Docker.',
      'Uitgebreid getest met JUnit 5 en Testcontainers.',
    ],
    kind: 'school',
    period: '2026',
    tech: ['Java 21', 'Spring Boot', 'Axon Framework', 'CQRS', 'Event Sourcing', 'PostgreSQL', 'JUnit 5', 'Docker'],
    note: 'Privé GitLab-repository',
  },
  {
    id: 'figlo-reporting',
    name: 'Figlo Reporting',
    tagline: "Low-code platform om PDF-rapporten van meerdere pagina's visueel te bouwen.",
    description:
      'Proof-of-concept tijdens mijn meeloopstage bij Vitec Figlo. Gebruikers stellen rapporten samen met drag-and-drop widgets en het platform rendert ze als PDF, met de nadruk op gebruiksvriendelijkheid en schaalbaarheid.',
    highlights: [
      'PDF-generatie met IronPDF: inhoudsopgave, kop- en voetteksten, paginaovergangen en Chart.js-grafieken.',
      'Rapporten importeren en exporteren als JSON.',
      'Backend-for-frontend-architectuur met FluentResults voor de foutafhandeling.',
    ],
    kind: 'internship',
    period: '2025 – 2026',
    tech: ['.NET 8', 'C#', 'Angular', 'IronPDF', 'Chart.js', 'Docker'],
    github: 'https://github.com/JaouadM01/Figlo-Reporting',
  },
  {
    id: 'ticket-abstractor',
    name: 'Ticket Abstractor',
    tagline: 'Ticketveilingplatform met een generieke API en een dynamische ticketbuilder.',
    description:
      'Bedrijven zetten overgebleven tickets om en bieden ze via een generieke API aan op een veilingplatform. Ontworpen om te schalen zonder apart datamodel per tickettype.',
    highlights: [
      'Generieke ASP.NET Core-API die elk tickettype aankan.',
      'Ticketbuilder in React waarmee gebruikers zelf tickettypes samenstellen.',
      'Volledige invoervalidatie met Zod en React Hook Form.',
    ],
    kind: 'personal',
    period: '2025',
    tech: ['React', 'TypeScript', 'Zod', 'ASP.NET Core', 'C#', 'SQLite'],
    github: 'https://github.com/JaouadM01/R-C-JS-ticketveilingopdracht',
  },
  {
    id: 'remindly',
    name: 'Remind.ly',
    tagline: 'Herinneringsapp met maandkalender en voortgangsregistratie.',
    description:
      'Full-stack webapplicatie voor persoonlijke herinneringen. Gebruikers registreren zich, maken herinneringen aan en zien ze terug in een maandkalender.',
    highlights: [
      'Elke herinnering markeren als onthouden of vergeten om gewoontes bij te houden.',
      'Eigen scoresysteem en een profielpagina met voortgang.',
      'Formulieren gevalideerd met Zod en React Hook Form.',
    ],
    kind: 'personal',
    period: '2025',
    tech: ['React', 'C#', '.NET', 'SQLite', 'Zod', 'React Hook Form'],
    github: 'https://github.com/JaouadM01/R-C-JS--Remind.ly',
  },
  {
    id: 'byteheads',
    name: 'ByteHeads NFT Marketplace',
    tagline: 'NFT-marktplaats met kopen, verkopen en profielbeheer.',
    description:
      "Full-stack marktplaats waarin gebruikers NFT's kopen, verkopen en toevoegen, met favorieten en aankoopgeschiedenis.",
    highlights: [
      'Veilige authenticatie met password hashing en rolgebaseerde toegang.',
      "REST API's die klaar zijn voor toekomstige dashboards.",
      'Favorieten, aankoopgeschiedenis en profielbeheer.',
    ],
    kind: 'personal',
    period: 'apr. – mei 2025',
    tech: ['React', 'C#', '.NET', 'SQL', 'REST API'],
    github: 'https://github.com/JaouadM01/R-C-JS--Webshop',
  },
  {
    id: 'leapforce-chatbot',
    name: 'Leapforce AI-chatbot',
    tagline: 'Klantassistent voor de website van Leapforce, aangedreven door Gemini.',
    description:
      'Interactieve chatbot voor de website van Leapforce die vragen beantwoordt over growth marketing, HubSpot-integraties, CRM en webdevelopment.',
    highlights: [
      'Natuurlijke taalverwerking via de Gemini API.',
      'Snelle, responsive interface gericht op klantcontact en leadgeneratie.',
    ],
    kind: 'freelance',
    period: '2025',
    tech: ['React', 'Vite', 'Gemini API'],
    github: 'https://github.com/JaouadM01/R-AIChatbot',
  },
]
