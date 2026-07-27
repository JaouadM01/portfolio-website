import { experience } from '../../data/experience'
import SectionHeader from '../SectionHeader'
import './Experience.css'

const legend = [
  { badge: 'stage', dot: 'stage', label: 'Stage' },
  { badge: 'dev',   dot: 'dev',   label: 'Developer' },
  { badge: 'work',  dot: 'work',  label: 'Werkervaring' },
]

export default function Experience() {
  return (
    <section className="experience" id="ervaring">
      <div className="experience__inner">

        <SectionHeader
          num="03"
          title="Ervaring"
          subtitle="Van stage en development tot werkervaring naast mijn studie."
        />

        <div className="experience__legend" data-reveal>
          {legend.map(item => (
            <div className="legend-item" key={item.label}>
              <span className={`legend-dot legend-dot--${item.dot}`} />
              <span className="legend-label">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="timeline">
          {experience.map((item, i) => (
            <div
              className="tl-item"
              key={item.id}
              data-reveal
              style={{ transitionDelay: `${Math.min(i, 4) * 70}ms` }}
            >
              <div className="tl-dot-col">
                <div className="tl-dot">
                  <div className={`tl-dot-inner tl-dot-inner--${item.badge}`} />
                </div>
              </div>
              <div className="tl-card">
                <div className="tl-head">
                  <div className="tl-head-left">
                    <span className="tl-role">{item.role}</span>
                    <span className={`tl-badge tl-badge--${item.badge}`}>{item.type}</span>
                  </div>
                  <span className="tl-period">{item.period}</span>
                </div>
                <div className="tl-meta">
                  <span className="tl-company">{item.company}</span>
                  <span className="tl-location">{item.location}</span>
                </div>
                {item.bullets.length > 0 && (
                  <ul className="tl-bullets">
                    {item.bullets.map((bullet, i) => (
                      <li className="tl-bullet" key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
