import React from 'react';
import profileImg from '../assets/profile.jpg';
import profile1Img from '../assets/profile-1.jpg';
import profile2Img from '../assets/proile-2.jpg';

interface ProfileGateProps {
    onSelect: (name: string) => void;
}

export const ProfileGate: React.FC<ProfileGateProps> = ({ onSelect }) => {
    const profiles = [
        { name: 'Bala Rajesh', role: 'The Creator', img: profileImg },
        { name: 'Recruiter', role: 'The Professional', img: profile1Img },
        { name: 'Visitor', role: 'The Explorer', img: profile2Img },
    ];

    return (
        <main className="profile-gate">
            <div className="profile-copy">
                <p className="kicker">A personal archive / 2026</p>
                <h1>Who's watching?</h1>
                <p>Choose a lens for the story.</p>
            </div>
            <div className="profile-grid">
                    {profiles.map((profile) => (
                        <button
                            key={profile.name}
                            onClick={() => onSelect(profile.name)}
                            className="profile-card"
                        >
                            <img src={profile.img} alt={`${profile.name} profile`} />
                            <span>{profile.name}</span>
                            <small>{profile.role}</small>
                        </button>
                    ))}
            </div>
            <p className="profile-note">Three ways in. One story underneath.</p>
        </main>
    );
};
