import { useState } from 'react';
import { Hero, SectionHeader } from '../components/Section.jsx';
import { useToast } from '../components/ToastProvider.jsx';

const faqs = [
  ['How accurate are the AI career recommendations?', 'Our AI analyzes skills, experience, interests, and current market trends. Recommendations are designed as practical guidance, not a replacement for human career counseling.'],
  ['Is JobBuddy free to use?', 'Yes. Resume analysis, career recommendations, and basic skill plans are available in the free experience.'],
  ['How long does the resume analysis take?', 'The simulated analysis flow takes a few moments. In a production API workflow, processing time depends on file size and backend load.'],
  ['Can I update my profile and get new recommendations?', 'Yes. You can rerun the analyzer with updated interests, goals, and resume information at any time.'],
  ['Do you offer job placement services?', 'JobBuddy focuses on guidance, preparation, and recommendations rather than direct placement.'],
  ['Is my personal information secure?', 'Personal career information should be handled carefully. This demo stores form state locally in your browser.'],
];

export default function Contact() {
  const { notify } = useToast();
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false,
    privacy: false,
  });

  const submit = (event) => {
    event.preventDefault();
    if (!form.privacy) {
      notify('Please agree to the Privacy Policy and Terms of Service.', 'error');
      return;
    }
    notify('Thank you for your message! We will get back to you within 24 hours.', 'success');
    setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '', newsletter: false, privacy: false });
  };

  return (
    <>
      <Hero compact eyebrow="Contact JobBuddy" title="Get in Touch">
        Have questions about JobBuddy or need help with your career journey? We are here to support you every step of the way.
      </Hero>

      <section className="section">
        <div className="container contact-grid">
          <aside className="contact-info">
            <p className="eyebrow">Let's connect</p>
            <h2>Support for every step of the journey</h2>
            <p>Whether you have feedback, questions, or need technical support, our team is ready to help.</p>
            <div className="contact-methods">
              <ContactMethod icon="fas fa-envelope" title="Email Us" lines={['info@jobbuddy.com', 'support@jobbuddy.com']} />
              <ContactMethod icon="fas fa-phone" title="Call Us" lines={['+1 (555) 123-4567', 'Mon-Fri, 9AM-6PM EST']} />
              <ContactMethod icon="fas fa-map-marker-alt" title="Visit Us" lines={['123 Innovation Drive', 'San Francisco, CA 94105']} />
              <div className="contact-method">
                <span className="icon-badge"><i className="fas fa-comments" /></span>
                <div>
                  <h3>Live Chat</h3>
                  <p>Available 24/7</p>
                  <button className="btn btn--outline btn--small" type="button" onClick={() => notify('Live chat is opening. A support specialist will be with you shortly.', 'info')}>Start Chat</button>
                </div>
              </div>
            </div>
            <div className="social-row contact-social">
              {['fab fa-linkedin', 'fab fa-twitter', 'fab fa-facebook', 'fab fa-instagram'].map((icon) => (
                <a className="icon-button" href="#" key={icon} aria-label="Social channel"><i className={icon} /></a>
              ))}
            </div>
          </aside>

          <form className="panel contact-form" onSubmit={submit}>
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and we will get back to you within 24 hours.</p>
            <div className="form-grid">
              <Field label="First Name *" value={form.firstName} onChange={(value) => setField(setForm, 'firstName', value)} required />
              <Field label="Last Name *" value={form.lastName} onChange={(value) => setField(setForm, 'lastName', value)} required />
              <Field className="field--full" label="Email Address *" type="email" value={form.email} onChange={(value) => setField(setForm, 'email', value)} required />
              <Field className="field--full" label="Phone Number" type="tel" value={form.phone} onChange={(value) => setField(setForm, 'phone', value)} />
              <label className="field field--full">
                <span>Subject *</span>
                <select value={form.subject} required onChange={(event) => setField(setForm, 'subject', event.target.value)}>
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="career">Career Guidance</option>
                  <option value="bug">Report a Bug</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="field field--full">
                <span>Message *</span>
                <textarea required rows="6" value={form.message} onChange={(event) => setField(setForm, 'message', event.target.value)} placeholder="Tell us how we can help you..." />
              </label>
              <label className="check-card field--full">
                <input type="checkbox" checked={form.newsletter} onChange={() => setField(setForm, 'newsletter', !form.newsletter)} />
                <span>Subscribe to our newsletter for career tips and updates</span>
              </label>
              <label className="check-card field--full">
                <input type="checkbox" checked={form.privacy} onChange={() => setField(setForm, 'privacy', !form.privacy)} required />
                <span>I agree to the Privacy Policy and Terms of Service *</span>
              </label>
            </div>
            <button className="btn btn--primary btn--large" type="submit"><i className="fas fa-paper-plane" /> Send Message</button>
          </form>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container faq-shell">
          <SectionHeader title="Frequently Asked Questions">Quick answers to common questions about JobBuddy.</SectionHeader>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <article className="faq-item" key={question}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                  <span>{question}</span>
                  <i className={`fas fa-chevron-down ${openFaq === index ? 'rotate' : ''}`} />
                </button>
                {openFaq === index && <p>{answer}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, onChange, type = 'text', required = false, className = '' }) {
  return (
    <label className={`field ${className}`}>
      <span>{label}</span>
      <input type={type} value={value} required={required} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function ContactMethod({ icon, title, lines }) {
  return (
    <div className="contact-method">
      <span className="icon-badge"><i className={icon} /></span>
      <div>
        <h3>{title}</h3>
        {lines.map((line) => <p key={line}>{line}</p>)}
      </div>
    </div>
  );
}

function setField(setForm, key, value) {
  setForm((current) => ({ ...current, [key]: value }));
}
