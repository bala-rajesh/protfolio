import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import type { Item } from './types';
import { PORTFOLIO_DATA } from './data';
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
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  if (!currentProfile) {
    return <ProfileGate onSelect={(name) => setCurrentProfile(name)} />;
  }

  return (
    <div className="bg-[#141414] min-h-screen text-white font-sans overflow-x-hidden selection:bg-red-600 selection:text-white pb-20 scroll-smooth">
      <Navbar scrolled={isScrolled} />

      <Hero
        item={PORTFOLIO_DATA.hero}
        onMoreInfo={setSelectedItem}
        onPlay={handleNavigation}
        profileName={currentProfile || undefined}
      />

      {/* Main Content Rows */}
      <div className="relative z-20 space-y-4">
        {PORTFOLIO_DATA.sections.map((section, idx) => (
          <Row
            key={idx}
            title={section.title}
            items={section.items}
            onSelect={setSelectedItem}
            isFirst={idx === 0}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-20 px-12 text-gray-500 text-sm py-12 opacity-70 hover:opacity-100 transition-opacity duration-500">
        <div className="flex gap-6 mb-4">
          <Github className="w-6 h-6 hover:text-white cursor-pointer hover:scale-110 transition-transform" onClick={() => handleNavigation('https://github.com/')} />
          <Linkedin className="w-6 h-6 hover:text-white cursor-pointer hover:scale-110 transition-transform" onClick={() => handleNavigation('https://linkedin.com/')} />
          <Mail className="w-6 h-6 hover:text-white cursor-pointer hover:scale-110 transition-transform" onClick={() => handleNavigation('mailto:example@gmail.com')} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {['Audio Description', 'Help Centre', 'Gift Cards', 'Media Centre', 'Investor Relations', 'Jobs', 'Terms of Use', 'Privacy'].map((text) => (
            <button key={text} onClick={() => handleNavigation('#')} className="text-left hover:underline hover:text-gray-400 transition-colors">{text}</button>
          ))}
        </div>
        <button className="border border-gray-500 px-4 py-1 text-gray-500 hover:text-white hover:border-white mb-4 hover:bg-white/5 transition-all active:scale-95">
          Service Code
        </button>
        <p className="text-xs">© 2025 Kunapareddy Bala Rajesh Portfolio</p>
      </div>

      {/* Modals & Overlays */}
      {selectedItem && (
        <Modal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onPlay={handleNavigation}
        />
      )}

      {showNotFound && (
        <NotFoundOverlay onClose={() => setShowNotFound(false)} />
      )}
    </div>
  );
}