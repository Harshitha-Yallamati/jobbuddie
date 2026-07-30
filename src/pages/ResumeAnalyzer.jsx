import { useEffect, useMemo, useRef, useState } from 'react';
import { ButtonLink, Hero, IconCard, SectionHeader } from '../components/Section.jsx';
import { useToast } from '../components/ToastProvider.jsx';

const allowedTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

export default function ResumeAnalyzer() {
  const { notify } = useToast();
  const inputRef = useRef(null);
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loadingStep, setLoadingStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [form, setForm] = useState({
    careerInterests: '',
    preferredLocation: '',
    experienceLevel: '',
    workEnvironment: [],
    learningGoals: '',
  });

  useEffect(() => {
    if (step !== 3 || complete) return undefined;
    const interval = window.setInterval(() => {
      setLoadingStep((current) => {
        if (current >= 4) {
          window.clearInterval(interval);
          window.setTimeout(() => setComplete(true), 700);
          return 4;
        }
        return current + 1;
      });
    }, 1200);
    return () => window.clearInterval(interval);
  }, [step, complete]);

  const fileLabel = useMemo(() => file && `${file.name} (${formatFileSize(file.size)})`, [file]);

  const handleFile = (selected) => {
    if (!selected) return;
    if (!allowedTypes.includes(selected.type) && !/\.(pdf|doc|docx|txt)$/i.test(selected.name)) {
      notify('Please upload a PDF, DOC, DOCX, or TXT file.', 'error');
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      notify('File size must be less than 5MB.', 'error');
      return;
    }
    setFile(selected);
    analyzeResumeForAutoFill(selected);
  };

  const analyzeResumeForAutoFill = async (file) => {
    setAnalyzing(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('http://localhost:3001/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        notify(result.message || 'Could not auto-fill from resume. Please fill in the fields manually.', 'error');
        return;
      }

      if (!result.analysis?.autoFill) {
        notify('Could not auto-fill from resume. Please fill in the fields manually.', 'error');
        return;
      }

      const autoFill = result.analysis.autoFill;
      setResumeAnalysis(result.analysis);
      
      setForm(prev => ({
        ...prev,
        careerInterests: autoFill.careerInterests || prev.careerInterests,
        preferredLocation: autoFill.preferredLocation || prev.preferredLocation,
        experienceLevel: mapExperienceLevel(autoFill.experienceLevel) || prev.experienceLevel,
        workEnvironment: autoFill.workEnvironment?.length > 0 ? autoFill.workEnvironment : prev.workEnvironment,
        learningGoals: autoFill.learningGoals || prev.learningGoals,
      }));

      notify('Resume analyzed! Interests section auto-filled. Please review and edit if needed.', 'success');
    } catch (error) {
      console.error('Resume analysis error:', error);
      notify('Could not auto-fill from resume. Please fill in the fields manually.', 'error');
    } finally {
      setAnalyzing(false);
    }
  };

  const mapExperienceLevel = (level) => {
    if (!level) return '';
    const levelMap = {
      'Senior': 'senior',
      'Mid-level': 'mid',
      'Junior': 'junior',
      'Entry Level': 'entry',
    };
    return levelMap[level] || '';
  };

  const analyze = () => {
    if (!form.careerInterests.trim()) {
      notify('Please describe your career interests.', 'error');
      return;
    }
    if (!form.preferredLocation) {
      notify('Please select your preferred work location.', 'error');
      return;
    }
    if (!form.experienceLevel) {
      notify('Please select your experience level.', 'error');
      return;
    }

    const data = { ...form, fileName: file?.name || '' };
    localStorage.setItem('jobBuddyFormData', JSON.stringify(data));
    
    const dynamicPaths = resumeAnalysis?.careerRecommendations || [];
    const skills = resumeAnalysis?.detectedSkills || [];
    
    localStorage.setItem('actionPlanData', JSON.stringify({
      name: 'User',
      email: 'user@example.com',
      location: form.preferredLocation,
      experienceLevel: form.experienceLevel,
      skills: skills.map(s => ({ name: s, level: 'Intermediate' })),
      recommendedJobs: dynamicPaths.map(p => ({ title: p.title, company: 'Various', salary: p.details?.[0] || 'TBD', skills: p.existing })),
      skillGaps: dynamicPaths[0]?.missing?.map(s => ({ skill: s, description: `Consider learning ${s}` })) || [],
      dynamicCareerPaths: dynamicPaths
    }));
    setStep(3);
  };

  return (
    <>
      <Hero compact eyebrow="Resume Analyzer" title="AI-Powered Resume Analysis">
        Upload your resume and share your interests to get personalized career recommendations and skill development plans.
      </Hero>

      <section className="section section--soft">
        <div className="container analyzer-shell">
          <div className="progress-steps" aria-label="Analysis progress">
            {['Upload Resume', 'Share Interests', 'Get Results'].map((label, index) => (
              <div className={`progress-step ${step === index + 1 ? 'active' : ''} ${step > index + 1 ? 'done' : ''}`} key={label}>
                <span>{index + 1}</span>
                <p>{label}</p>
              </div>
            ))}
          </div>

          {step === 1 && (
            <section className="panel">
              <h2>Upload Your Resume</h2>
              <p>Upload your resume in PDF, DOC, DOCX, or TXT format for analysis.</p>
              {!file ? (
                <button
                  type="button"
                  className={`upload-zone ${dragging ? 'is-dragging' : ''}`}
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(event) => {
                    event.preventDefault();
                    setDragging(false);
                    handleFile(event.dataTransfer.files?.[0]);
                  }}
                >
                  <i className="fas fa-cloud-upload-alt" />
                  <strong>Drag & drop your resume here</strong>
                  <span>or browse files</span>
                  <small>Supported formats: PDF, DOC, DOCX, TXT. Max 5MB.</small>
                </button>
              ) : (
                <div className="uploaded-file">
                  <i className="fas fa-file-alt" />
                  <div>
                    <strong>{file.name}</strong>
                    <span>{formatFileSize(file.size)}</span>
                  </div>
                  <button type="button" className="icon-button danger" onClick={() => setFile(null)} aria-label="Remove file">
                    <i className="fas fa-times" />
                  </button>
                </div>
              )}
              <input ref={inputRef} type="file" accept=".pdf,.doc,.docx,.txt" hidden onChange={(event) => handleFile(event.target.files?.[0])} />
              <div className="form-actions">
                <button className="btn btn--primary" type="button" disabled={!file} onClick={() => setStep(2)}>
                  Next: Share Your Interests <i className="fas fa-arrow-right" />
                </button>
              </div>
              {fileLabel && <p className="assistive-note">Selected: {fileLabel}</p>}
            </section>
          )}

          {step === 2 && (
            <section className="panel">
              <h2>Tell Us About Your Interests</h2>
              <p>Help us understand your passions and career preferences. {analyzing && <span className="analyzing-text">Analyzing resume...</span>}</p>
              <div className="form-grid">
                <label className="field field--full">
                  <span>Career Interests <span className="required">*</span></span>
                  <textarea value={form.careerInterests} onChange={(event) => updateForm(setForm, 'careerInterests', event.target.value)} placeholder="What type of work excites you?" />
                </label>
                <label className="field">
                  <span>Preferred Work Location <span className="required">*</span></span>
                  <select value={form.preferredLocation} onChange={(event) => updateForm(setForm, 'preferredLocation', event.target.value)}>
                    <option value="">Select your location</option>
                    <option value="remote">Remote Work</option>
                    <option value="new-york">New York, NY</option>
                    <option value="san-francisco">San Francisco, CA</option>
                    <option value="chicago">Chicago, IL</option>
                    <option value="austin">Austin, TX</option>
                    <option value="seattle">Seattle, WA</option>
                    <option value="boston">Boston, MA</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label className="field">
                  <span>Experience Level <span className="required">*</span></span>
                  <select value={form.experienceLevel} onChange={(event) => updateForm(setForm, 'experienceLevel', event.target.value)}>
                    <option value="">Select your level</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="junior">Junior Level (2-4 years)</option>
                    <option value="mid">Mid Level (4-7 years)</option>
                    <option value="senior">Senior Level (7+ years)</option>
                  </select>
                </label>
                <fieldset className="field field--full checkbox-field">
                  <legend>Preferred Work Environment</legend>
                  {['startup', 'corporate', 'nonprofit', 'freelance'].map((item) => (
                    <label className="check-card" key={item}>
                      <input
                        type="checkbox"
                        checked={form.workEnvironment.includes(item)}
                        onChange={() => toggleEnvironment(setForm, item)}
                      />
                      <span>{environmentLabel(item)}</span>
                    </label>
                  ))}
                </fieldset>
                <label className="field field--full">
                  <span>Learning & Development Goals</span>
                  <textarea value={form.learningGoals} onChange={(event) => updateForm(setForm, 'learningGoals', event.target.value)} placeholder="What skills would you like to develop?" />
                </label>
              </div>
              <div className="form-actions">
                <button className="btn btn--ghost" type="button" onClick={() => setStep(1)}><i className="fas fa-arrow-left" /> Previous</button>
                <button className="btn btn--primary" type="button" onClick={analyze} disabled={analyzing}><i className="fas fa-brain" /> {analyzing ? 'Analyzing...' : 'Analyze My Profile'}</button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="panel">
              {!complete ? (
                <div className="analysis-state">
                  <div className="spinner" />
                  <h2>Analyzing Your Profile...</h2>
                  <p>Our AI is processing your resume and interests to generate personalized recommendations.</p>
                  <div className="loading-list">
                    {['Resume parsed successfully', 'Analyzing skills and experience', 'Matching with job market data', 'Generating recommendations'].map((label, index) => (
                      <div className={`loading-row ${index + 1 <= loadingStep ? 'done' : ''}`} key={label}>
                        <i className={index + 1 < loadingStep ? 'fas fa-check' : index + 1 === loadingStep ? 'fas fa-spinner fa-spin' : 'far fa-circle'} />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="analysis-state">
                  <i className="fas fa-check-circle success-icon" />
                  <h2>Analysis Complete!</h2>
                  <p>Your personalized career recommendations are ready.</p>
                  <div className="result-list">
                    <Result icon="fas fa-briefcase" title="3 Career Paths Identified" copy="Based on your skills and interests" />
                    <Result icon="fas fa-graduation-cap" title="5 Skill Development Areas" copy="To boost your employability" />
                    <Result icon="fas fa-chart-line" title="Local Job Market Insights" copy="Trends and opportunities in your area" />
                  </div>
                  <ButtonLink href="/skill-recommendations" large><i className="fas fa-eye" /> View My Recommendations</ButtonLink>
                </div>
              )}
            </section>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader title="What Our AI Analyzes">Comprehensive analysis of your professional profile.</SectionHeader>
          <div className="grid grid--4">
            <IconCard icon="fas fa-cogs" title="Technical Skills">Programming languages, software proficiency, and technical competencies.</IconCard>
            <IconCard icon="fas fa-users" title="Soft Skills" tone="green">Communication, leadership, teamwork, and interpersonal abilities.</IconCard>
            <IconCard icon="fas fa-graduation-cap" title="Education & Certifications" tone="orange">Academic background, professional certifications, and continuous learning.</IconCard>
            <IconCard icon="fas fa-briefcase" title="Work Experience" tone="purple">Career progression, industry experience, and professional achievements.</IconCard>
          </div>
        </div>
      </section>
    </>
  );
}

function Result({ icon, title, copy }) {
  return (
    <div className="result-row">
      <i className={icon} />
      <div>
        <strong>{title}</strong>
        <span>{copy}</span>
      </div>
    </div>
  );
}

function updateForm(setForm, key, value) {
  setForm((current) => ({ ...current, [key]: value }));
}

function toggleEnvironment(setForm, value) {
  setForm((current) => ({
    ...current,
    workEnvironment: current.workEnvironment.includes(value)
      ? current.workEnvironment.filter((item) => item !== value)
      : [...current.workEnvironment, value],
  }));
}

function environmentLabel(value) {
  return {
    startup: 'Startup Environment',
    corporate: 'Corporate Setting',
    nonprofit: 'Non-Profit Organization',
    freelance: 'Freelance/Consulting',
  }[value];
}

function formatFileSize(bytes) {
  if (!bytes) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / 1024 ** index).toFixed(2))} ${sizes[index]}`;
}
