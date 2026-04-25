import React from 'react';
import SEO from '../components/SEO';
import DetailedFooter from '../components/DetailedFooter';

const CareerCourseSubPage = () => {
    return (
        <div className="career-course-subpage" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO 
                title="Career Counselling Course Content | EvolvEd Academy"
                description="Welcome to your Career Counselling Course. Content coming soon."
            />
            
            <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', background: '#f8fafc' }}>
                <div style={{ textAlign: 'center', maxWidth: '800px' }}>
                    <h1 style={{ color: '#002f5d', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Career Counselling Course</h1>
                    <p style={{ color: '#64748b', fontSize: '1.2rem' }}>
                        Welcome! This page will contain your special course content. 
                        We are currently preparing the modules for you. Please check back soon!
                    </p>
                </div>
            </main>

            <DetailedFooter />
        </div>
    );
};

export default CareerCourseSubPage;
