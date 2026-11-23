import type { Project } from '../types'

// Alleen tekst: afbeeldingen staan in projectImages.ts, zodat vite.config.ts
// deze data in Node kan importeren (voor llms.txt) zonder asset-imports.
export const projects: readonly Project[] = [
  {
    id: 'mooiprijsje',
    name: 'mooiprijsje.nl',
    tagline: 'Vernieuwde Shopify-webshop voor telefoonschermen, onderdelen en accessoires.',
    description:
      'Betaalde opdracht: de vernieuwing van mooiprijsje.nl, de webshop van telefoonwinkel Repair IT in Hoogezand. De oude winkel was opgebouwd als landingspagina voor één product, met kapotte secties, nep-reviews en Engelse teksten. Na een audit en een design document heb ik een volledig nieuw Shopify-thema gebouwd, dat nu live staat.',
    highlights: [
      'Audit van de oude winkel (29 fouten), design document en offerte voordat er gebouwd werd.',
      'Eigen Online Store 2.0-thema in Liquid met secties en JSON-templates, ontwikkeld met de Shopify CLI en git; het oude thema bleef als back-up staan.',
      'Live search met suggesties voor producten, categorieën en pagina’s, te bedienen met toetsenbord en schermlezer.',
      'Collectie- en zoekpagina’s met filters op merk en model en sorteren op prijs en relevantie.',
      'Huisstijl in donkerblauw en oranje met WCAG AA-contrast, Nederlandse teksten, USP’s, reviews en een WhatsApp-knop.',
      'Daarnaast een headless React- en TypeScript-versie gebouwd als proof of concept op de Storefront API.',
    ],
    kind: 'freelance',
    period: '2026',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS', 'Shopify CLI', 'Git', 'React', 'TypeScript'],
    github: 'https://github.com/JaouadM01/mooiprijsje-react',
    live: 'https://mooiprijsje.nl',
    note: 'Het Shopify-thema is privé; de GitHub-link toont de headless React-versie',
    featured: true,
  },
  {
    id: 'devex-meting',
    name: 'Developer Experience-meting',
    tagline: 'Backend die developer experience en softwarelevering meetbaar maakt voor zo’n 40 developers.',
    description:
      'Afstudeeropdracht bij New Story. Het systeem combineert data uit GitHub, Bitbucket en Jira met een periodieke enquête onder developers, zodat per team zichtbaar wordt hoe developers hun werk ervaren en hoe de softwarelevering zich over tijd ontwikkelt. Een voorspelmodel projecteert de trends.',
    highlights: [
      'Meetstelsel onderbouwd met knock-outcriteria en een beslismatrix: DORA voor de softwarelevering, het DevEx Framework voor de enquête, getoetst met SPACE.',
      'Koppelingen met de REST-API’s van GitHub, Bitbucket en Jira, met per bron een eigen vertaallaag, zodat de rekenregels voor elke bron hetzelfde blijven.',
      'Historie gefaseerd en hervatbaar inladen, binnen de rate-limits van de API’s.',
      'Pseudonimisering met HMAC-SHA256; de API rapporteert alleen per team, nooit per persoon.',
      'Enquêtesysteem met inloggen, uitnodigingen en herinneringen per mail; het voorspelmodel draait als losse Python-batch.',
    ],
    kind: 'internship',
    period: 'aug. 2026 – jan. 2027',
    tech: ['Go', 'Python', 'REST API', 'GitHub API', 'Bitbucket API', 'Jira API', 'DORA', 'DevEx', 'Coolify'],
    note: 'Intern project bij New Story, loopt tot januari 2027 · code en screenshots zijn niet openbaar',
  },
  {
    id: '3ilm',
    name: '3ilm · arabischelessen.nl',
    tagline: 'Website, leerlingadministratie en leerapp voor Arabische les aan kinderen in Gouda.',
    description:
      'Vrijwillige bijdrage aan een moskee in Gouda. Eén Next.js-applicatie voor de hele school: een publieke site waar ouders hun kinderen inschrijven, een ouderportaal, een leerapp waarmee kinderen thuis en in de klas oefenen, en een afgeschermd dashboard voor de administratie.',
    highlights: [
      'Publieke site met lesprogramma, tarieven, extra diensten en een inschrijfformulier waarmee ouders meerdere kinderen tegelijk aanmelden; de gezinskorting wordt automatisch berekend.',
      'Leerapp met het Arabische alfabet, de Qaida Noorania, woorden lezen, hardop lezen en soera’s, met voortgang, examens en een ranglijst. Ouders loggen in via hun ouderportaal, de klas via een eigen klaslogin.',
      'Dashboard om inschrijvingen goed te keuren, niveaus en aanwezigheid bij te houden, ouders via WhatsApp te bereiken en een maandelijks betalingsoverzicht met CSV-export te beheren.',
      'Draait in Docker met PostgreSQL en Caddy als reverse proxy.',
    ],
    kind: 'volunteer',
    period: '2026',
    tech: ['Next.js', 'TypeScript', 'React', 'PostgreSQL', 'Zod', 'Docker', 'Caddy'],
    live: 'https://arabischelessen.nl',
    note: 'Privé-repository · de dashboard-screenshots tonen testdata',
  },
  {
    id: 'noveliya',
    name: 'Noveliya',
    tagline: 'Shopify-webshop voor een luxe make-uptafel met dimbare LED-spiegel.',
    description:
      'Freelance opdracht voor Noveliya, een merk in luxe make-uptafels voor de Nederlandse markt. Eerst heb ik een design document en UX-map gemaakt, gericht op advertentieverkeer dat mobiel direct op de productpagina binnenkomt. Daarna is de winkel gebouwd op Shopify, met het Dawn-thema als basis en eigen secties.',
    highlights: [
      'Design document en UX-map vooraf: doelgroepen, design system, geannoteerde wireframes, user flows en e-mails.',
      'Eigen secties op Dawn: een hero met aftelklok voor acties, een kleurkeuze voor de vier uitvoeringen, productspecificaties en levering in vier stappen.',
      'Productpagina met actieprijs, betalen in drie termijnen via Klarna, veelgestelde vragen en een sectie die de directe levering vergelijkt met groothandel en winkel.',
      'Sticky winkelwagenbalk, nieuwsbrief-popup met korting en een mobile-first opbouw voor bezoekers uit advertenties.',
    ],
    kind: 'freelance',
    period: '2026',
    tech: ['Shopify', 'Liquid', 'Dawn', 'JavaScript', 'CSS', 'UX-design'],
    live: 'https://www.noveliya.nl',
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
      'Getest met JUnit 5.',
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
