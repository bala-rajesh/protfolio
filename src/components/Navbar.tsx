import React, { useState, useRef, useEffect } from 'react';
import { Github, Linkedin, FileText, Menu, X, Mail, Search, Bookmark, Users, ChevronDown, Sparkles } from 'lucide-react';
import { personalLinks } from '../data';
import profileImg from '../assets/profile.jpg';
import profile1Img from '../assets/profile-1.jpg';
import profile2Img from '../assets/proile-2.jpg';
import { playUiClick } from '../lib/utils';

interface NavbarProps {
    scrolled: boolean;
    currentProfile?: string | null;
    onProfileSwitch?: (name: string) => void;
    myListCount?: number;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
    scrolled,
    currentProfile = 'Bala Rajesh',
    onProfileSwitch,
    myListCount = 0,
    searchQuery = '',
    onSearchChange,
}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const profileDropdownRef = useRef<HTMLDivElement>(null);

    const closeMenu = () => setMenuOpen(false);

    const profiles = [
        { name: 'Bala Rajesh', role: 'The Creator', img: profileImg },
        { name: 'Recruiter', role: 'The Professional', img: profile1Img },
        { name: 'Visitor', role: 'The Explorer', img: profile2Img },
    ];

    const activeProfileObj = profiles.find((p) => p.name === currentProfile) || profiles[0];

    const toggleSearch = () => {
        setSearchOpen((prev) => {
            const next = !prev;
            if (next) {
                setTimeout(() => searchInputRef.current?.focus(), 100);
            } else if (onSearchChange) {
                onSearchChange('');
            }
            return next;
        });
    };

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
                setProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className={`site-nav ${scrolled ? 'is-scrolled' : ''}`} aria-label="Primary navigation">
            <div className="nav-inner">
                {/* Brand Logo with Netflix red accent */}
                <a href="#home" className="brand" aria-label="Bala Rajesh Portfolio Home">
                    BALA<span>.</span>
                    <span className="brand-badge">ORIGINAL</span>
                </a>
                
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
                    {myListCount > 0 && (
                        <a href="#my-list" className="nav-link nav-link-mylist" onClick={closeMenu}>
                            <Bookmark className="w-3.5 h-3.5 inline mr-1" /> My List <span className="mylist-pill">{myListCount}</span>
                        </a>
                    )}
                </div>

                <div className="nav-actions">
                    {/* Expanding Netflix-style Search */}
                    <div className={`nav-search ${searchOpen ? 'is-open' : ''}`}>
                        <button
                            type="button"
                            className="nav-search-btn"
                            onClick={toggleSearch}
                            aria-label={searchOpen ? 'Close search' : 'Search projects & tech'}
                            title="Search by technology, title, or keyword"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Titles, skills, genres..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                            className="nav-search-input"
                            aria-label="Search portfolio"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className="nav-search-clear"
                                onClick={() => onSearchChange?.('')}
                                aria-label="Clear search"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    <div className="nav-socials hidden lg:flex">
                        <a href={personalLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" title="GitHub">
                            <Github />
                        </a>
                        <a href={personalLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" title="LinkedIn">
                            <Linkedin />
                        </a>
                        <a href={personalLinks.email} aria-label="Email Bala Rajesh" title="Send Email">
                            <Mail />
                        </a>
                        <a href={personalLinks.resume} target="_blank" rel="noopener noreferrer" className="resume-link" title="Download / View Resume">
                            <FileText /> <span>Resume</span>
                        </a>
                    </div>

                    {/* Netflix Profile Switcher Dropdown */}
                    <div className="profile-menu-wrap" ref={profileDropdownRef}>
                        <button
                            type="button"
                            className="profile-menu-trigger"
                            onClick={() => {
                                playUiClick();
                                setProfileMenuOpen((prev) => !prev);
                            }}
                            aria-expanded={profileMenuOpen}
                            aria-label={`Profile menu: viewing as ${activeProfileObj.name}`}
                        >
                            <img src={activeProfileObj.img} alt={activeProfileObj.name} className="nav-avatar" />
                            <ChevronDown className={`w-3.5 h-3.5 nav-chevron ${profileMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {profileMenuOpen && (
                            <div className="profile-dropdown" role="menu">
                                <div className="profile-dropdown-header">
                                    <Sparkles className="w-3.5 h-3.5 text-red-500" />
                                    <span>Viewing Lens: <strong>{activeProfileObj.name}</strong></span>
                                </div>
                                <div className="profile-dropdown-list">
                                    {profiles.map((prof) => (
                                        <button
                                            key={prof.name}
                                            type="button"
                                            className={`profile-dropdown-item ${prof.name === currentProfile ? 'is-active' : ''}`}
                                            onClick={() => {
                                                playUiClick();
                                                onProfileSwitch?.(prof.name);
                                                setProfileMenuOpen(false);
                                            }}
                                            role="menuitem"
                                        >
                                            <img src={prof.img} alt={prof.name} />
                                            <div>
                                                <span className="profile-dropdown-name">{prof.name}</span>
                                                <small>{prof.role}</small>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="profile-dropdown-footer">
                                    {myListCount > 0 && (
                                        <a href="#my-list" onClick={() => setProfileMenuOpen(false)} className="profile-dropdown-link">
                                            <Bookmark className="w-3.5 h-3.5" /> My List ({myListCount})
                                        </a>
                                    )}
                                    <button
                                        type="button"
                                        className="profile-dropdown-link"
                                        onClick={() => {
                                            onProfileSwitch?.('__RESET__');
                                            setProfileMenuOpen(false);
                                        }}
                                    >
                                        <Users className="w-3.5 h-3.5" /> Manage Profiles
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        className="menu-toggle"
                        type="button"
                        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
        </nav>
    );
};
