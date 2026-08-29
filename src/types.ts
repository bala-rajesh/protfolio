export interface TechStack {
    name: string;
    color?: string;
}

export interface Item {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    longDescription?: string;
    image: string;
    year: string;
    season?: string;
    episode?: string;
    duration?: string;
    tags: string[];
    tech?: TechStack[];
    liveUrl?: string;
    githubUrl?: string;
    certificateUrl?: string;
    role?: string;
    problem?: string;
    solution?: string;
    built?: string[];
    challenge?: string;
    learned?: string;
    category: 'project' | 'experience' | 'certification' | 'education' | 'skill' | 'hobby';
}

export interface Section {
    title: string;
    eyebrow?: string;
    variant?: 'poster' | 'landscape' | 'minimal';
    items: Item[];
}

export interface JourneyEpisode {
    code: string;
    title: string;
    description: string;
    year?: string;
}

export interface SkillGroup {
    label: string;
    items: string[];
}

export interface PortfolioData {
    hero: Item;
    sections: Section[];
    journey: JourneyEpisode[];
    toolkit: SkillGroup[];
    currentlyBuilding: { title: string; status: string; description: string };
    beyondCode: string[];
    about: { name: string; role: string; description: string; image: string };
}
