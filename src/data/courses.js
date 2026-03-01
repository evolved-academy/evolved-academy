export const paidTechCourses = [
    {
        title: '5 Day AI Bootcamp 2026',
        description: 'Master AI in just 5 days with this intensive bootcamp.',
        price: '₹999',
        code: 'EATSAI0526',
        videoId: 'TQ7jr79LAkc',
        modules: [
            { title: 'Module 1', duration: '0m', lectures: [] },
            { title: 'Module 2', duration: '0m', lectures: [] },
            { title: 'Module 3', duration: '0m', lectures: [] },
            { title: 'Module 4', duration: '0m', lectures: [] },
            { title: 'Module 5', duration: '0m', lectures: [] }
        ]
    },
    {
        title: 'Advanced AI & ML',
        description: 'Master machine learning algorithms.',
        price: '$149',
        code: 'EATSAI0126',
        videoId: 'oJ9gxehvN9Y',
        modules: [
            {
                title: 'Module 1: Intro to AI',
                duration: '45m',
                lectures: [
                    { title: 'What is AI?', duration: '15m', videoId: 'oJ9gxehvN9Y' },
                    { title: 'History of AI', duration: '30m', videoId: 'TQ7jr79LAkc' }
                ]
            },
            {
                title: 'Module 2: Python for Data Science',
                duration: '1h 30m',
                lectures: [
                    { title: 'NumPy Basics', duration: '45m', videoId: 'oJ9gxehvN9Y' },
                    { title: 'Pandas DataFrames', duration: '45m', videoId: 'TQ7jr79LAkc' }
                ]
            }
        ]
    },
    {
        title: 'Cloud Computing',
        description: 'AWS and Azure certification prep.',
        price: '$129',
        code: 'EATSCC0126',
        videoId: 'TQ7jr79LAkc',
        modules: [
            {
                title: 'Module 1: Cloud Concepts',
                duration: '1h',
                lectures: [
                    { title: 'What is Cloud Computing?', duration: '30m', videoId: 'TQ7jr79LAkc' },
                    { title: 'Cloud Service Models', duration: '30m', videoId: 'oJ9gxehvN9Y' }
                ]
            }
        ]
    },
];

export const paidNonTechCourses = [];

export const paidCourses = [...paidTechCourses, ...paidNonTechCourses];

export const freeTechCourses = [
    { title: 'Top AI Tools For Study', description: 'Top In Your Class With AI!', videoId: 'TQ7jr79LAkc' },
    { title: 'Unleashing Creativity with AI', description: 'How AI is Changing Art, Music & Design 🎨🤖', videoId: 'oJ9gxehvN9Y' },
    { title: 'Intro to Python', description: 'Learn Python from scratch.' },
    { title: 'Web Development Basics', description: 'HTML, CSS, and JS fundamentals.' },
    { title: 'Data Science 101', description: 'Introduction to data analysis.' },
];

export const freeNonTechCourses = [
    { title: 'Soft Skills Mastery', description: 'Communication, leadership, and emotional intelligence.' },
    { title: 'Creative Writing', description: 'Unlock your inner storyteller.' },
    { title: 'Time Management', description: 'Prioritize tasks and boost productivity.' },
];
