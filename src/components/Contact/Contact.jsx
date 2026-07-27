import photo1 from '../../assets/projecten/IMG_7276.jpeg'
import photo2 from '../../assets/projecten/IMG_7461.jpeg'
import SectionHeader from '../SectionHeader'
import './Contact.css'

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jaouad-m-chichi-267a02273/',
    mono: 'linkedin',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/JaouadM01',
    mono: 'github',
  },
  {
    label: 'GitLab',
    href: 'https://gitlab.com/Jaouad_M01',
    mono: 'gitlab',
  },
]

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__inner">

        <SectionHeader num="05" title="Contact" />

        <div className="contact__layout">

          <div className="contact__content" data-reveal>
            <p className="contact__label">Laten we samenwerken</p>
            <h3 className="contact__heading">
              Stage-aanvraag of freelance project?
              Stuur me een bericht.
            </h3>

            <a href="mailto:jaouadmchichi@hotmail.com" className="contact__email">
              <span className="contact__email-icon">&#9993;</span>
              jaouadmchichi@hotmail.com
            </a>

            <div className="contact__socials">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                >
                  <span className="social-btn__mono">{s.mono}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="contact__photos" data-reveal style={{ transitionDelay: '120ms' }}>
            <div className="contact__photo-wrap contact__photo-wrap--top">
              <img src={photo1} alt="Jaouad M'chichi" />
            </div>
            <div className="contact__photo-wrap contact__photo-wrap--bottom">
              <img src={photo2} alt="Jaouad M'chichi" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
