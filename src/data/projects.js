import sunnahmail from '../assets/projecten/sunnahmail.png'
import post1 from '../assets/projecten/post1.jpg'
import post2 from '../assets/projecten/post2.jpg'
import post3 from '../assets/projecten/post3.jpg'
import post4 from '../assets/projecten/post4.jpg'
import aichat1 from '../assets/projecten/aichat1.jpg'
import ticketbuilder1 from '../assets/projecten/ticketbuilder1.jpg'
import ticketbuilder2 from '../assets/projecten/ticketbuilder2.jpg'
import ticketbuilder3 from '../assets/projecten/ticketbuilder3.jpg'
import remindly1 from '../assets/projecten/remindly1.jpg'
import remindly2 from '../assets/projecten/remindly2.jpg'
import remindly3 from '../assets/projecten/remindly3.jpg'
import remindly4 from '../assets/projecten/remindly4.jpg'

export const projects = [
  {
    id: 1,
    name: 'ByteHeads NFT Marketplace',
    tagline: 'Schaalbare NFT-marktplaats met kopen, verkopen en profielbeheer.',
    description: 'Een full-stack NFT-marktplaats waarin gebruikers NFT\'s kunnen kopen, verkopen en toevoegen. Met favorieten, aankoopgeschiedenis en veilige authenticatie inclusief password hashing. Backend gebouwd met rolgebaseerde authenticatie en API\'s klaar voor toekomstige dashboards.',
    type: 'Persoonlijk',
    badge: 'personal',
    period: 'apr. 2025 – mei 2025',
    tech: ['React.js', 'C#', '.NET', 'SQL', 'REST API'],
    images: [post1, post2, post3, post4],
    github: 'https://github.com/JaouadM01/R-C-JS--Webshop',
    live: null,
  },
  {
    id: 2,
    name: 'Leapforce AI Chatbot',
    tagline: 'Slimme klantassistent aangedreven door de Gemini API.',
    description: 'Een interactieve chatbot ontwikkeld voor de website van Leapforce. Beantwoordt vragen over diensten zoals growth marketing, HubSpot-integraties, CRM en webdevelopment. De AI wordt aangestuurd door de Gemini API voor natuurlijke taalverwerking. Modern, snel en responsive interface gericht op klantinteractie en leadgeneratie.',
    type: 'Freelance',
    badge: 'freelance',
    period: '2025',
    tech: ['React.js', 'Vite', 'Gemini AI'],
    images: [aichat1],
    github: 'https://github.com/JaouadM01/R-AIChatbot',
    live: null,
  },
  {
    id: 3,
    name: 'Ticket Abstractor',
    tagline: 'Fullstack ticketveilingplatform met generieke API en dynamische builder.',
    description: 'Bedrijven kunnen overgebleven tickets omzetten en via een generieke API aanbieden op een veilingplatform. Ontworpen voor schaalbaarheid zonder apart datamodel per tickettype. Frontend Ticket Builder waarmee gebruikers dynamisch tickets aanmaken, met volledige inputvalidatie via Zod en React Hook Form.',
    type: 'Persoonlijk',
    badge: 'personal',
    period: '2025',
    tech: ['React.js', 'TypeScript', 'Zod', 'ASP.NET Core', 'C#', 'SQLite'],
    images: [ticketbuilder1, ticketbuilder2, ticketbuilder3],
    github: 'https://github.com/JaouadM01/R-C-JS-ticketveilingopdracht',
    live: null,
  },
  {
    id: 4,
    name: 'Remind.ly',
    tagline: 'Smart reminder app met maandkalender en voortgangsregistratie.',
    description: 'Full-stack webapplicatie voor het beheren van persoonlijke herinneringen. Gebruikers kunnen registreren, inloggen, herinneringen aanmaken en bekijken in een maandkalender. Elke herinnering kan gemarkeerd worden als onthouden of vergeten om gewoontes bij te houden. Met een custom scoringssysteem en profielpagina.',
    type: 'Persoonlijk',
    badge: 'personal',
    period: '2025',
    tech: ['React.js', 'C#', '.NET', 'SQLite', 'Zod', 'React Hook Form'],
    images: [remindly1, remindly2, remindly3, remindly4],
    github: 'https://github.com/JaouadM01/R-C-JS--Remind.ly',
    live: null,
  },
  {
    id: 5,
    name: 'SunnahMail',
    tagline: 'Spring Boot nieuwsbriefplatform voor islamitische content met Axon Framework.',
    description: 'Een Spring Boot webapplicatie voor het beheren van een e-mailnieuwsbrief op basis van islamitische content (Sunnah). Gebruikers kunnen zich abonneren en afmelden. Beheerders beheren het platform via een beveiligd adminportaal met JWT-authenticatie. Slice-gebaseerde architectuur met CQRS en Event Sourcing via Axon Framework.',
    type: 'Persoonlijk',
    badge: 'personal',
    period: '2026',
    tech: ['Java 21', 'Spring Boot', 'Axon Framework', 'PostgreSQL', 'JWT', 'Spring Security', 'Thymeleaf', 'Maven'],
    images: [sunnahmail],
    github: 'https://github.com/JaouadM01/SunnahMail',
    live: null,
  },
  {
    id: 6,
    name: 'Gatekeeper',
    tagline: 'Gecentraliseerd authenticatie- en autorisatiesysteem met Axon Framework.',
    description: 'Teamproject: een gecentraliseerd identity- en toegangsbeheerplatform gebouwd met CQRS en Event Sourcing via Axon Framework. Beheert gebruikersauthenticatie, roltoewijzing, applicatieregistratie en API key lifecycle management. Gebouwd met Spring Boot en PostgreSQL, uitgebreid getest met JUnit 5 en Testcontainers.',
    type: 'Schoolproject',
    badge: 'school',
    period: '2026',
    tech: ['Java 21', 'Spring Boot', 'Axon Framework', 'CQRS', 'Event Sourcing', 'PostgreSQL', 'Maven', 'JUnit 5', 'Docker'],
    images: [],
    github: null,
    live: null,
    note: 'Private GitLab repository',
  },
]
