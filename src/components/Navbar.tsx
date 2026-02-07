import React from 'react';
import { Github, Linkedin } from 'lucide-react';

interface NavbarProps {
    scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#141414]/95 backdrop-blur-md shadow-lg' : 'bg-linear-to-b from-black/80 to-transparent'}`}>
            <div className="px-4 md:px-12 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="text-red-600 text-2xl md:text-3xl font-bold tracking-tighter cursor-pointer hover:scale-105 transition-transform duration-300">PORTFOLIO</div>
                    <div className="hidden md:flex gap-6 text-sm text-gray-300">
                        {['Home', 'Projects', 'Experience', 'Skills', 'My List'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                className="font-medium hover:text-white transition-colors relative group"
                            >
                                {item}
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-6 text-white">
                    <Github className="w-5 h-5 cursor-pointer hover:text-gray-300 hover:scale-110 transition-transform duration-200" />
                    <Linkedin className="w-5 h-5 cursor-pointer hover:text-gray-300 hover:scale-110 transition-transform duration-200" />
                    <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-white transition-all duration-200">
                        <span className="text-xs font-bold">BR</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};
