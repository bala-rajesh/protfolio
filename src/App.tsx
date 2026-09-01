import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight, Copy, Check, FileText } from 'lucide-react';
import type { Item } from './types';
import { PORTFOLIO_DATA, personalLinks } from './data';
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
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [myList, setMyList] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('portfolio_mylist');
      return new Set(saved ? JSON.parse(saved) : []);
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Persist My List to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio_mylist', JSON.stringify(Array.from(myList)));
  }, [myList]);

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

  const toggleMyList = (itemId: string) => {
    setMyList((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const isInMyList = (itemId: string) => myList.has(itemId);

  // Filter items based on search query
  const filterItemsBySearch = (items: Item[]): Item[] => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    return items.filter((item) => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      item.tech?.some((tech) => tech.name.toLowerCase().includes(query))
    );
  };

  const handleProfileSelect = (name: string) => {
    setCurrentProfile(name);
    window.setTimeout(() => {
      const target = name === 'Recruiter' ? '#work' : '#home';
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalLinks.emailAddress);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      window.location.href = personalLinks.email;
    }
  };

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  if (!currentProfile) {
    return <ProfileGate onSelect={handleProfileSelect} />;
  }

  return (
    <div className="app-shell">
      <Navbar 
        scrolled={isScrolled} 
        currentProfile={currentProfile}
        onProfileSwitch={handleProfileSelect}
        myListCount={myList.size}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Hero
        item={PORTFOLIO_DATA.hero}
        onMoreInfo={(heroItem) => setSelectedItem(heroItem)}
        onPlay={handleNavigation}
        profileName={currentProfile || undefined}
        onToggleMyList={toggleMyList}
        isInMyList={isInMyList}
      />

      <main>
        <div className="rows-wrap">
          {/* Dynamic "My List" Row */}
          {myList.size > 0 && !searchQuery && (
            <Row
              key="my-list"
              title="My List"
              eyebrow="BOOKMARKED EPISODES"
              variant="poster"
              items={Array.from(myList)
                .map((id) => {
                  for (const section of PORTFOLIO_DATA.sections) {
                    const found = section.items.find((item) => item.id === id);
                    if (found) return found;
                  }
                  return null;
                })
                .filter((item): item is Item => item !== null)}
              onSelect={setSelectedItem}
              onToggleMyList={toggleMyList}
              isInMyList={isInMyList}
              isFirst={false}
            />
          )}

          {PORTFOLIO_DATA.sections.map((section, idx) => {
            const filteredItems = filterItemsBySearch(section.items);
            // Skip empty sections when searching
            if (searchQuery && filteredItems.length === 0) return null;
            
            return (
              <Row
                key={section.title}
                title={section.title}
                eyebrow={section.eyebrow}
                variant={section.variant}
                items={filteredItems}
                onSelect={setSelectedItem}
                onToggleMyList={toggleMyList}
                isInMyList={isInMyList}
                isFirst={idx === 0 && !myList.size}
              />
            );
          })}
        </div>

        {/* The Journey Section */}
        <section id="journey" className="story-section journey-section">
          <div className="section-intro">
            <p className="kicker">The Timeline</p>
            <h2>The Journey</h2>
            <p>Every episode builds on previous learnings. The common thread is passion for building scalable software.</p>
          </div>
          <div className="journey-list">
            {PORTFOLIO_DATA.journey.map((episode) => (
              <article className="journey-episode" key={episode.code}>
                <span>{episode.code}</span>
                <div>
                  <h3>{episode.title}</h3>
                  <p>{episode.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-portrait">
            <img src={PORTFOLIO_DATA.about.image} alt="Bala Rajesh" loading="lazy" />
          </div>
          <div className="section-intro">
            <p className="kicker">About the subject</p>
            <h2>{PORTFOLIO_DATA.about.name}</h2>
            <p className="about-role">{PORTFOLIO_DATA.about.role}</p>
            <p>{PORTFOLIO_DATA.about.description}</p>
            
            <div className="about-action-group">
              <a
                className="button button-primary"
                href={personalLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="w-4 h-4" /> View Resume
              </a>
              <a
                className="button button-ghost"
                href={personalLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                className="button button-ghost"
                href={personalLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Toolkit Section */}
        <section className="archive-section">
          <div className="section-intro">
            <p className="kicker">Working archive</p>
            <h2>My Toolkit</h2>
            <p>Tools, frameworks, and technologies I utilize to design, build, and deploy production-grade software.</p>
          </div>
          <div className="toolkit-grid">
            {PORTFOLIO_DATA.toolkit.map((group) => (
              <article className="toolkit-group" key={group.label}>
                <h3>{group.label}</h3>
                {group.items.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </article>
            ))}
          </div>
        </section>

        {/* Currently Building Section */}
        <section className="building-section">
          <div>
            <p className="kicker">Currently building</p>
            <h2>{PORTFOLIO_DATA.currentlyBuilding.title}</h2>
            <p>{PORTFOLIO_DATA.currentlyBuilding.description}</p>
            <div className="building-actions mt-4">
              <a
                href={personalLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-ghost inline-flex items-center gap-2"
              >
                <Github className="w-4 h-4" /> Follow Activity on GitHub <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <div className="build-status">
            <span>{PORTFOLIO_DATA.currentlyBuilding.status}</span>
            <div className="status-line">
              <i />
            </div>
            <small>Active sprint</small>
          </div>
        </section>

        {/* Beyond Code */}
        <section className="beyond-section">
          <div className="paper-note">
            <p className="kicker">Bonus footage</p>
            <h2>Beyond the Code</h2>
            <p>Interests, creativity, and diverse perspectives that influence my engineering approach.</p>
          </div>
          <div className="interest-list">
            {PORTFOLIO_DATA.beyondCode.map((interest) => (
              <span key={interest}>{interest}</span>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="section-intro">
            <p className="kicker">Final frame</p>
            <h2>Stay in Touch</h2>
            <p>Always open to full-time opportunities, engineering roles, and innovative technical collaborations.</p>
            <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
              <span className="font-mono text-xs bg-white/10 px-3 py-1.5 rounded border border-white/10 select-all">
                {personalLinks.emailAddress}
              </span>
              <button
                onClick={handleCopyEmail}
                className="button button-ghost text-xs py-1.5 px-3 min-h-0 h-8"
                title="Copy Email Address"
                aria-label="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
          <div className="contact-actions">
            <a className="button button-primary" href={personalLinks.email}>
              <Mail className="w-4 h-4" /> Send Email
            </a>
            <a className="button button-ghost" href={personalLinks.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a className="button button-ghost" href={personalLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a className="button button-ghost" href={personalLinks.resume} target="_blank" rel="noopener noreferrer">
              <ArrowUpRight className="w-4 h-4" /> View Resume
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <a href="#home" className="footer-brand">BALA RAJESH<span>.</span></a>
          <p>Next episode loading...</p>
        </div>
        <div className="footer-links">
          <a href="#work">Work <ArrowUpRight /></a>
          <a href="#journey">Journey <ArrowUpRight /></a>
          <a href="#about">About <ArrowUpRight /></a>
          <a href="#contact">Contact <ArrowUpRight /></a>
        </div>
        <div className="footer-social">
          <a href={personalLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a>
          <a href={personalLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a>
          <a href={personalLinks.email} aria-label="Email Bala Rajesh"><Mail /></a>
          <a href={personalLinks.resume} target="_blank" rel="noopener noreferrer" aria-label="View resume"><FileText /></a>
        </div>
        <small>© 2026 Bala Rajesh. All rights reserved.</small>
      </footer>

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