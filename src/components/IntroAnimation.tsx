import React, { useEffect } from 'react';

interface IntroAnimationProps {
    onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
    useEffect(() => {
        const timer = window.setTimeout(onComplete, 2600);
        return () => window.clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="intro-screen" role="status" aria-label="Opening credits">
            <p className="intro-name">BALA RAJESH</p>
            <p className="intro-presents">presents</p>
            <h1>THE DOCUMENTARY<br />OF LIFE</h1>
        </div>
    );
};
