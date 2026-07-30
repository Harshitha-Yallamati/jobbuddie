export function Hero({ eyebrow, title, children, actions, visual, compact = false }) {
  return (
    <section className={`hero ${compact ? 'hero--compact' : ''}`}>
      <div className="container hero__grid">
        <div className="hero__content">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {children && <p className="hero__copy">{children}</p>}
          {actions && <div className="hero__actions">{actions}</div>}
        </div>
        {visual && <div className="hero__visual">{visual}</div>}
      </div>
    </section>
  );
}

export function SectionHeader({ title, children }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function IconCard({ icon, title, children, tone = 'blue', link }) {
  return (
    <article className="card reveal-card">
      <span className={`icon-badge icon-badge--${tone}`}><i className={icon} /></span>
      <h3>{title}</h3>
      <p>{children}</p>
      {link}
    </article>
  );
}

export function ButtonLink({ href, children, variant = 'primary', large = false }) {
  return (
    <a className={`btn btn--${variant} ${large ? 'btn--large' : ''}`} href={href} data-route>
      {children}
    </a>
  );
}
