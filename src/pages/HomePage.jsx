import React from 'react';
import ContactButton from '../components/ContactButton';
import DetailedFooter from '../components/DetailedFooter';


const HomePage = () => {
    return (
        <div className="home-page" style={{ background: 'linear-gradient(to bottom, #bdf7ff, #6abce4)', minHeight: '100%', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="container" style={{ padding: '4rem 1.5rem', width: '100%' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '2rem' }}>
                    Welcome to Your Dashboard!
                </h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Placeholder cards */}
                    <div style={{ padding: '2rem', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Continue Learning</h3>
                        <p style={{ color: '#666' }}>Pick up where you left off in your courses.</p>
                    </div>
                    <div style={{ padding: '2rem', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Recommended for You</h3>
                        <p style={{ color: '#666' }}>Explore new topics based on your interests.</p>
                    </div>
                    <div style={{ padding: '2rem', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Upcoming Live Sessions</h3>
                        <p style={{ color: '#666' }}>Join live classes and webinars.</p>
                    </div>
                </div>
            </div>
            <DetailedFooter />
            <ContactButton />
        </div>
    );
};

export default HomePage;
