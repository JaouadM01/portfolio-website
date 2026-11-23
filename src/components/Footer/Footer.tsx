import { ArrowUp } from 'lucide-react'
import { navItems } from '../../data/navigation'
import { site, socials } from '../../data/site'
import BrandIcon from '../BrandIcons'
import './Footer.css'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <a href="#intro" className="footer__logo">
            jm<span aria-hidden="true">();</span>
            <span className="sr-only">{site.name}, naar boven</span>
          </a>
          <p className="footer__copy">
            © {YEAR} {site.name}. Gebouwd met React, TypeScript en Motion.{' '}
            <a href={site.sourceCode} target="_blank" rel="noopener noreferrer">
              Bekijk de broncode
              <span className="sr-only"> (opent in nieuw tabblad)</span>
            </a>
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="footer__nav">
            {navItems.map(item => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__end">
          <ul className="footer__socials">
            {socials.map(social => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  aria-label={`${social.label} (opent in nieuw tabblad)`}
                >
                  <BrandIcon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>
          <a href="#intro" className="footer__top">
            Naar boven
            <ArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
