import { skills } from '../../data/skills'
import SectionHeader from '../SectionHeader'
import './Skills.css'

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills__inner">

        <SectionHeader
          num="02"
          title="Skills"
          subtitle="Waar ik dagelijks mee bouw — van backend tot AI-integraties."
        />

        <div className="skills__grid">
          {skills.map((group, i) => (
            <div
              className="skills__group"
              key={group.category}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="skills__group-head">
                <span className="skills__group-num">{String(i + 1).padStart(2, '0')}</span>
                <span className={`skills__group-label skills__group-label--${group.color}`}>
                  {group.category}
                </span>
                <span className="skills__group-count">{group.items.length} tools</span>
              </div>
              <div className="skills__chips">
                {group.items.map(item => (
                  <span className={`skill-chip skill-chip--${group.color}`} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
