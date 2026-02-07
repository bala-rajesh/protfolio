import React from 'react';
import { Home } from 'lucide-react';

interface NotFoundOverlayProps {
    onClose: () => void;
}

export const NotFoundOverlay: React.FC<NotFoundOverlayProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-150 flex flex-col items-center justify-center bg-[#141414]/95 backdrop-blur-xl animate-fade-in p-6">
            <div className="absolute top-8 left-8">
                <div className="text-red-600 text-3xl font-bold tracking-tighter">PORTFOLIO</div>
            </div>

            <div className="max-w-lg text-center space-y-6 animate-scale-up">
                <h1 className="text-6xl md:text-8xl font-black text-white mb-4">404</h1>
                <h2 className="text-2xl md:text-4xl font-bold text-white">Lost in Space?</h2>
                <p className="text-gray-400 text-lg">
                    Sorry, we can't find that page. You'll find lots to explore on the home page.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
                    <button
                        onClick={onClose}
                        className="bg-white text-black px-8 py-3 rounded font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all active:scale-95"
                    >
                        <Home className="w-5 h-5" /> Netflix Home
                    </button>

                    <div className="text-gray-500 text-sm flex items-center justify-center gap-2 border-l border-gray-700 pl-4 ml-2">
                        <span>Error Code: <span className="font-mono text-red-500">NSES-404</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
