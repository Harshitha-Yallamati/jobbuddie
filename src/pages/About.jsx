import { ButtonLink, Hero, IconCard, SectionHeader } from '../components/Section.jsx';
import { Cta } from './Home.jsx';

export default function About() {
  const team = [
    ['Sarah Johnson', 'CEO & Co-Founder', 'Former HR executive with 15+ years in talent acquisition and career development.', 'fab fa-linkedin', 'fab fa-twitter'],
    ['Dr. Michael Chen', 'CTO & AI Lead', 'PhD in Machine Learning with expertise in NLP and career prediction algorithms.', 'fab fa-linkedin', 'fab fa-github'],
    ['Emily Rodriguez', 'Head of Product', 'UX specialist focused on intuitive career guidance experiences for youth.', 'fab fa-linkedin', 'fab fa-dribbble'],
    ['James Wilson', 'Data Scientist', 'Specialist in job market analytics and predictive modeling for career trends.', 'fab fa-linkedin', 'fab fa-kaggle'],
  ];

  return (
    <>
      <Hero compact eyebrow="About JobBuddy" title="Clearer career pathways for every young professional">
        We bridge the gap between talent and opportunity with AI-powered guidance, practical skill plans, and accessible career direction.
      </Hero>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Our mission</p>
            <h2>Helping people turn potential into employability</h2>
            <p>Every young person deserves a clear path to meaningful work. JobBuddy helps users discover their potential, develop relevant skills, and connect with career opportunities that match their interests and the evolving job market.</p>
            <div className="stats">
              <Stat value="10,000+" label="Youth Helped" />
              <Stat value="85%" label="Success Rate" />
              <Stat value="500+" label="Career Paths" />
            </div>
          </div>
          <div className="mission-panel" aria-hidden="true">
            <i className="fas fa-users" />
            <i className="fas fa-heart" />
            <i className="fas fa-rocket" />
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeader title="How Our AI Works">
            A transparent matching flow that turns profile data into actionable next steps.
          </SectionHeader>
          <div className="grid grid--4">
            <IconCard icon="fas fa-file-upload" title="Data Collection" tone="green">Resume skills, education, and experience patterns are extracted and organized.</IconCard>
            <IconCard icon="fas fa-brain" title="Natural Language Processing">Interests, aspirations, and preferences are interpreted from your input.</IconCard>
            <IconCard icon="fas fa-chart-line" title="Market Analysis" tone="orange">Job market trends, salary bands, and skill demand inform recommendations.</IconCard>
            <IconCard icon="fas fa-target" title="Personalized Matching" tone="purple">Your profile is matched with careers and customized learning priorities.</IconCard>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader title="Meet Our Team">
            Professionals dedicated to transforming career guidance through technology.
          </SectionHeader>
          <div className="grid grid--4">
            {team.map(([name, role, bio, socialA, socialB]) => (
              <article className="team-card" key={name}>
                <div className="avatar"><i className="fas fa-user-circle" /></div>
                <h3>{name}</h3>
                <p className="team-card__role">{role}</p>
                <p>{bio}</p>
                <div className="social-row">
                  <ButtonIcon icon={socialA} />
                  <ButtonIcon icon={socialB} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeader title="Our Values">The principles that guide everything we build at JobBuddy.</SectionHeader>
          <div className="grid grid--4">
            <IconCard icon="fas fa-handshake" title="Accessibility" tone="orange">Career guidance should be available to everyone.</IconCard>
            <IconCard icon="fas fa-lightbulb" title="Innovation">We keep evolving our technology to improve guidance quality.</IconCard>
            <IconCard icon="fas fa-shield-alt" title="Privacy" tone="green">Personal career data deserves careful protection.</IconCard>
            <IconCard icon="fas fa-users" title="Community" tone="purple">Growth is easier inside supportive professional ecosystems.</IconCard>
          </div>
        </div>
      </section>

      <Cta title="Ready to Start Your Career Journey?" button="Get Started Today" />
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function ButtonIcon({ icon }) {
  return <a className="icon-button" href="#" aria-label="Social profile"><i className={icon} /></a>;
}
