# Portfolio · Jaouad M'chichi

Single-page portfolio voor stagebedrijven, werkgevers en freelance klanten. Donker en tech-achtig, met een licht thema als
alternatief. De stijlregels staan in [`context/project-styledocument.html`](context/project-styledocument.html).

**Live:** [www.jaouadmchichi.nl](https://www.jaouadmchichi.nl)

**Stack:** React 19 · TypeScript · Vite 8 · Motion · Zod (`zod/mini`) · EmailJS · Vitest · Playwright · Caddy (eigen VPS)

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
| `npm run preview` | productiebuild lokaal bekijken, met dezelfde security-headers als in productie |
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
| `VITE_SITE_URL` | absolute URL voor canonical, Open Graph en sitemap. `deploy.ps1` zet hem zelf op `https://www.jaouadmchichi.nl` |
| `VITE_EMAILJS_SERVICE_ID` / `_TEMPLATE_ID` / `_PUBLIC_KEY` | contactformulier via EmailJS. Zonder deze drie wordt het een mailto-link |

EmailJS instellen:

- Gebruik in je template `{{from_name}}`, `{{reply_to}}`, `{{topic}}` en `{{message}}`. Gebruik dubbele accolades,
  geen drievoudige, zodat HTML in berichten ge-escaped wordt.
- Zet in het dashboard **Allowed origins** op je eigen domein.
- Zet er een **captcha** en een maandlimiet op. De public key staat in de browser, dus de limieten aan de serverkant
  zijn de echte bescherming tegen misbruik.

## Deployen (eigen VPS)

De site draait op een Ubuntu-VPS achter de centrale **Caddy**-proxy die daar alle domeinen bedient (`~/proxy`). Caddy
regelt HTTPS (Let's Encrypt, vernieuwt zelf), de security-headers, compressie en caching, en stuurt het verkeer door
naar de container `portfolio-web`, die alleen de statische bestanden serveert.

**Automatisch:** elke push naar `main` gaat via GitHub Actions (`.github/workflows/deploy.yml`) live, maar alleen als
typecheck, lint, tests en build slagen. De voortgang zie je in het tabblad *Actions*. Daar kan je ook handmatig een
deploy starten (*Deploy > Run workflow*).

De workflow gebruikt een eigen SSH-sleutel die op de server is vastgezet op `~/portfolio/receive-release.sh`
(`restrict,command=...` in `~/.ssh/authorized_keys`). Met die sleutel kan je dus alleen een release aanleveren, geen
shell openen. Repository-secrets: `DEPLOY_HOST` (`ubuntu@<ip>`), `DEPLOY_KEY` (privésleutel) en `DEPLOY_KNOWN_HOSTS`
(`ssh-keyscan -t ed25519 <ip>`). Sleutel intrekken: de regel `github-actions-deploy` uit `authorized_keys` halen.

**Handmatig** vanaf je eigen pc, bijvoorbeeld als GitHub plat ligt:

```powershell
.\deploy.ps1               # checks + build, uploaden, live zetten
.\deploy.ps1 -SkipChecks   # alleen build, zonder lint en tests
```

`deploy.ps1` bouwt met `VITE_SITE_URL=https://www.jaouadmchichi.nl`, pakt `dist/` uit in
`~/portfolio/site/releases/<tijdstip>` en zet de symlink `current` in één keer om. De laatste 5 releases blijven
bewaard. Terugrollen: `ln -sfn releases/<oudere-release> ~/portfolio/site/current` op de server.

Het script gebruikt de SSH-host `portfolio-vps`. Zet die in je eigen `~/.ssh/config` (het IP-adres hoort niet in deze
openbare repo):

```
Host portfolio-vps
    HostName <ip-van-de-vps>
    User ubuntu
```

| Bestand | Doel |
| --- | --- |
| `.github/workflows/deploy.yml` | automatische deploy bij elke push naar `main` |
| `deploy.ps1` | bouwen en uploaden, draait lokaal |
| `deploy/receive-release.sh` | ontvangt een release op de server en zet hem live (vast commando van de Actions-sleutel) |
| `deploy/compose.yaml` | container `portfolio-web` (`~/portfolio/compose.yaml` op de server) |
| `deploy/Caddyfile.snippet` | het blok voor dit domein in `~/proxy/Caddyfile` |
| `deploy/setup-server.sh` | eenmalige inrichting. Mag opnieuw na een wijziging in de twee bestanden hierboven: maakt een back-up van de Caddyfile, valideert en herlaadt Caddy zonder downtime |

Een wijziging in de server-config doorvoeren:

```powershell
ssh portfolio-vps "mkdir -p /tmp/portfolio-setup"
scp deploy/compose.yaml deploy/Caddyfile.snippet deploy/setup-server.sh deploy/receive-release.sh portfolio-vps:/tmp/portfolio-setup/
ssh portfolio-vps "bash /tmp/portfolio-setup/setup-server.sh"
```

### Security-headers

De headers staan op twee plekken die gelijk moeten blijven: `vercel.json` (bron voor `npm run preview` en de E2E-tests)
en `deploy/Caddyfile.snippet` (productie). Ze bevatten onder meer een strikte Content-Security-Policy. Voeg je een
externe dienst toe (analytics, een andere API), zet die host dan in beide bestanden bij `connect-src`, anders blokkeert
de browser hem. Omdat de preview dezelfde headers gebruikt, zie je zo'n probleem al lokaal.

`vercel.json` werkt ook nog als je de site ooit weer op Vercel wilt zetten: repo importeren, `VITE_EMAILJS_*` in de
projectinstellingen, klaar.

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
deploy/         server-config voor de VPS (container + Caddy-blok + inrichtingsscript)
context/        CV, design document en styleguide
```
