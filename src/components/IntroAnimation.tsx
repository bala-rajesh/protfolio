import React, { useEffect } from 'react';
import { FastForward, Volume2 } from 'lucide-react';
import { playTadum } from '../lib/utils';

interface IntroAnimationProps {
    onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
    useEffect(() => {
        // Attempt to trigger the signature Ta-Dum audio
        playTadum();
        const timer = window.setTimeout(onComplete, 2900);
        return () => window.clearTimeout(timer);
    }, [onComplete]);

    const handleSkip = () => {
        onComplete();
    };

    return (
        <div className="intro-screen" role="status" aria-label="Opening credits" onClick={handleSkip}>
            <div className="intro-badge-wrapper">
                <span className="intro-netflix-n" aria-hidden="true">B</span>
            </div>
            <p className="intro-name">BALA RAJESH</p>
            <p className="intro-presents">PRESENTS A DOCUMENTARY ARCHIVE</p>
            <h1>THE DOCUMENTARY<br /><span>OF LIFE</span></h1>
            
            <button
                className="intro-skip-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    handleSkip();
                }}
                aria-label="Skip opening credits"
            >
                <FastForward className="w-3.5 h-3.5" /> Skip Intro
            </button>
            <div className="intro-sound-hint">
                <Volume2 className="w-3 h-3 inline mr-1" /> Spatial Audio Synthesized
            </div>
        </div>
    );
};
