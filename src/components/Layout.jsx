import { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Resume Analyzer', href: '/resume-analyzer' },
  { label: 'Skill Recommendations', href: '/skill-recommendations' },
  { label: 'Contact', href: '/contact' },
];

export default function Layout({ children, currentPath }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="nav-container">
          <a className="brand" href="/" data-route aria-label="JobBuddy home">
            <img src={logo} className="brand__logo" alt="JobBuddy Logo" />
            <span>JobBuddy</span>
          </a>

          <button
            className={`nav-toggle ${menuOpen ? 'is-open' : ''}`}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`nav-menu ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
            {navItems.map((item) => {
              const active = currentPath === item.href || currentPath === `${item.href}.html`;
              return (
                <a key={item.href} className={`nav-link ${active ? 'active' : ''}`} href={item.href} data-route>
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <a className="brand footer__brand" href="/" data-route>
            <img src={logo} className="brand__logo" alt="JobBuddy Logo" />
            <span>JobBuddy</span>
          </a>
          <p>Empowering unemployed youth with AI-driven career guidance and skill development.</p>
        </div>
        <div>
          <h2>Quick Links</h2>
          <a href="/about" data-route>About Us</a>
          <a href="/resume-analyzer" data-route>Resume Analyzer</a>
          <a href="/skill-recommendations" data-route>Skill Recommendations</a>
          <a href="/contact" data-route>Contact</a>
        </div>
        <div>
          <h2>Contact Info</h2>
          <p><i className="fas fa-envelope" /> info@jobbuddy.com</p>
          <p><i className="fas fa-phone" /> +1 (555) 123-4567</p>
        </div>
      </div>
      <div className="footer__bottom">© 2024 JobBuddy. All rights reserved.</div>
    </footer>
  );
}
