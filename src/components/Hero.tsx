import React from 'react';
import { Play as PlayIcon, Info as InfoIcon } from 'lucide-react';
import type { Item } from '../types';

interface HeroProps {
    item: Item;
    onMoreInfo: (item: Item) => void;
    onPlay: (link?: string) => void;
    profileName?: string;
}

export const Hero: React.FC<HeroProps> = ({ item, onMoreInfo, onPlay, profileName }) => {
    return (
        <div className="relative h-[min(95vh,720px)] w-full text-white overflow-hidden group">
            <div className="absolute inset-0">
                <img
                    src={item.image}
                    alt="Hero"
                    className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-105"
                />
                {/* Gradients for overlap blending */}
                <div className="absolute inset-0 bg-linear-to-r from-[#141414] via-[#141414]/60 to-transparent"></div>
                <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-[#141414] to-transparent z-10"></div>
            </div>

            <div className="absolute top-[20%] md:top-[20%] landscape-sm:top-[15%] left-4 md:left-12 max-w-2xl p-4 z-20">
                {profileName && (
                    <div className="mb-2 animate-fade-in opacity-0" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                        <span className="text-xl md:text-2xl landscape-sm:text-lg font-light text-gray-300">Welcome, <span className="font-bold text-white">{profileName}</span></span>
                    </div>
                )}
                <div className="flex items-center gap-2 mb-4 animate-fade-in-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                    <div className="w-8 h-8 bg-red-600 flex items-center justify-center rounded-sm shadow-lg shadow-red-900/50">
                        <span className="font-bold text-lg">N</span>
                    </div>
                    <span className="tracking-[0.2em] text-sm text-gray-300 font-bold uppercase">Series</span>
                </div>
                <h1 className="text-3xl md:text-6xl landscape-sm:text-2xl font-extrabold mb-4 leading-tight shadow-black drop-shadow-lg animate-fade-in-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                    {item.title}
                </h1>
                <div className="flex items-center gap-4 mb-6 text-green-400 font-bold animate-fade-in-up opacity-0 landscape-sm:text-sm" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                    <span>{item.match}% Match</span>
                    <span className="text-gray-300 font-normal">{item.year}</span>
                    <span className="border border-gray-500 px-1 text-xs text-gray-300">{item.age}</span>
                    <span className="text-gray-300 font-normal">4 Seasons</span>
                </div>
                <p className="text-lg md:text-xl text-gray-200 mb-8 line-clamp-3 md:line-clamp-none animate-fade-in-up opacity-0 landscape-sm:hidden" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                    {item.description}
                </p>
                <div className="flex gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                    <button
                        onClick={() => onPlay(item.link)}
                        className="bg-white text-black px-6 md:px-8 py-2 md:py-3 landscape-sm:px-4 landscape-sm:py-1 landscape-sm:text-sm rounded flex items-center gap-2 font-bold hover:bg-opacity-90 transition-all duration-200 active:scale-95 shadow-lg shadow-white/10 hover:shadow-white/20 cursor-pointer"
                    >
                        <PlayIcon className="fill-black w-5 h-5 landscape-sm:w-4 landscape-sm:h-4" /> Resume
                    </button>
                    <button
                        onClick={() => onMoreInfo(item)}
                        className="bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 landscape-sm:px-4 landscape-sm:py-1 landscape-sm:text-sm rounded flex items-center gap-2 font-bold hover:bg-gray-500/50 transition-all duration-200 backdrop-blur-sm active:scale-95 border border-transparent hover:border-gray-400"
                    >
                        <InfoIcon className="w-5 h-5 landscape-sm:w-4 landscape-sm:h-4" /> More Info
                    </button>
                </div>
            </div>
        </div>
    );
};
