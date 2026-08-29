import React from 'react';
import { Play as PlayIcon, Info as InfoIcon, ArrowDown } from 'lucide-react';
import type { Item } from '../types';

interface HeroProps {
    item: Item;
    onMoreInfo: (item: Item) => void;
    onPlay: (link?: string) => void;
    profileName?: string;
}

export const Hero: React.FC<HeroProps> = ({ item, onMoreInfo, onPlay, profileName }) => {
    return (
        <section id="home" className="hero-cinema">
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
                <p className="kicker">A portfolio original / {item.year}</p>
                <h1><span>The Documentary</span><br />of Life</h1>
                <p className="hero-person">Bala Rajesh <i>/</i> Software Engineer<br /><span>Full-Stack Developer</span></p>
                <p className="hero-description">{item.description}</p>
                <div className="hero-actions">
                    <button
                        onClick={() => onPlay('#work')}
                        className="button button-primary"
                    >
                        <PlayIcon className="fill-current" /> Start watching
                    </button>
                    <button
                        onClick={() => onMoreInfo(item)}
                        className="button button-ghost"
                    >
                        <InfoIcon /> More info
                    </button>
                </div>
                <a href="#work" className="hero-scroll"><ArrowDown /> Scroll the archive</a>
            </div>
        </section>
    );
};
