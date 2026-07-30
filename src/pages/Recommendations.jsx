import { useEffect, useMemo, useState } from 'react';
import { Hero, SectionHeader } from '../components/Section.jsx';
import { useToast } from '../components/ToastProvider.jsx';
import { learningContent, resources, skillPlans } from '../data.js';

export default function Recommendations() {
  const { notify } = useToast();
  const [modal, setModal] = useState(null);
  const [completed, setCompleted] = useState(() => JSON.parse(localStorage.getItem('jobBuddyCompletions') || '{}'));
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    localStorage.setItem('jobBuddyCompletions', JSON.stringify(completed));
    const total = skillPlans.reduce((sum, skill) => sum + skill.path.length, 0);
    const done = Object.values(completed).filter(Boolean).length;
    localStorage.setItem('jobBuddyProgress', String(Math.round((done / total) * 100)));
  }, [completed]);

  const summary = useMemo(() => {
    const formData = JSON.parse(localStorage.getItem('jobBuddyFormData') || '{}');
    const actionPlanData = JSON.parse(localStorage.getItem('actionPlanData') || '{}');
    return {
      name: actionPlanData.name || 'Alex Johnson',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      score: formData.careerInterests ? '88% Match Score' : '85% Match Score',
    };
  }, []);

  const careerPaths = useMemo(() => {
    const actionPlanData = JSON.parse(localStorage.getItem('actionPlanData') || '{}');
    return actionPlanData.dynamicCareerPaths || [];
  }, []);

  const openLearning = (careerTitle) => {
    setModal({
      title: `Learning Path: ${careerTitle}`,
      body: (
        <div className="modal-list">
          {(learningContent[careerTitle] || [['Detailed learning path', 'Coming soon.']]).map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      ),
    });
  };

  const openResources = (skillTitle) => {
    setModal({
      title: `${skillTitle} Resources`,
      body: (
        <ul className="resource-list">
          {(resources[skillTitle] || []).map((item) => {
            const resource = typeof item === 'string' ? { title: item, url: '#' } : item;
            return (
              <li key={`${resource.provider || 'Resource'}-${resource.title}`}>
                <a href={resource.url} target="_blank" rel="noreferrer">
                  {resource.provider ? `${resource.provider}: ${resource.title}` : resource.title}
                </a>
              </li>
            );
          })}
        </ul>
      ),
    });
  };

  const downloadActionPlan = () => {
    notify('Generating your personalized action plan...', 'info');
    window.setTimeout(() => {
      const element = document.createElement('a');
      element.href = `data:text/plain;charset=utf-8,${encodeURIComponent(generateActionPlanText())}`;
      element.download = 'JobBuddy_Action_Plan.txt';
      document.body.appendChild(element);
      element.click();
      element.remove();
      notify('Action plan downloaded successfully!', 'success');
    }, 900);
  };

  return (
    <>
      <Hero compact eyebrow="Skill Recommendations" title="Your Personalized Career Recommendations">
        Based on AI analysis of your resume and interests, here are tailored career paths and skill development opportunities.
      </Hero>

      <section className="summary-strip">
        <div className="container summary-strip__grid">
          <span><i className="fas fa-user" /> {summary.name}</span>
          <span><i className="fas fa-calendar" /> Analyzed on {summary.date}</span>
          <span><i className="fas fa-chart-line" /> {summary.score}</span>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeader title="Recommended Career Paths">
            Top career opportunities that align with your skills and interests.
          </SectionHeader>
          <div className="grid grid--3 align-stretch">
            {careerPaths.length > 0 ? (
              careerPaths.map((career) => (
                <article className={`career-card ${career.featured ? 'featured' : ''}`} key={career.id || career.title}>
                  {career.featured && <span className="badge">Best Match</span>}
                  <div className="career-card__top">
                    <span className="icon-badge"><i className={career.icon || 'fas fa-briefcase'} /></span>
                    <div className="score"><strong>{career.match}%</strong><span>Match</span></div>
                  </div>
                  <h3>{career.title}</h3>
                  <p>{career.description}</p>
                  <div className="detail-list">
                    {(career.details || []).map((detail, index) => (
                      <span key={index}>
                        <i className={['fas fa-dollar-sign', 'fas fa-chart-line', 'fas fa-map-marker-alt'][index % 3]} /> {detail}
                      </span>
                    ))}
                  </div>
                  <SkillTags title="Skills You Have" tags={career.existing || []} type="existing" />
                  <SkillTags title="Skills to Develop" tags={career.missing || []} type="missing" />
                  <div className="card-actions">
                    <button className="btn btn--primary" type="button" onClick={() => openLearning(career.title)}>View Learning Path</button>
                    <button className="btn btn--ghost" type="button" onClick={() => {
                      notify(`Searching for ${career.title} positions in your area...`, 'info');
                      window.setTimeout(() => notify(`Found 23 ${career.title} positions! Check your email for details.`, 'success'), 1200);
                    }}>Find Jobs</button>
                  </div>
                </article>
              ))
            ) : (
              <div className="panel" style={{ gridColumn: '1 / -1' }}>
                <p>No career paths generated yet. Please upload and analyze your resume first.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader title="Priority Skill Development Areas">
            Focus on these skills to maximize your career opportunities.
          </SectionHeader>
          <div className="grid grid--3 align-stretch">
            {skillPlans.map((skill) => (
              <article className={`skill-plan skill-plan--${skill.className}`} key={skill.title}>
                <span className="badge">{skill.priority}</span>
                <span className="icon-badge icon-badge--purple"><i className={skill.icon} /></span>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <div className="learning-path">
                  {skill.path.map(([label, duration, icon], index) => {
                    const key = `${skill.title}_${index}`;
                    return (
                      <button
                        className={`path-row ${completed[key] ? 'complete' : ''}`}
                        key={label}
                        type="button"
                        onClick={() => setCompleted((current) => ({ ...current, [key]: !current[key] }))}
                      >
                        <i className={completed[key] ? 'fas fa-check-circle' : icon} />
                        <span>{label}</span>
                        <small>{duration}</small>
                      </button>
                    );
                  })}
                </div>
                <div className="card-actions">
                  <button className="btn btn--primary" type="button" onClick={() => notify(`${skill.title} course enrolled! Check your dashboard for progress.`, 'success')}>Start Learning</button>
                  <button className="btn btn--outline" type="button" onClick={() => openResources(skill.title)}>View Resources</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeader title="Local Job Market Insights">Current trends and opportunities in your area.</SectionHeader>
          <div className="grid grid--3">
            <Insight title="Growing Demand" icon="fas fa-trending-up" items={[['Frontend Developers', '+28%'], ['Full-Stack Engineers', '+35%'], ['Mobile Developers', '+22%']]} />
            <Insight title="Salary Trends" icon="fas fa-dollar-sign" items={[['Junior Developer', '$45K - $65K'], ['Mid-Level Developer', '$65K - $95K'], ['Senior Developer', '$95K - $130K']]} />
            <Insight title="Top Hiring Companies" icon="fas fa-building" items={[['TechCorp Solutions', '15 openings'], ['Digital Innovations', '12 openings'], ['StartupHub Inc.', '8 openings']]} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container action-plan">
          <SectionHeader title="Your 90-Day Action Plan">A structured roadmap to achieve your career goals.</SectionHeader>
          <div className="timeline">
            {[30, 60, 90].map((days) => (
              <button className={`timeline-item ${expanded === days ? 'expanded' : ''}`} key={days} type="button" onClick={() => setExpanded(expanded === days ? null : days)}>
                <span className="timeline-marker"><strong>{days}</strong><small>Days</small></span>
                <span className="timeline-content">
                  <strong>{timelineTitle(days)}</strong>
                  <ul>{timelineItems(days).map((item) => <li key={item}>{item}</li>)}</ul>
                </span>
              </button>
            ))}
          </div>
          <div className="form-actions">
            <button className="btn btn--primary btn--large" type="button" onClick={downloadActionPlan}>Download Full Action Plan</button>
            <button className="btn btn--ghost btn--large" type="button" onClick={() => notify('Mentorship call scheduled for next week! Check your email for details.', 'success')}>Schedule Mentorship Call</button>
          </div>
        </div>
      </section>

      {modal && <Modal title={modal.title} onClose={() => setModal(null)}>{modal.body}</Modal>}
    </>
  );
}

function SkillTags({ title, tags, type }) {
  return (
    <div className="skill-tags">
      <h4>{title}</h4>
      <div>{tags.map((tag) => <span className={`tag tag--${type}`} key={tag}>{tag}</span>)}</div>
    </div>
  );
}

function Insight({ title, icon, items }) {
  return (
    <article className="insight-card">
      <h3><i className={icon} /> {title}</h3>
      {items.map(([label, value]) => <p key={label}><span>{label}</span><strong>{value}</strong></p>)}
    </article>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal__content">
        <div className="modal__header">
          <h2 id="modal-title">{title}</h2>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close modal"><i className="fas fa-times" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function timelineTitle(days) {
  return { 30: 'Foundation Building', 60: 'Skill Enhancement', 90: 'Career Launch' }[days];
}

function timelineItems(days) {
  return {
    30: ['Complete React.js fundamentals course', 'Build your first React project', 'Update your LinkedIn profile', 'Start networking in tech communities'],
    60: ['Learn Node.js and Express.js', 'Build a full-stack application', 'Contribute to open-source projects', 'Apply to 5-10 relevant positions'],
    90: ['Complete portfolio with 3 projects', 'Prepare for technical interviews', 'Attend tech meetups and conferences', 'Secure your first developer role'],
  }[days];
}

function generateActionPlanText() {
  return `JobBuddy - Personalized 90-Day Action Plan
Generated on: ${new Date().toLocaleDateString()}

30-Day Goals:
- Complete React.js fundamentals course
- Build your first React project
- Update your LinkedIn profile
- Start networking in tech communities

60-Day Goals:
- Learn Node.js and Express.js
- Build a full-stack application
- Contribute to open-source projects
- Apply to 5-10 relevant positions

90-Day Goals:
- Complete portfolio with 3 projects
- Prepare for technical interviews
- Attend tech meetups and conferences
- Secure your first developer role`;
}
