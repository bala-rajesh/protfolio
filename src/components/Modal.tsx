import React, { useEffect, useRef } from 'react';
import { X, Github, Award, Globe, FileText, CheckCircle2, BookOpen } from 'lucide-react';
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

            {/* Close Button - Fixed to viewport for accessibility */}
            <button
                ref={closeButtonRef}
                aria-label="Close details"
                onClick={onClose}
                className="modal-close"
            >
                <X />
            </button>

            <article className="case-study" role="dialog" aria-modal="true" aria-labelledby="case-study-title">
                {/* Modal Hero */}
                <div className="case-study-hero">
                    <img src={item.image} alt="" />
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="case-badge">{item.season} · {item.episode}</span>
                            <span className="case-year">{item.year}</span>
                            {item.duration && <span className="case-status">{item.duration}</span>}
                            {item.paperUrl && (
                                <span className="case-ieee-badge">
                                    <BookOpen className="w-3 h-3 inline mr-1" /> IEEE Published
                                </span>
                            )}
                        </div>
                        <h1 id="case-study-title">{item.title}</h1>
                        <p className="case-subtitle">{item.role ?? item.subtitle}</p>
                    </div>
                </div>

                {/* Content Body */}
                <div className="case-study-body">
                    <div className="case-study-main">
                        <p className="case-study-lede">{item.longDescription || item.description}</p>

                        {/* Research Paper Abstract Callout */}
                        {item.abstract && (
                            <section className="case-abstract-box">
                                <div className="case-abstract-header">
                                    <BookOpen className="w-4 h-4 text-blue-500" />
                                    <h2>Published Research Abstract (IEEE Xplore)</h2>
                                </div>
                                <p className="case-abstract-text">
                                    {item.abstract}
                                </p>
                            </section>
                        )}
                        
                        {item.problem && (
                            <section>
                                <h2>The Objective & Context</h2>
                                <p>{item.problem}</p>
                            </section>
                        )}
                        
                        {item.solution && (
                            <section>
                                <h2>The Engineering Solution</h2>
                                <p>{item.solution}</p>
                            </section>
                        )}
                        
                        {item.built && item.built.length > 0 && (
                            <section>
                                <h2>Key Deliverables & Implementations</h2>
                                <ul className="case-deliverables">
                                    {item.built.map((entry) => (
                                        <li key={entry}>
                                            <CheckCircle2 className="deliverable-icon" />
                                            <span>{entry}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                        
                        {item.challenge && (
                            <section>
                                <h2>Key Technical Challenge</h2>
                                <p>{item.challenge}</p>
                            </section>
                        )}
                        
                        {item.learned && (
                            <section>
                                <h2>Takeaways & Insights</h2>
                                <p>{item.learned}</p>
                            </section>
                        )}
                    </div>

                    <aside className="case-study-aside">
                        <section>
                            <h2>Technologies & Skills</h2>
                            <div className="tag-list">
                                {(item.tech ?? item.tags.map((name) => ({ name }))).map((tech) => (
                                    <span key={tech.name}>{tech.name}</span>
                                ))}
                            </div>
                        </section>

                        {/* Action Buttons */}
                        <div className="case-study-actions">
                            {item.paperUrl && (
                                <a
                                    className="button button-paper"
                                    href={item.paperUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Read ${item.title} published IEEE research paper`}
                                >
                                    <BookOpen className="w-4 h-4" /> IEEE Research Paper
                                </a>
                            )}
                            {item.liveUrl && (
                                <a
                                    className="button button-primary"
                                    href={item.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`View ${item.title} live demo`}
                                >
                                    <Globe className="w-4 h-4" /> Live Application
                                </a>
                            )}
                            {item.githubUrl && (
                                <a
                                    className="button button-ghost-dark"
                                    href={item.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`View ${item.title} GitHub repository`}
                                >
                                    <Github className="w-4 h-4" /> GitHub Repository
                                </a>
                            )}
                            {item.certificateUrl && (
                                <a
                                    className="button button-certificate"
                                    href={item.certificateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`View ${item.title} official certificate`}
                                >
                                    <Award className="w-4 h-4" /> View Certificate (PDF)
                                </a>
                            )}
                            {!item.liveUrl && !item.githubUrl && !item.certificateUrl && !item.paperUrl && (
                                <a
                                    className="button button-ghost-dark"
                                    href="#contact"
                                    onClick={onClose}
                                >
                                    <FileText className="w-4 h-4" /> Get in Touch
                                </a>
                            )}
                        </div>
                    </aside>
                </div>
            </article>
        </div>
    );
};
