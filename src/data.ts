import type { PortfolioData } from './types';
import profileImg from './assets/profile.jpg';

export const personalLinks = {
    github: 'https://github.com/bala-rajesh',
    linkedin: 'https://www.linkedin.com/in/kunapareddy-bala-rajesh-137a21214',
    email: 'mailto:kunapareddybalarajesh@gmail.com',
    resume: 'https://drive.google.com/file/d/1nJXK7DR9FKVsuosfRhbVDYhErTLZaf1h/view?usp=sharing',
};

export const projectLinks = {
    chitrakar: {
        liveUrl: 'https://chitrakar-app.vercel.app/',
        githubUrl: 'https://github.com/bala-rajesh/ChitraKara',
    },
    alzheimerParkinson: {
        liveUrl: 'https://alzhiemerparkinson.vercel.app/',
        githubUrl: 'https://github.com/bala-rajesh/Alzheimer-and-Parkinson-Prediction',
    },
};

export const experienceLinks = {
    infosys: 'https://www.infosys.com/',
};

export const certificateLinks = {
    infosys: 'https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_auth_01452057076441088015/9bd95189-aa0c-4dcc-a8da-6fc86007b284.pdf',
    geeksForGeeks: 'https://media.geeksforgeeks.org/certificates/1751870662/a5c1365ea1eceae47f8d55c5f0a71cba.pdf',
};

const images = {
    code: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop',
    research: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
    art: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop',
    office: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    team: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop',
    java: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000&auto=format&fit=crop',
    react: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
    python: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1000&auto=format&fit=crop',
    campus: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop',
    books: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop',
};

export const PORTFOLIO_DATA: PortfolioData = {
    hero: {
        id: 'hero', title: 'The Documentary of Life', subtitle: 'Bala Rajesh',
        description: 'A developer documenting what I build, learn, research and discover.',
        longDescription: 'Software Engineer and full-stack developer exploring Java, React, artificial intelligence and the systems that make useful products possible.',
        image: images.code, year: '2026', season: 'S01', episode: 'E01', tags: ['Java', 'React', 'AI'],
        category: 'experience', role: 'Software Engineer / Full-Stack Developer',
        problem: 'How do you turn a collection of work into a story that people can actually enter?',
        solution: 'A living documentary: projects as episodes, tools as a working archive, and the journey as the through-line.',
        built: ['Java and Spring Boot foundations', 'React interfaces and full-stack applications', 'Machine learning experiments and research'],
        challenge: 'Keeping the work honest while making the experience memorable.',
        learned: 'Good software is part problem-solving, part communication, and part staying curious.',
    },
    sections: [
        {
            title: 'Continue Watching', eyebrow: 'FEATURED WORK', variant: 'poster', items: [
                {
                    id: 'project-disease', title: 'Alzheimer & Parkinson Prediction', subtitle: 'Machine Learning Research',
                    description: 'An AI-powered web app for exploring early disease detection through medical image analysis.',
                    longDescription: 'A research-oriented application that brings machine learning models and a web interface together for medical image analysis.',
                    image: images.research, year: '2025', season: 'S01', episode: 'E01', tags: ['React', 'TensorFlow', 'Python', 'Tailwind'],
                    tech: [{ name: 'React' }, { name: 'Python' }, { name: 'TensorFlow' }], category: 'project', role: 'Full-stack developer', liveUrl: projectLinks.alzheimerParkinson.liveUrl, githubUrl: projectLinks.alzheimerParkinson.githubUrl,
                    problem: 'Make an experimental medical-imaging workflow easier to explore from a browser.',
                    solution: 'Connected a React interface to machine learning workflows and visualized the returned results.',
                    built: ['React interface', 'Python and TensorFlow model workflow', 'Authentication and role-based access'],
                    challenge: 'Presenting technical model output in a way that remains understandable.',
                    learned: 'Research products need careful interfaces as much as they need working models.',
                },
                {
                    id: 'project-chitrakar', title: 'ChitraKara', subtitle: 'Artist-Customer Platform',
                    description: 'A full-stack platform connecting artists and customers around custom artwork.',
                    longDescription: 'A MERN stack application for custom painting requests, with authentication, conversations and image handling.',
                    image: images.art, year: '2024', season: 'S01', episode: 'E02', tags: ['MongoDB', 'Express', 'React', 'Node'],
                    tech: [{ name: 'MongoDB' }, { name: 'Express' }, { name: 'React' }, { name: 'Node.js' }], category: 'project', role: 'Full-stack developer', liveUrl: projectLinks.chitrakar.liveUrl, githubUrl: projectLinks.chitrakar.githubUrl,
                    problem: 'Give artists and customers a clearer way to discuss and manage custom work.',
                    solution: 'Built a MERN application with OTP authentication, real-time chat and Cloudinary image storage.',
                    built: ['OTP authentication', 'Real-time chat for painting requests', 'Cloudinary image storage and delivery'],
                    challenge: 'Balancing the needs of two different user roles in one flow.',
                    learned: 'The best product decisions often come from mapping the conversation before writing the code.',
                },
            ],
        },
        {
            title: 'Latest Episodes', eyebrow: 'WORK & STUDY', variant: 'landscape', items: [
                { id: 'experience-infosys', title: 'Infosys', subtitle: 'Java Full Stack Developer', description: 'Training and work across full-stack development, cloud-based solutions and agile methods.', image: images.office, year: '2025 - Present', season: 'S01', episode: 'E03', duration: 'Present', tags: ['Java', 'Full Stack', 'Cloud'], category: 'experience', liveUrl: experienceLinks.infosys, role: 'Java Full Stack Developer', certificateUrl: certificateLinks.infosys },
                { id: 'experience-gfg', title: 'GeeksForGeeks Chapter', subtitle: 'Content Writer', description: 'Created content and collaborated with design teams for college club communications.', image: images.team, year: '2024 - 2025', season: 'S01', episode: 'E04', tags: ['Writing', 'Content', 'Design'], category: 'experience', role: 'Content Writer', certificateUrl: certificateLinks.geeksForGeeks },
                { id: 'education', title: 'B.Tech / Computer Science', subtitle: 'Kalasalingam Academy', description: 'Computer Science and Engineering, completed in 2025.', image: images.campus, year: '2025', season: 'S01', episode: 'E05', tags: ['Education', 'Computer Science'], category: 'education' },
            ],
        },
    ],
    journey: [
        { code: 'S01 E01', title: 'The Beginning', description: 'Started coding and exploring software development.' },
        { code: 'S01 E02', title: 'The Builder', description: 'Started building web applications and learning full-stack development.' },
        { code: 'S01 E03', title: 'The Researcher', description: 'Explored machine learning and research projects.' },
        { code: 'S01 E04', title: 'The Engineer', description: 'Deepened work with Java, Spring Boot, data structures and backend development.' },
        { code: 'S01 E05', title: "What's Next", description: 'Continuing to learn, build and document the next chapter.' },
    ],
    toolkit: [
        { label: 'Backend', items: ['Java', 'Spring Boot', 'JPA', 'Hibernate'] },
        { label: 'Frontend', items: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind'] },
        { label: 'Database', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
        { label: 'AI / ML', items: ['Python', 'TensorFlow', 'Machine Learning'] },
        { label: 'Design', items: ['Figma', 'UI/UX'] },
    ],
    currentlyBuilding: { title: 'Portfolio v2', status: 'In Progress', description: 'Turning a developer portfolio into a documentary about the work behind it.' },
    beyondCode: ['Movies', 'Anime', 'Writing', 'Design', 'Reading', 'Technology'],
    about: {
        name: 'Bala Rajesh',
        role: 'Software Engineer / Full-Stack Developer',
        description: 'A developer exploring Java, React, artificial intelligence and the systems that make useful products possible. This archive brings together the applications, research, writing and learning that shape the work.',
        image: profileImg,
    },
};
