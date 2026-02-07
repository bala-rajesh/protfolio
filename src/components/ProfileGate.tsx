import React, { useState } from 'react';
import { AlertCircle, Lock } from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import profile1Img from '../assets/profile-1.jpg';
import profile2Img from '../assets/proile-2.jpg';
import { AlertCard } from './ui/alert-card';

interface ProfileGateProps {
    onSelect: (name: string) => void;
}

export const ProfileGate: React.FC<ProfileGateProps> = ({ onSelect }) => {
    const [alertConfig, setAlertConfig] = useState<{
        isVisible: boolean;
        title: string;
        description: string;
        icon?: React.ReactNode;
    }>({
        isVisible: false,
        title: '',
        description: ''
    });

    const profiles = [
        { name: 'Bala Rajesh', img: profileImg },
        { name: 'Recruiter', img: profile1Img },
        { name: 'Visitor', img: profile2Img },
    ];

    const handleProfileClick = (name: string) => {
        onSelect(name);
    };

    const showAlert = (type: 'add' | 'manage') => {
        if (type === 'add') {
            setAlertConfig({
                isVisible: true,
                title: 'Plan Limitation',
                description: 'Your current plan does not support adding more profiles. Please upgrade your subscription to add up to 5 profiles.',
                icon: <AlertCircle className="h-6 w-6 text-red-500" />
            });
        } else {
            setAlertConfig({
                isVisible: true,
                title: 'Access Denied',
                description: 'You are not authorized to manage profiles. Please contact the account administrator.',
                icon: <Lock className="h-6 w-6 text-red-500" />
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-black via-[#141414] to-[#200505] animate-pulse-slow opacity-50 z-0"></div>

            {/* Alert Overlay */}
            {alertConfig.isVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <AlertCard
                        isVisible={alertConfig.isVisible}
                        title={alertConfig.title}
                        description={alertConfig.description}
                        buttonText="Understood"
                        onButtonClick={() => setAlertConfig(prev => ({ ...prev, isVisible: false }))}
                        onDismiss={() => setAlertConfig(prev => ({ ...prev, isVisible: false }))}
                        icon={alertConfig.icon}
                    />
                </div>
            )}

            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl font-medium mb-12 tracking-wide text-center animate-slide-down">Who's watching?</h1>
                <div className="flex flex-wrap justify-center gap-8 animate-scale-up-gentle">
                    {profiles.map((profile) => (
                        <div
                            key={profile.name}
                            onClick={() => handleProfileClick(profile.name)}
                            className="group flex flex-col items-center cursor-pointer"
                        >
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-md bg-linear-to-br from-red-600 to-red-900 flex items-center justify-center border-2 border-transparent group-hover:border-white group-hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] transition-all duration-300 overflow-hidden relative active:scale-95">
                                <img
                                    src={profile.img}
                                    alt={profile.name}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                />
                            </div>
                            <span className="mt-4 text-gray-400 text-lg group-hover:text-white transition-colors duration-300">{profile.name}</span>
                        </div>
                    ))}

                    <div
                        onClick={() => showAlert('add')}
                        className="group flex flex-col items-center cursor-pointer transition-transform active:scale-95"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-md bg-[#2f2f2f] flex items-center justify-center border-2 border-transparent group-hover:border-gray-400 group-hover:bg-[#404040] transition-all duration-300">
                            <div className="text-4xl text-gray-400 group-hover:text-white transition-colors duration-300">+</div>
                        </div>
                        <span className="mt-4 text-gray-500 group-hover:text-gray-300 transition-colors duration-300">Add Profile</span>
                    </div>
                </div>
                <button
                    onClick={() => showAlert('manage')}
                    className="mt-20 border border-gray-500 text-gray-500 px-8 py-2 uppercase tracking-widest text-sm hover:border-white hover:text-white hover:bg-white/10 transition-all duration-300 active:scale-95"
                >
                    Manage Profiles
                </button>
            </div>
        </div>
    );
};
