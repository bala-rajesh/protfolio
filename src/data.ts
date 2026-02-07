import type { Item, Section } from './types';

export const PORTFOLIO_DATA: { sections: Section[], hero: Item } = {
    hero: {
        id: 'hero-1',
        title: 'Kunapareddy Bala Rajesh',
        subtitle: 'Java Full Stack Developer',
        description: 'Seeking a challenging position to leverage expertise in Java, Data Structures, Algorithms, and MERN Stack Development. Passionate about AI, Scalable Systems, and healthcare technology.',
        longDescription: 'A dedicated developer with a strong foundation in Java Full Stack development. Currently aiming to contribute to innovative projects at the intersection of Artificial Intelligence and Scalable Systems. Experienced in building robust web applications and content strategy.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
        match: 98,
        year: '2025',
        age: '21+',
        tags: ['Java', 'React', 'AWS', 'Spring Boot'],
        category: 'experience',
        link: '#contact'
    },
    sections: [
        {
            title: 'Trending Projects',
            items: [
                {
                    id: 'p-1',
                    title: 'Disease Prediction Platform',
                    subtitle: 'Alzheimer\'s & Parkinson\'s AI',
                    description: 'AI-powered web app for early detection of diseases through medical image analysis.',
                    longDescription: 'Developed an AI-powered web application for early detection of Alzheimer\'s and Parkinson\'s diseases through medical image analysis using machine learning models. Features a secure user authentication system (HIPAA-compliant), role-based access control, and a comprehensive dashboard with real-time metrics visualization (model accuracy, processing time).',
                    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
                    match: 99,
                    year: '2025',
                    duration: 'React & Python',
                    tags: ['React', 'TensorFlow', 'Python', 'Tailwind'],
                    category: 'project',
                    tech: [{ name: 'React', color: 'blue' }, { name: 'Node.js', color: 'green' }, { name: 'TensorFlow', color: 'orange' }],
                    link: '#' // Placeholder link to test 404
                },
                {
                    id: 'p-2',
                    title: 'Chitrakar',
                    subtitle: 'Artist-Customer Platform',
                    description: 'Full-stack platform connecting artists and customers for custom artwork.',
                    longDescription: 'A MERN stack architecture application connecting artists and customers. Implemented secure authentication with OTP verification, real-time chat functionality for custom painting requests, and Cloudinary integration for efficient image storage, optimizing performance by 40%.',
                    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop',
                    match: 95,
                    year: '2024',
                    duration: 'MERN Stack',
                    tags: ['MongoDB', 'Express', 'React', 'Node'],
                    category: 'project',
                    tech: [{ name: 'MongoDB', color: 'green' }, { name: 'Express', color: 'gray' }, { name: 'React', color: 'blue' }],
                    link: '#'
                }
            ]
        },
        {
            title: 'Work Experience',
            items: [
                {
                    id: 'exp-1',
                    title: 'Infosys',
                    subtitle: 'Java Full Stack Developer',
                    description: 'Implemented cloud-based solutions and scalable architecture designs.',
                    longDescription: 'Remote | Aug 2025 - Present. Completed intensive training in full-stack development and agile methodologies, achieving certification milestones 30% ahead of timeline. Implemented cloud-based solutions using industry-standard platforms, enhancing application performance by 25%.',
                    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
                    match: 98,
                    year: '2025',
                    duration: 'Present',
                    tags: ['Full Stack', 'Cloud', 'Agile'],
                    category: 'experience',
                    link: 'https://www.infosys.com/'
                },
                {
                    id: 'exp-2',
                    title: 'GeeksForGeeks Chapter',
                    subtitle: 'Content Writer',
                    description: 'Developed engaging content strategies increasing student engagement by 40%.',
                    longDescription: 'Srivilliputhur | May 2024 - May 2025. Developed engaging content strategies for college club communications. Implemented collaborative content creation workflows with graphic design teams, enhancing visual storytelling effectiveness by 35%.',
                    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
                    match: 90,
                    year: '2024',
                    duration: '1 Year',
                    tags: ['Content', 'Leadership', 'Strategy'],
                    category: 'experience'
                },
                {
                    id: 'exp-3',
                    title: 'GeeksForGeeks Chapter',
                    subtitle: 'Content Writer',
                    description: 'Developed engaging content strategies increasing student engagement by 40%.',
                    longDescription: 'Srivilliputhur | May 2024 - May 2025. Developed engaging content strategies for college club communications. Implemented collaborative content creation workflows with graphic design teams, enhancing visual storytelling effectiveness by 35%.',
                    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
                    match: 90,
                    year: '2024',
                    duration: '1 Year',
                    tags: ['Content', 'Leadership', 'Strategy'],
                    category: 'experience'
                }
            ]
        },
        {
            title: 'Top Skills',
            items: [
                { id: 'sk-1', title: 'Java', description: 'Core Java, OOPs, Spring Framework', image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop', match: 100, year: 'Pro', tags: ['Backend'], category: 'skill' },
                { id: 'sk-2', title: 'React.js', description: 'Hooks, Redux, Context API', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop', match: 98, year: 'Adv', tags: ['Frontend'], category: 'skill' },
                { id: 'sk-3', title: 'Node.js', description: 'Express, RESTful APIs, Async', image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=2067&auto=format&fit=crop', match: 95, year: 'Adv', tags: ['Backend'], category: 'skill' },
                { id: 'sk-4', title: 'Python', description: 'Pandas, NumPy, Scikit-learn', image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2032&auto=format&fit=crop', match: 90, year: 'Int', tags: ['ML', 'Data'], category: 'skill' },
                { id: 'sk-5', title: 'AWS', description: 'Cloud Infrastructure, Deployment', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', match: 85, year: 'Int', tags: ['Cloud'], category: 'skill' },
            ]
        },
        {
            title: 'Education & Certifications',
            items: [
                { id: 'edu-1', title: 'B.Tech', subtitle: 'Kalasalingam Academy', description: 'GPA: 9.03/10.00. Computer Science & Engineering.', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop', match: 100, year: '2025', category: 'education', tags: ['Degree'] },
                { id: 'cert-1', title: 'Java Certified', subtitle: 'University of Helsinki', description: 'Certified in Java Programming.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop', match: 95, year: '2024', category: 'certification', tags: ['Cert'] },
                { id: 'cert-2', title: 'Machine Learning', subtitle: 'Using Python', description: 'Comprehensive ML course completion.', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop', match: 92, year: '2024', category: 'certification', tags: ['Cert'] },
            ]
        },
        {
            title: 'Hobbies',
            items: [
                { id: 'hobby-1', title: 'Reading', description: 'Reading books and articles.', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop', match: 100, year: '2025', category: 'hobby', tags: ['Hobby'] },
                { id: 'hobby-2', title: 'Gaming', description: 'Playing video games.', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop', match: 95, year: '2024', category: 'hobby', tags: ['Hobby'] },
                { id: 'hobby-3', title: 'Traveling', description: 'Traveling to new places.', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop', match: 92, year: '2024', category: 'hobby', tags: ['Hobby'] },
            ]
        }
    ]
};
