import Reveal from './Reveal'

interface SectionHeaderProps {
  num: string
  title: string
  subtitle?: string
  /** id voor de h2, zodat de sectie ernaar kan verwijzen met aria-labelledby. */
  titleId: string
}

export default function SectionHeader({ num, title, subtitle, titleId }: SectionHeaderProps) {
  return (
    <Reveal className="section-header">
      <span className="section-ghost" aria-hidden="true">
        {num}
      </span>
      <div className="section-header__top" aria-hidden="true">
        <span className="section-num">{num}</span>
        <div className="section-line" />
      </div>
      <h2 className="section-title" id={titleId}>
        {title}
        <span className="section-title__dot" aria-hidden="true">
          .
        </span>
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </Reveal>
  )
}
