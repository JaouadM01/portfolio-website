export default function SectionHeader({ num, title, subtitle }) {
  return (
    <div className="section-header" data-reveal>
      <span className="section-ghost" aria-hidden="true">{num}</span>
      <div className="section-header__top">
        <span className="section-num">{num}</span>
        <div className="section-line" />
      </div>
      <h2 className="section-title">
        {title}<span className="section-title__dot">.</span>
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  )
}
