import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CourseGrid from '../components/CourseGrid';

const FreeCourses = () => {
    const courses = [
        { title: 'Top AI Tools For Study', description: 'Top In Your Class With AI!', videoId: 'TQ7jr79LAkc' },
        { title: 'Unleashing Creativity with AI', description: 'How AI is Changing Art, Music & Design 🎨🤖', videoId: 'oJ9gxehvN9Y' },
        { title: 'Intro to Python', description: 'Learn Python from scratch.' },
        { title: 'Web Development Basics', description: 'HTML, CSS, and JS fundamentals.' },
        { title: 'Data Science 101', description: 'Introduction to data analysis.' },
    ];
    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h2 style={{ color: 'var(--color-primary)' }}>Free Tech Courses</h2>
            <CourseGrid items={courses} type="video" />
        </div>
    );
};

const PaidCourses = () => {
    const courses = [
        { title: 'Full Stack Bootcamp', description: 'Become a full stack developer.', price: '$99' },
        { title: 'Advanced AI & ML', description: 'Master machine learning algorithms.', price: '$149' },
        { title: 'Cloud Computing', description: 'AWS and Azure certification prep.', price: '$129' },
    ];
    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h2 style={{ color: 'var(--color-primary)' }}>Premium Tech Courses</h2>
            <CourseGrid items={courses} type="paid" />
        </div>
    );
};

import SEO from '../components/SEO';

const TechSkillsPage = () => {
    return (
        <>
            <SEO
                title="Tech & Professional Skills | EvolvEd Academy"
                description="Learn Coding, Web Development, AI, and Soft Skills. Practical courses designed to make you industry-ready."
            />
            <Routes>
                <Route path="free" element={<FreeCourses />} />
                <Route path="paid" element={<PaidCourses />} />
                <Route path="/" element={<FreeCourses />} />
            </Routes>
        </>
    );
};

export default TechSkillsPage;
