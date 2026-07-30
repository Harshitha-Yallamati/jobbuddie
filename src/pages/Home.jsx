import { ButtonLink, Hero, IconCard, SectionHeader } from '../components/Section.jsx';

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="AI-powered career guidance"
        title="Unlock Your Career Potential with Skill Matching"
        actions={(
          <>
            <ButtonLink href="/resume-analyzer" large><i className="fas fa-upload" /> Analyze My Resume</ButtonLink>
            <a className="btn btn--secondary btn--large" href="#features"><i className="fas fa-play" /> Learn More</a>
          </>
        )}
        visual={<CareerVisual />}
      >
        JobBuddy helps unemployed youth discover personalized career paths and skill-based training programs using resume insights, interests, and local job market trends.
      </Hero>

      <section className="section section--soft">
        <div className="container">
          <SectionHeader title="The Challenge We're Solving">
            Millions of young people struggle to find their career direction in today's rapidly evolving job market.
          </SectionHeader>
          <div className="grid grid--3">
            <IconCard icon="fas fa-question-circle" title="Unclear Career Paths" tone="red">Many youth do not know which careers align with their skills and interests.</IconCard>
            <IconCard icon="fas fa-chart-line" title="Skills Gap" tone="orange">Disconnect between available skills and market demand creates barriers to employment.</IconCard>
            <IconCard icon="fas fa-map-marked-alt" title="Local Market Ignorance" tone="green">Local job opportunities and trends are often hard to see without guidance.</IconCard>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="container">
          <SectionHeader title="How JobBuddy Helps">
            Personalized career guidance and skill development recommendations in one focused workflow.
          </SectionHeader>
          <div className="grid grid--4">
            <IconCard icon="fas fa-file-alt" title="Smart Resume Analysis" link={<a className="text-link" href="/resume-analyzer" data-route>Try Now <i className="fas fa-arrow-right" /></a>}>Upload your resume and let AI extract skills, experience, and growth potential.</IconCard>
            <IconCard icon="fas fa-lightbulb" title="Interest-Based Matching" tone="orange" link={<a className="text-link" href="/resume-analyzer" data-route>Get Started <i className="fas fa-arrow-right" /></a>}>Share what excites you and get matched with relevant opportunities.</IconCard>
            <IconCard icon="fas fa-graduation-cap" title="Skill Development Plans" tone="green" link={<a className="text-link" href="/skill-recommendations" data-route>View Sample <i className="fas fa-arrow-right" /></a>}>Bridge skill gaps with practical learning recommendations.</IconCard>
            <IconCard icon="fas fa-chart-bar" title="Local Job Trends" tone="purple" link={<a className="text-link" href="/skill-recommendations" data-route>Explore <i className="fas fa-arrow-right" /></a>}>Stay aware of roles, salary movement, and hiring demand in your area.</IconCard>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <SectionHeader title="How It Works">Get personalized career guidance in three simple steps.</SectionHeader>
          <div className="steps">
            {[
              ['Upload & Analyze', 'Upload your resume and share your interests so your profile can be analyzed comprehensively.', 'fas fa-upload'],
              ['AI Processing', 'Algorithms match your profile with career patterns and job-market signals.', 'fas fa-brain'],
              ['Get Recommendations', 'Receive career paths and skill plans tailored to your goals.', 'fas fa-target'],
            ].map(([title, copy, icon], index) => (
              <article className="step-card" key={title}>
                <span className="step-card__number">{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <i className={icon} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <Cta title="Ready to Discover Your Career Path?" button="Start Your Journey" />
    </>
  );
}

export function Cta({ title, button }) {
  return (
    <section className="cta">
      <div className="container cta__content">
        <h2>{title}</h2>
        <p>Join thousands of young professionals who have found direction with JobBuddy.</p>
        <ButtonLink href="/resume-analyzer" large><i className="fas fa-rocket" /> {button}</ButtonLink>
      </div>
    </section>
  );
}

function CareerVisual() {
  return (
    <div className="career-visual" aria-hidden="true">
      <div className="career-visual__node"><i className="fas fa-user-graduate" /></div>
      <div className="career-visual__path"><i className="fas fa-arrow-right" /></div>
      <div className="career-visual__node career-visual__node--accent"><i className="fas fa-briefcase" /></div>
    </div>
  );
}
