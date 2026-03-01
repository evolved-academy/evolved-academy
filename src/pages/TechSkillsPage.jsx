import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import { Routes, Route, useLocation } from 'react-router-dom';
import CourseGrid from '../components/CourseGrid';

import { paidCourses, freeTechCourses } from '../data/courses';

const FreeCourses = ({ isNonTech }) => {
    const courses = freeTechCourses;
    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h2 style={{ color: 'var(--color-primary)' }}>Free {isNonTech ? 'Non-Tech' : 'Tech'} Courses</h2>
            <CourseGrid items={courses} type="video" />
        </div>
    );
};

const PaidCourses = ({ isNonTech }) => {
    const { user } = useAuth();
    const [unlockedCodes, setUnlockedCodes] = useState([]);

    useEffect(() => {
        if (user?.email) {
            checkAccess();
        }
    }, [user]);

    const checkAccess = async () => {
        try {
            const { data, error } = await supabase
                .from('student_access')
                .select('course_code')
                .eq('email', user.email);

            if (data) {
                setUnlockedCodes(data.map(item => item.course_code));
            }
        } catch (error) {
            console.error('Error fetching access:', error);
        }
    };

    const courses = paidCourses;

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h2 style={{ color: 'var(--color-primary)' }}>Premium {isNonTech ? 'Non-Tech' : 'Tech'} Courses</h2>
            <CourseGrid items={courses} type="paid" unlockedCodes={unlockedCodes} />
        </div>
    );
};

import SEO from '../components/SEO';

const TechSkillsPage = () => {
    const location = useLocation();
    const isNonTech = location.pathname.includes('non-tech-skills');
    const title = isNonTech ? 'Non-Tech Skills' : 'Tech & Professional Skills';
    const description = isNonTech
        ? 'Enhance your soft skills, leadership, and creative abilities.'
        : 'Learn Coding, Web Development, AI, and Soft Skills. Practical courses designed to make you industry-ready.';

    return (
        <>
            <SEO
                title={`${title} | EvolvEd Academy`}
                description={description}
            />
            <Routes>
                <Route path="free" element={<FreeCourses isNonTech={isNonTech} />} />
                <Route path="paid" element={<PaidCourses isNonTech={isNonTech} />} />
                <Route path="/" element={<FreeCourses isNonTech={isNonTech} />} />
            </Routes>
        </>
    );
};

export default TechSkillsPage;
