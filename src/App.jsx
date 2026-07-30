import { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout.jsx';
import ToastProvider from './components/ToastProvider.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import Recommendations from './pages/Recommendations.jsx';
import ResumeAnalyzer from './pages/ResumeAnalyzer.jsx';

const routeMap = {
  '/': Home,
  '/index.html': Home,
  '/about': About,
  '/about.html': About,
  '/contact': Contact,
  '/contact.html': Contact,
  '/resume-analyzer': ResumeAnalyzer,
  '/resume-analyzer.html': ResumeAnalyzer,
  '/skill-recommendations': Recommendations,
  '/skill-recommendations.html': Recommendations,
};

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleNavigation = (event) => {
      const link = event.target.closest('a[data-route]');
      if (!link) return;

      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      window.history.pushState({}, '', `${url.pathname}${url.hash}`);
      setPath(url.pathname);

      if (url.hash) {
        window.requestAnimationFrame(() => {
          document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const handlePop = () => setPath(window.location.pathname);
    document.addEventListener('click', handleNavigation);
    window.addEventListener('popstate', handlePop);
    return () => {
      document.removeEventListener('click', handleNavigation);
      window.removeEventListener('popstate', handlePop);
    };
  }, []);

  const Page = useMemo(() => routeMap[path] || Home, [path]);

  return (
    <ToastProvider>
      <Layout currentPath={path}>
        <Page />
      </Layout>
    </ToastProvider>
  );
}
