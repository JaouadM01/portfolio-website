import type { ProjectImage } from '../types'
import mooiprijsje1 from '../assets/projecten/mooiprijsje1.webp'
import mooiprijsje2 from '../assets/projecten/mooiprijsje2.webp'
import mooiprijsje3 from '../assets/projecten/mooiprijsje3.webp'
import ilm1 from '../assets/projecten/3ilm1.webp'
import ilm2 from '../assets/projecten/3ilm2.webp'
import noveliya1 from '../assets/projecten/noveliya1.webp'
import noveliya2 from '../assets/projecten/noveliya2.webp'
import noveliya3 from '../assets/projecten/noveliya3.webp'
import sunnahmail from '../assets/projecten/sunnahmail.webp'
import ticketbuilder1 from '../assets/projecten/ticketbuilder1.webp'
import ticketbuilder2 from '../assets/projecten/ticketbuilder2.webp'
import ticketbuilder3 from '../assets/projecten/ticketbuilder3.webp'
import remindly1 from '../assets/projecten/remindly1.webp'
import remindly2 from '../assets/projecten/remindly2.webp'
import remindly3 from '../assets/projecten/remindly3.webp'
import remindly4 from '../assets/projecten/remindly4.webp'
import post1 from '../assets/projecten/post1.webp'
import post2 from '../assets/projecten/post2.webp'
import post3 from '../assets/projecten/post3.webp'
import post4 from '../assets/projecten/post4.webp'
import aichat1 from '../assets/projecten/aichat1.webp'

/** Screenshots per project-id. Projecten zonder screenshots krijgen een gegenereerde placeholder. */
export const projectImages: Readonly<Record<string, readonly ProjectImage[]>> = {
  mooiprijsje: [
    { src: mooiprijsje1, alt: 'Homepage van de Mooiprijsje-webshop met uitgelichte deals' },
    { src: mooiprijsje2, alt: 'Collectiepagina met accessoires en filters' },
    { src: mooiprijsje3, alt: 'Productpagina met prijs, voorraad en winkelwagenknop' },
  ],
  '3ilm': [
    { src: ilm1, alt: 'Dashboard met inschrijvingen: leerlingen, ouders, niveau en status' },
    { src: ilm2, alt: 'Maandelijks betalingsoverzicht met betaalde en openstaande bedragen' },
  ],
  noveliya: [
    { src: noveliya1, alt: 'Overzichtspagina van het Noveliya design document' },
    { src: noveliya2, alt: 'Tabblad Design System met kleuren en typografie' },
    { src: noveliya3, alt: "Tabblad Pages & UX met geannoteerde wireframes" },
  ],
  sunnahmail: [
    { src: sunnahmail, alt: 'Landingspagina van SunnahMail met het inschrijfformulier voor dagelijkse hadiths' },
  ],
  'ticket-abstractor': [
    { src: ticketbuilder1, alt: 'Startpagina van het ticketplatform met uitleg over het generieke API-model' },
    { src: ticketbuilder2, alt: 'Ticketformulier waarin type, evenement, datum, locatie en prijs worden ingevuld' },
    { src: ticketbuilder3, alt: 'Ticket Marketplace met tickets van verschillende typen' },
  ],
  remindly: [
    { src: remindly1, alt: 'Overzicht met herinneringsstatistieken en aankomende herinneringen' },
    { src: remindly2, alt: 'Maandkalender van juni 2025 met herinneringen per dag' },
    { src: remindly3, alt: 'Inlogscherm van Remind.ly' },
    { src: remindly4, alt: 'Profielpagina met account- en notificatie-instellingen' },
  ],
  byteheads: [
    { src: post2, alt: 'Productoverzicht met NFT’s in de ByteHeads-marktplaats' },
    { src: post4, alt: 'Detailpagina van NFT #007 met prijs en koopknop' },
    { src: post1, alt: 'Profielpagina met favorieten, eigen producten en aankoopgeschiedenis' },
    { src: post3, alt: 'Inlogscherm van ByteHeads met foutmelding bij ongeldige gegevens' },
  ],
  'leapforce-chatbot': [
    { src: aichat1, alt: 'Chatvenster van de Leapforce-chatbot dat een vraag over openingstijden beantwoordt' },
  ],
}

export function getProjectImages(id: string): readonly ProjectImage[] {
  return projectImages[id] ?? []
}
