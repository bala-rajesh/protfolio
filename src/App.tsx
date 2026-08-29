import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import type { Item } from './types';
import { PORTFOLIO_DATA } from './data';
import { personalLinks } from './data';
import { ProfileGate } from './components/ProfileGate';
import { NotFoundOverlay } from './components/NotFoundOverlay';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Row } from './components/Row';
import { Modal } from './components/Modal';
import { IntroAnimation } from './components/IntroAnimation';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentProfile, setCurrentProfile] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem || showNotFound) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedItem, showNotFound]);

  // Centralized navigation handler
  const handleNavigation = (link?: string) => {
    if (!link || link === '#' || link === '') {
      setShowNotFound(true);
      return;
    }
    if (link.startsWith('#')) {
      document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleProfileSelect = (name: string) => {
    setCurrentProfile(name);
    window.setTimeout(() => {
      const target = name === 'Recruiter' ? '#work' : '#home';
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  if (!currentProfile) {
    return <ProfileGate onSelect={handleProfileSelect} />;
  }

  return (
    <div className="app-shell">
      <Navbar scrolled={isScrolled} />

      <Hero
        item={PORTFOLIO_DATA.hero}
        onMoreInfo={() => handleNavigation('#about')}
        onPlay={handleNavigation}
        profileName={currentProfile || undefined}
      />

      <main>
      <div className="rows-wrap">
        {PORTFOLIO_DATA.sections.map((section, idx) => (
          <Row
            key={section.title}
            title={section.title}
            eyebrow={section.eyebrow}
            variant={section.variant}
            items={section.items}
            onSelect={setSelectedItem}
            isFirst={idx === 0}
          />
        ))}
      </div>
      <section id="journey" className="story-section journey-section">
        <div className="section-intro"><p className="kicker">The long take</p><h2>The Journey</h2><p>Every episode changes the questions. The thread is learning by making.</p></div>
        <div className="journey-list">{PORTFOLIO_DATA.journey.map((episode) => <article className="journey-episode" key={episode.code}><span>{episode.code}</span><div><h3>{episode.title}</h3><p>{episode.description}</p></div></article>)}</div>
      </section>
      <section id="about" className="about-section">
        <div className="about-portrait"><img src={PORTFOLIO_DATA.about.image} alt="Bala Rajesh" loading="lazy" /></div>
        <div className="section-intro"><p className="kicker">About the subject</p><h2>{PORTFOLIO_DATA.about.name}</h2><p className="about-role">{PORTFOLIO_DATA.about.role}</p><p>{PORTFOLIO_DATA.about.description}</p></div>
      </section>
      <section className="archive-section">
        <div className="section-intro"><p className="kicker">Working archive</p><h2>My Toolkit</h2><p>Tools I use to think, prototype, build and ship.</p></div>
        <div className="toolkit-grid">{PORTFOLIO_DATA.toolkit.map((group) => <article className="toolkit-group" key={group.label}><h3>{group.label}</h3>{group.items.map((skill) => <span key={skill}>{skill}</span>)}</article>)}</div>
      </section>
      <section className="building-section"><div><p className="kicker">Currently building</p><h2>{PORTFOLIO_DATA.currentlyBuilding.title}</h2><p>{PORTFOLIO_DATA.currentlyBuilding.description}</p></div><div className="build-status"><span>{PORTFOLIO_DATA.currentlyBuilding.status}</span><div className="status-line"><i /></div><small>Documentary mode</small></div></section>
      <section className="beyond-section"><div className="paper-note"><p className="kicker">Bonus footage</p><h2>Beyond the Code</h2><p>A few of the things that keep the frame wide.</p></div><div className="interest-list">{PORTFOLIO_DATA.beyondCode.map((interest) => <span key={interest}>{interest}</span>)}</div></section>
      <section id="contact" className="contact-section"><div className="section-intro"><p className="kicker">Final frame</p><h2>Stay in touch</h2><p>For work, collaboration or a conversation about the next episode.</p></div><div className="contact-actions"><a className="button button-primary" href={personalLinks.email}><Mail /> Email me</a><a className="button button-ghost" href={personalLinks.github} target="_blank" rel="noopener noreferrer"><Github /> GitHub</a><a className="button button-ghost" href={personalLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin /> LinkedIn</a><a className="button button-ghost" href={personalLinks.resume} target="_blank" rel="noopener noreferrer"><ArrowUpRight /> View resume</a></div></section>
      </main>
      <footer className="site-footer"><div><a href="#home" className="footer-brand">BALA RAJESH<span>.</span></a><p>Next episode loading...</p></div><div className="footer-links"><a href="#work">Work <ArrowUpRight /></a><a href="#journey">Journey <ArrowUpRight /></a><a href="#about">About <ArrowUpRight /></a><a href="#contact">Contact <ArrowUpRight /></a></div><div className="footer-social"><a href={personalLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a><a href={personalLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a><a href={personalLinks.email} aria-label="Email Bala Rajesh"><Mail /></a><a href={personalLinks.resume} target="_blank" rel="noopener noreferrer" aria-label="View resume"><ArrowUpRight /></a></div><small>© 2026 Bala Rajesh</small></footer>

      {/* Modals & Overlays */}
      {selectedItem && (
        <Modal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {showNotFound && (
        <NotFoundOverlay onClose={() => setShowNotFound(false)} />
      )}
    </div>
  );
}