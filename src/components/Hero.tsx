import React, { useState } from 'react';
import { Play as PlayIcon, Info as InfoIcon, ArrowDown, Github, Linkedin, FileText, Mail, Heart, Volume2, VolumeX } from 'lucide-react';
import type { Item } from '../types';
import { personalLinks } from '../data';

interface HeroProps {
    item: Item;
    onMoreInfo: (item: Item) => void;
    onPlay: (link?: string) => void;
    profileName?: string;
    onToggleMyList?: (itemId: string) => void;
    isInMyList?: (itemId: string) => boolean;
}

export const Hero: React.FC<HeroProps> = ({ item, onMoreInfo, onPlay, profileName, onToggleMyList, isInMyList }) => {
    const [audioEnabled, setAudioEnabled] = useState(true);
    const inMyList = isInMyList?.(item.id) ?? false;

    return (
        <section id="home" className="hero-cinema">
            {item.isOriginal && (
                <div className="poster-ribbon" aria-label="Original content">BALA<br />ORIGINAL</div>
            )}
            <div className="hero-art" aria-hidden="true">
                <img
                    src={item.image}
                    alt=""
                />
                <div className="hero-art-label">FIELD NOTES<br /><span>01 / 05</span></div>
            </div>
            <div className="hero-content">
                {profileName && (
                    <p className="hero-welcome">Viewing as <strong>{profileName}</strong></p>
                )}
                
                <div className="hero-badges">
                    {item.matchPercentage && (
                        <span className="match-chip">
                            {item.matchPercentage}% Match
                        </span>
                    )}
                    {item.maturityRating && (
                        <span className="spec-chip">{item.maturityRating}</span>
                    )}
                    {item.specs && item.specs.length > 0 && (
                        item.specs.map((spec) => (
                            <span key={spec} className="spec-chip">{spec}</span>
                        ))
                    )}
                </div>
                
                <p className="kicker">A portfolio original / {item.year}</p>
                <h1><span>The Documentary</span><br />of Life</h1>
                <p className="hero-person">Bala Rajesh <i>/</i> Software Engineer<br /><span>Full-Stack Developer</span></p>
                <p className="hero-description">{item.description}</p>
                
                <div className="hero-actions">
                    <button
                        onClick={() => onPlay('#work')}
                        className="button button-primary"
                        aria-label="Start watching portfolio episodes"
                    >
                        <PlayIcon className="fill-current w-4 h-4" /> Start watching
                    </button>
                    <button
                        onClick={() => onMoreInfo(item)}
                        className="button button-ghost"
                        aria-label="View more info on documentary"
                    >
                        <InfoIcon className="w-4 h-4" /> Story Overview
                    </button>
                    <a
                        href={personalLinks.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-ghost"
                        aria-label="View Resume PDF"
                    >
                        <FileText className="w-4 h-4" /> Resume
                    </a>
                    {onToggleMyList && (
                        <button
                            onClick={() => onToggleMyList(item.id)}
                            className={`button button-ghost ${inMyList ? 'is-liked' : ''}`}
                            aria-label={inMyList ? 'Remove from My List' : 'Add to My List'}
                            title={inMyList ? 'Remove from My List' : 'Add to My List'}
                        >
                            <Heart className={`w-4 h-4 ${inMyList ? 'fill-current' : ''}`} /> {inMyList ? 'In List' : 'My List'}
                        </button>
                    )}
                    <button
                        onClick={() => setAudioEnabled(!audioEnabled)}
                        className="button button-ghost"
                        aria-label={audioEnabled ? 'Mute audio' : 'Unmute audio'}
                        title={audioEnabled ? 'Mute' : 'Unmute'}
                    >
                        {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                </div>

                <div className="hero-quick-links">
                    <a
                        href={personalLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-social-pill"
                        title="GitHub Profile"
                    >
                        <Github className="w-3.5 h-3.5" /> <span>GitHub</span>
                    </a>
                    <a
                        href={personalLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-social-pill"
                        title="LinkedIn Profile"
                    >
                        <Linkedin className="w-3.5 h-3.5" /> <span>LinkedIn</span>
                    </a>
                    <a
                        href={personalLinks.email}
                        className="hero-social-pill"
                        title="Send Email"
                    >
                        <Mail className="w-3.5 h-3.5" /> <span>Contact</span>
                    </a>
                </div>

                <a href="#work" className="hero-scroll"><ArrowDown /> Scroll the archive</a>
            </div>
        </section>
    );
};
