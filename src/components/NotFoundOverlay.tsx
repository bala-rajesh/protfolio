import React from 'react';
import { Home } from 'lucide-react';

interface NotFoundOverlayProps {
    onClose: () => void;
}

export const NotFoundOverlay: React.FC<NotFoundOverlayProps> = ({ onClose }) => {
    return (
        <div className="not-found-overlay" role="dialog" aria-modal="true">
            <div className="not-found-copy">
                <p className="kicker">A missing scene</p><h1>404</h1><h2>That episode is still unwritten.</h2><p>The archive is here, but this particular path has not made the final cut.</p>
                <div className="not-found-actions">
                    <button
                        onClick={onClose}
                        className="button button-primary"
                    >
                        <Home /> Return home
                    </button>
                </div>
            </div>
        </div>
    );
};
