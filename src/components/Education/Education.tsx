import { Award, GraduationCap } from 'lucide-react'
import { certificates, education } from '../../data/education'
import Reveal from '../Reveal'
import SectionHeader from '../SectionHeader'
import './Education.css'

export default function Education() {
  return (
    <section className="section education" id="opleiding" aria-labelledby="opleiding-title">
      <div className="container">
        <SectionHeader
          num="04"
          title="Opleiding"
          titleId="opleiding-title"
          subtitle="HBO-ICT Software Development, aangevuld met certificaten en minors."
        />

        <div className="education__layout">
          <Reveal className="education__col">
            <h3 className="education__heading">
              <GraduationCap aria-hidden="true" />
              Opleiding
            </h3>
            <ul className="education__list">
              {education.map(item => (
                <li className={`edu-card${item.current ? ' edu-card--current' : ''}`} key={item.id}>
                  <div className="edu-card__head">
                    <p className="edu-card__title">{item.title}</p>
                    <span className="edu-card__period">{item.period}</span>
                  </div>
                  <p className="edu-card__institution">{item.institution}</p>
                  {item.note && <p className="edu-card__note">{item.note}</p>}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="education__col" delay={0.1}>
            <h3 className="education__heading">
              <Award aria-hidden="true" />
              Certificaten & minors
            </h3>
            <ul className="cert-list">
              {certificates.map(cert => (
                <li className="cert" key={cert.id}>
                  <p className="cert__title">{cert.title}</p>
                  {(cert.issuer || cert.year) && (
                    <p className="cert__meta">{[cert.issuer, cert.year].filter(Boolean).join(' · ')}</p>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
