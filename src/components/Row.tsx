import React, { useRef, useState } from 'react';
import { ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon } from 'lucide-react';
import type { Item } from '../types';

interface RowProps {
    title: string;
    items: Item[];
    onSelect: (item: Item) => void;
    isFirst?: boolean;
}

export const Row: React.FC<RowProps> = ({ title, items, onSelect, isFirst }) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const [, setIsHovered] = useState(false);

    const scroll = (direction: 'left' | 'right') => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div
            className={`relative group z-30 transition-all duration-300 ${isFirst ? '-mt-8 md:-mt-8 landscape-sm:-mt-2 pb-12' : 'mb-8'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 className="text-gray-200 text-lg md:text-xl font-bold mb-3 pl-4 md:pl-12 hover:text-white cursor-pointer transition-colors duration-300 flex items-center gap-2 group/title z-40 relative">
                {title} <ChevronRightIcon className="w-4 h-4 opacity-0 group-hover/title:opacity-100 group-hover/title:translate-x-1 transition-all duration-300 text-cyan-400" />
            </h2>

            <div className="relative group/row">
                {/* Left Scroll Button */}
                <div
                    onClick={() => scroll('left')}
                    className={`absolute left-0 top-0 bottom-0 bg-linear-to-r from-black/80 to-transparent z-40 w-12 flex items-center justify-center cursor-pointer opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:w-14 active:scale-95`}
                >
                    <ChevronLeftIcon className="text-white w-8 h-8 transform hover:scale-125 transition-transform" />
                </div>

                {/* Scroll Container */}
                <div ref={rowRef} className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth py-8 px-4 md:px-12 -my-8">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onSelect(item)}
                            className="
                flex-none w-[200px] md:w-[280px] aspect-video relative rounded-md cursor-pointer 
                transition-all duration-300 ease-in-out
                hover:scale-110 hover:z-50 hover:shadow-[0_10px_20px_rgba(0,0,0,0.8)]
                group/card bg-[#1a1a1a] border border-transparent hover:border-gray-700
                origin-center
              "
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover rounded-md transition-all duration-300 group-hover/card:brightness-110"
                            />

                            {/* Hover Details Card */}
                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-md flex flex-col justify-end p-4">
                                <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-white font-bold text-sm drop-shadow-md">{item.title}</h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {item.tags.slice(0, 3).map((tag, idx) => (
                                            <span key={idx} className="text-[10px] text-gray-200 font-semibold bg-gray-800/80 px-2 py-0.5 rounded backdrop-blur-sm border border-gray-600">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Scroll Button */}
                <div
                    onClick={() => scroll('right')}
                    className={`absolute right-0 top-0 bottom-0 bg-linear-to-l from-black/80 to-transparent z-40 w-12 flex items-center justify-center cursor-pointer opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:w-14 active:scale-95`}
                >
                    <ChevronRightIcon className="text-white w-8 h-8 transform hover:scale-125 transition-transform" />
                </div>
            </div>
        </div>
    );
};
