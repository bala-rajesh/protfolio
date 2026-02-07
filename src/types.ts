export interface TechStack {
    name: string;
    color: string;
}

export interface Item {
    id: string;
    title: string;
    subtitle?: string;
    description: string;
    longDescription?: string;
    image: string;
    match: number;
    duration?: string;
    year: string;
    age?: string;
    tags: string[];
    tech?: TechStack[];
    link?: string;
    github?: string;
    category: 'project' | 'experience' | 'certification' | 'education' | 'skill' | 'hobby';
}

export interface Section {
    title: string;
    items: Item[];
}
