import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';
import type { Item } from '../types';

interface ModalProps {
    item: Item;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null;
        closeButtonRef.current?.focus();
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            previouslyFocused?.focus();
        };
    }, [onClose]);

    return (
        <div className="modal-backdrop" role="presentation">
            {/* Click outside to close */}
            <div className="absolute inset-0 z-0" onClick={onClose}></div>

            {/* Close Button - Fixed to viewport for visibility */}
            <button ref={closeButtonRef} aria-label="Close project details"
                onClick={onClose}
                className="modal-close"
            >
                <X />
            </button>

            <article className="case-study" role="dialog" aria-modal="true" aria-labelledby="case-study-title">

                {/* Modal Hero */}
                <div className="case-study-hero">
                    <img src={item.image} alt="" />
                    <div><p className="kicker">{item.season} · {item.episode} / {item.year}</p><h1 id="case-study-title">{item.title}</h1><p>{item.role ?? item.subtitle}</p></div>
                </div>

                {/* Content */}
                <div className="case-study-body">
                    <div className="case-study-main">
                        <p className="case-study-lede">{item.longDescription || item.description}</p>
                        {item.problem && <section><h2>The problem</h2><p>{item.problem}</p></section>}
                        {item.solution && <section><h2>The solution</h2><p>{item.solution}</p></section>}
                        {item.built && <section><h2>What I built</h2><ul>{item.built.map((entry) => <li key={entry}>{entry}</li>)}</ul></section>}
                        {item.challenge && <section><h2>Key challenge</h2><p>{item.challenge}</p></section>}
                        {item.learned && <section><h2>What I learned</h2><p>{item.learned}</p></section>}
                    </div>
                    <aside className="case-study-aside"><section><h2>Tech stack</h2><div className="tag-list">{(item.tech ?? item.tags.map((name) => ({ name }))).map((tech) => <span key={tech.name}>{tech.name}</span>)}</div></section><div className="case-study-actions">{item.liveUrl && <a className="button button-primary" href={item.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title} live`}><ExternalLink /> VIEW LIVE</a>}{item.githubUrl && <a className="button button-ghost" href={item.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title} GitHub repository`}><Github /> GITHUB PROJECT</a>}{item.certificateUrl && <a className="button button-ghost" href={item.certificateUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.title} certificate`}><ExternalLink /> VIEW CERTIFICATE</a>}</div></aside>
                    </div>
            </article>
        </div>
    );
};
