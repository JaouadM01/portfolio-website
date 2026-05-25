import { skills } from '../../data/skills'
import './Skills.css'

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills__inner">

        <div className="section-header">
          <span className="section-num">02</span>
          <h2 className="section-title">Skills</h2>
          <div className="section-line" />
        </div>

        <div className="skills__grid">
          {skills.map(group => (
            <div className="skills__group" key={group.category}>
              <span className={`skills__group-label skills__group-label--${group.color}`}>
                {group.category}
              </span>
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
