import { skills } from '../../data/skills'
import Reveal from '../Reveal'
import SectionHeader from '../SectionHeader'
import './Skills.css'

const STAGGER_S = 0.07

export default function Skills() {
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader
          num="01"
          title="Skills"
          titleId="skills-title"
          subtitle="Waar ik dagelijks mee bouw: van backend en databases tot frontend, testen en AI-integraties."
        />

        <ul className="skills__grid">
          {skills.map((group, i) => (
            <li key={group.category}>
              <Reveal className={`skills__group skills__group--${group.color}`} delay={i * STAGGER_S}>
                <div className="skills__group-head">
                  <span className="skills__group-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="skills__group-label">{group.category}</h3>
                  <span className="skills__group-count">{group.items.length}</span>
                </div>
                <ul className="skills__chips" aria-label={group.category}>
                  {group.items.map(skill => (
                    <li className="skill-chip" key={skill}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
