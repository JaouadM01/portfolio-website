import { ChevronDown } from 'lucide-react'
import { experience } from '../../data/experience'
import { experienceKindLabels } from '../../data/labels'
import type { ExperienceItem, ExperienceKind } from '../../types'
import Reveal from '../Reveal'
import SectionHeader from '../SectionHeader'
import './Experience.css'

const STAGGER_S = 0.06
const MAX_STAGGERED = 4

const mainItems = experience.filter(item => !item.sideJob)
const sideJobs = experience.filter(item => item.sideJob)
const legendKinds: readonly ExperienceKind[] = [...new Set(mainItems.map(item => item.kind))]

function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
  return (
    <li className="tl-item">
      <Reveal delay={Math.min(index, MAX_STAGGERED) * STAGGER_S} className="tl-item__inner">
        <div className="tl-dot-col" aria-hidden="true">
          <span className={`tl-dot tl-dot--${item.kind}`} />
        </div>
        <article className="tl-card">
          <header className="tl-head">
            <div className="tl-head-left">
              <h3 className="tl-role">{item.role}</h3>
              <span className={`badge badge--${item.kind}`}>{item.typeLabel}</span>
            </div>
            {item.period && <span className="tl-period">{item.period}</span>}
          </header>
          <p className="tl-meta">
            <span className="tl-company">{item.company}</span>
            {item.location && <span className="tl-location">{item.location}</span>}
          </p>
          {item.bullets.length > 0 && (
            <ul className="tl-bullets">
              {item.bullets.map(bullet => (
                <li className="tl-bullet" key={bullet}>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </article>
      </Reveal>
    </li>
  )
}

export default function Experience() {
  return (
    <section className="section section--alt experience" id="ervaring" aria-labelledby="ervaring-title">
      <div className="container experience__inner">
        <SectionHeader
          num="03"
          title="Ervaring"
          titleId="ervaring-title"
          subtitle="Stages, freelance opdrachten en vrijwilligerswerk, met mijn bijbanen naast de studie onderaan."
        />

        <Reveal>
          <ul className="experience__legend" aria-label="Legenda">
            {legendKinds.map(kind => (
              <li className="legend-item" key={kind}>
                <span className={`tl-dot tl-dot--${kind} legend-dot`} aria-hidden="true" />
                {experienceKindLabels[kind]}
              </li>
            ))}
          </ul>
        </Reveal>

        <ol className="timeline">
          {mainItems.map((item, i) => (
            <TimelineItem item={item} index={i} key={item.id} />
          ))}
        </ol>

        {sideJobs.length > 0 && (
          <Reveal>
            <details className="side-jobs">
              <summary className="side-jobs__summary">
                <span>
                  Bijbanen naast mijn studie
                  <span className="side-jobs__count">{sideJobs.length}</span>
                </span>
                <ChevronDown className="side-jobs__chevron" aria-hidden="true" />
              </summary>
              <ul className="side-jobs__list">
                {sideJobs.map(job => (
                  <li className="side-job" key={job.id}>
                    <div>
                      <p className="side-job__role">{job.role}</p>
                      <p className="side-job__company">
                        {job.company}
                        {job.location && ` · ${job.location}`}
                      </p>
                    </div>
                    {job.period && <span className="tl-period">{job.period}</span>}
                  </li>
                ))}
              </ul>
              <p className="side-jobs__note">
                Naast mijn studie werk ik al sinds 2018: van kassa en verkoop tot presenteren en bezorgen.
              </p>
            </details>
          </Reveal>
        )}
      </div>
    </section>
  )
}
