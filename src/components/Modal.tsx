import React from 'react';
import { Play, X, ExternalLink } from 'lucide-react';
import type { Item } from '../types';

interface ModalProps {
    item: Item;
    onClose: () => void;
    onPlay: (link?: string) => void;
}

export const Modal: React.FC<ModalProps> = ({ item, onClose, onPlay }) => {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-fade-in transition-all duration-300">
            {/* Click outside to close */}
            <div className="absolute inset-0 z-0" onClick={onClose}></div>

            {/* Close Button - Fixed to viewport for visibility */}
            <button
                onClick={onClose}
                className="fixed top-6 right-6 z-[120] bg-black/50 backdrop-blur-md rounded-full p-2 text-white hover:bg-white hover:text-black transition-all duration-300 group hover:rotate-90 border border-gray-700"
            >
                <X className="w-8 h-8" />
            </button>

            <div className="bg-[#181818] w-full max-w-3xl rounded-lg shadow-2xl relative overflow-hidden animate-scale-up z-10 my-10 ring-1 ring-gray-700">

                {/* Modal Hero */}
                <div className="relative h-[300px] w-full group">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[10s] ease-linear group-hover:scale-105" />
                    <div className="absolute inset-0 bg-linear-to-t from-[#181818] via-[#181818]/20 to-transparent"></div>

                    <div className="absolute bottom-12 left-8 md:left-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{item.title}</h1>
                        <div className="flex gap-4">
                            <button
                                className="bg-white text-black px-8 py-2 rounded font-bold flex items-center gap-2 hover:bg-gray-200 transition-all duration-200 active:scale-95 shadow-lg shadow-black/50"
                                onClick={() => onPlay(item.link)}
                            >
                                <Play className="fill-black w-5 h-5" />
                                {item.link ? 'View Project' : 'Read More'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center gap-4 text-lg">
                            <span className="text-green-400 font-bold">{item.match}% Match</span>
                            <span>{item.year}</span>
                            <span className="border border-gray-500 px-1 text-sm bg-gray-800/50">{item.age || '18+'}</span>
                            <span>{item.duration || 'Feature'}</span>
                        </div>

                        <p className="text-lg text-gray-300 leading-relaxed font-light">
                            {item.longDescription || item.description}
                        </p>

                        {item.tech && (
                            <div className="pt-4 border-t border-gray-800">
                                <h3 className="text-gray-400 font-bold mb-3 uppercase text-xs tracking-widest">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {item.tech.map((t, i) => (
                                        <span
                                            key={i}
                                            className={`px-3 py-1 rounded-full text-sm font-medium border border-gray-700 bg-gray-800/50 hover:bg-gray-700 transition-colors cursor-default`}
                                        >
                                            {t.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="text-sm space-y-6">
                        <div>
                            <span className="text-gray-500 block mb-1">Tags</span>
                            <span className="text-gray-300 leading-snug">{item.tags.join(', ')}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 block mb-1">Category</span>
                            <span className="text-gray-300 capitalize">{item.category}</span>
                        </div>

                        {item.link && (
                            <div className="pt-4">
                                <button
                                    onClick={() => onPlay(item.link)}
                                    className="flex items-center gap-2 text-gray-300 hover:text-white hover:underline transition-all group"
                                >
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    Visit Website
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
