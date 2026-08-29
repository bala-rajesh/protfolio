import React, { useState } from 'react';
import { Github, Linkedin, FileText, Menu, X } from 'lucide-react';
import { personalLinks } from '../data';

interface NavbarProps {
    scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className={`site-nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="Primary navigation">
            <div className="nav-inner">
                <a href="#home" className="brand">BALA<span>.</span></a>
                <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
                        {['Home', 'Work', 'Journey', 'About', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                className="nav-link"
                                onClick={closeMenu}
                            >
                                {item}
                            </a>
                        ))}
                </div>
                <div className="nav-socials">
                    <a href={personalLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a>
                    <a href={personalLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a>
                    <a href={personalLinks.resume} target="_blank" rel="noopener noreferrer" className="resume-link"><FileText /> <span>Resume</span></a>
                    <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
                </div>
            </div>
        </nav>
    );
};
