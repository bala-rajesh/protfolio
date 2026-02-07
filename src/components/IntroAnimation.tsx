import React from 'react';
import horizontalVideo from '../assets/Netflix New Logo Animation 2019.mp4';
import verticalVideo from '../assets/vertical-logo.mp4';

interface IntroAnimationProps {
    onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
    return (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
            <video
                autoPlay
                muted
                playsInline
                onEnded={onComplete}
                className="w-full h-full object-cover"
            >
                <source media="(orientation: portrait)" src={verticalVideo} type="video/mp4" />
                <source media="(orientation: landscape)" src={horizontalVideo} type="video/mp4" />
                {/* Fallback for browsers that don't support media queries in source */}
                <source src={horizontalVideo} type="video/mp4" />
            </video>
        </div>
    );
};
