import type { ProjectImage } from '../types'
import mooiprijsjeHome from '../assets/projecten/mooiprijsje-home.webp'
import mooiprijsjeZoeken from '../assets/projecten/mooiprijsje-zoeken.webp'
import mooiprijsjeCollectie from '../assets/projecten/mooiprijsje-collectie.webp'
import mooiprijsjeProduct from '../assets/projecten/mooiprijsje-product.webp'
import ilmHome from '../assets/projecten/3ilm-home.webp'
import ilmInschrijven from '../assets/projecten/3ilm-inschrijven.webp'
import ilm1 from '../assets/projecten/3ilm1.webp'
import ilm2 from '../assets/projecten/3ilm2.webp'
import noveliyaHome from '../assets/projecten/noveliya-home.webp'
import noveliyaCollectie from '../assets/projecten/noveliya-collectie.webp'
import noveliyaProduct from '../assets/projecten/noveliya-product.webp'
import noveliyaAanpak from '../assets/projecten/noveliya-aanpak.webp'
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
    { src: mooiprijsjeHome, alt: 'Homepage van mooiprijsje.nl met speciale deals en de topdeals van de week' },
    { src: mooiprijsjeZoeken, alt: 'Live search op mooiprijsje.nl met productsuggesties voor de zoekterm iphone' },
    { src: mooiprijsjeCollectie, alt: 'Collectiepagina Schermen met filters op merk en model en sorteeropties' },
    { src: mooiprijsjeProduct, alt: 'Productpagina van een iPhone-scherm met prijs, voorraad en betaalmethoden' },
  ],
  '3ilm': [
    { src: ilmHome, alt: 'Homepage van arabischelessen.nl met de praktische informatie over de zondagles' },
    { src: ilmInschrijven, alt: 'Inschrijfformulier waarmee ouders een of meer kinderen aanmelden' },
    { src: ilm1, alt: 'Dashboard met inschrijvingen: leerlingen, ouders, niveau en status (testdata)' },
    { src: ilm2, alt: 'Maandelijks betalingsoverzicht met betaalde en openstaande bedragen (testdata)' },
  ],
  noveliya: [
    { src: noveliyaHome, alt: 'Homepage van noveliya.nl met de Black Friday-hero en aftelklok' },
    { src: noveliyaCollectie, alt: 'Sectie Kies jouw Élise met de vier kleuren van de kaptafel' },
    { src: noveliyaProduct, alt: 'Productpagina van de Élise-kaptafel met actieprijs, aftelklok en Klarna' },
    { src: noveliyaAanpak, alt: 'Sectie die de directe levering vergelijkt met de route via groothandel en winkel' },
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
