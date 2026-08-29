import React, { useRef } from 'react';
import { ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon } from 'lucide-react';
import type { Item } from '../types';

interface RowProps {
    title: string;
    items: Item[];
    onSelect: (item: Item) => void;
    isFirst?: boolean;
    variant?: 'poster' | 'landscape' | 'minimal';
    eyebrow?: string;
}

export const Row: React.FC<RowProps> = ({ title, items, onSelect, isFirst, variant = 'poster', eyebrow }) => {
    const rowRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div
            id={isFirst ? 'work' : undefined}
            className={`content-row ${isFirst ? 'first-row' : ''}`}
        >
            <div className="row-heading"><div><p className="kicker">{eyebrow ?? 'EPISODE SELECT'}</p><h2>{title}</h2></div><ChevronRightIcon aria-hidden="true" /></div>

            <div className="relative group/row">
                {/* Left Scroll Button */}
                <button aria-label={`Scroll ${title} left`}
                    onClick={() => scroll('left')}
                    className="row-arrow row-arrow-left"
                >
                    <ChevronLeftIcon />
                </button>

                {/* Scroll Container */}
                <div ref={rowRef} className={`row-track ${variant === 'landscape' ? 'landscape-track' : ''}`}>
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className="poster-card"
                        >
                            <img src={item.image} alt={item.title} loading="lazy" />
                            <span className="poster-number">{item.season} · {item.episode}</span>
                            <span className="poster-copy"><strong>{item.title}</strong><small>{item.subtitle ?? item.tags.slice(0, 2).join(' / ')}</small><em>Watch project</em></span>
                        </button>
                    ))}
                </div>

                {/* Right Scroll Button */}
                <button aria-label={`Scroll ${title} right`}
                    onClick={() => scroll('right')}
                    className="row-arrow row-arrow-right"
                >
                    <ChevronRightIcon />
                </button>
            </div>
        </div>
    );
};
