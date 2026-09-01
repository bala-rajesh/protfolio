import React, { useRef } from 'react';
import { ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon, ExternalLink, Github, Award, Play, BookOpen, Heart } from 'lucide-react';
import type { Item } from '../types';

interface RowProps {
    title: string;
    items: Item[];
    onSelect: (item: Item) => void;
    onToggleMyList?: (itemId: string) => void;
    isInMyList?: (itemId: string) => boolean;
    isFirst?: boolean;
    variant?: 'poster' | 'landscape' | 'minimal' | 'ranked';
    eyebrow?: string;
}

export const Row: React.FC<RowProps> = ({ 
    title, 
    items, 
    onSelect, 
    onToggleMyList,
    isInMyList,
    isFirst, 
    variant = 'poster', 
    eyebrow 
}) => {
    const rowRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <section
            id={isFirst ? 'work' : undefined}
            className={`content-row ${isFirst ? 'first-row' : ''}`}
            aria-label={title}
        >
            <div className="row-heading">
                <div>
                    <p className="kicker">{eyebrow ?? 'EPISODE SELECT'}</p>
                    <h2>{title}</h2>
                </div>
                <ChevronRightIcon className="row-heading-icon" aria-hidden="true" />
            </div>

            <div className="relative group/row">
                {/* Left Scroll Button */}
                <button
                    aria-label={`Scroll ${title} left`}
                    onClick={() => scroll('left')}
                    className="row-arrow row-arrow-left"
                >
                    <ChevronLeftIcon />
                </button>

                {/* Scroll Container */}
                <div ref={rowRef} className={`row-track ${variant === 'landscape' ? 'landscape-track' : ''} ${variant === 'ranked' ? 'ranked-track' : ''}`}>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="poster-card"
                            onClick={() => onSelect(item)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onSelect(item);
                                }
                            }}
                            aria-label={`View details for ${item.title}`}
                        >
                            <img src={item.image} alt={item.title} loading="lazy" />
                            
                            {/* Rank Number for Ranked Variant */}
                            {variant === 'ranked' && item.rank && (
                                <div className="ranked-card-number" aria-hidden="true">{item.rank}</div>
                            )}
                            
                            <span className="poster-number">{item.season} · {item.episode}</span>
                            
                            {/* Badges */}
                            {item.paperUrl && (
                                <span className="poster-paper-badge" title="Published in IEEE Xplore">
                                    <BookOpen className="w-3 h-3" /> IEEE Paper
                                </span>
                            )}
                            {item.certificateUrl && !item.paperUrl && (
                                <span className="poster-cert-badge" title="Verified Certificate Available">
                                    <Award className="w-3 h-3" /> Certificate
                                </span>
                            )}
                            
                            <div className="poster-copy">
                                <strong>{item.title}</strong>
                                <small>{item.subtitle ?? item.tags.slice(0, 2).join(' / ')}</small>
                                
                                {/* Quick Actions */}
                                <div className="poster-actions">
                                    <span className="poster-play-prompt">
                                        <Play className="w-3 h-3 fill-current inline mr-1" /> View Episode
                                    </span>
                                    <div className="poster-action-links">
                                        {onToggleMyList && (
                                            <button
                                                type="button"
                                                className={`poster-action-btn ${isInMyList?.(item.id) ? 'is-liked' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onToggleMyList(item.id);
                                                }}
                                                title={isInMyList?.(item.id) ? 'Remove from My List' : 'Add to My List'}
                                                aria-label={`${isInMyList?.(item.id) ? 'Remove from' : 'Add to'} My List`}
                                            >
                                                <Heart className={`w-3 h-3 ${isInMyList?.(item.id) ? 'fill-red-500' : ''}`} />
                                            </button>
                                        )}
                                        {item.paperUrl && (
                                            <a
                                                href={item.paperUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="poster-action-btn poster-action-btn-paper"
                                                onClick={(e) => e.stopPropagation()}
                                                title="Read Published IEEE Research Paper"
                                                aria-label={`Read ${item.title} published IEEE paper`}
                                            >
                                                <BookOpen className="w-3 h-3" />
                                            </a>
                                        )}
                                        {item.liveUrl && (
                                            <a
                                                href={item.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="poster-action-btn"
                                                onClick={(e) => e.stopPropagation()}
                                                title="Visit Live Application"
                                                aria-label={`Open ${item.title} live application`}
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                        {item.githubUrl && (
                                            <a
                                                href={item.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="poster-action-btn"
                                                onClick={(e) => e.stopPropagation()}
                                                title="View GitHub Source"
                                                aria-label={`Open ${item.title} GitHub repository`}
                                            >
                                                <Github className="w-3 h-3" />
                                            </a>
                                        )}
                                        {item.certificateUrl && (
                                            <a
                                                href={item.certificateUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="poster-action-btn"
                                                onClick={(e) => e.stopPropagation()}
                                                title="View Certificate PDF"
                                                aria-label={`Open ${item.title} certificate PDF`}
                                            >
                                                <Award className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Scroll Button */}
                <button
                    aria-label={`Scroll ${title} right`}
                    onClick={() => scroll('right')}
                    className="row-arrow row-arrow-right"
                >
                    <ChevronRightIcon />
                </button>
            </div>
        </section>
    );
};
