import React from 'react';
import SEO from '../components/SEO';
import ContactButton from '../components/ContactButton';
import DetailedFooter from '../components/DetailedFooter';
import HomeCarousel from '../components/HomeCarousel';
import InfoBanner from '../components/InfoBanner';
import StudentFeedback from '../components/StudentFeedback';
import SocialCTA from '../components/SocialCTA';
import './HomePage.css';


const HomePage = () => {
    return (
        <div className="home-page" style={{ background: 'linear-gradient(to bottom, #bdf7ff, #6abce4)', minHeight: '100%', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <SEO
                title="Student Dashboard | EvolvEd Academy"
                description="Manage your courses, track progress, and access learning resources from your personalized dashboard."
            />
            <div className="container" style={{ padding: '4rem 1.5rem', width: '100%' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '2rem' }}>
                    Welcome to Your Dashboard!
                </h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Placeholder cards */}
                    <div className="dashboard-card">
                        <h3>Continue Learning</h3>
                        <p>Pick up where you left off in your courses.</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Recommended for You</h3>
                        <p>Explore new topics based on your interests.</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Upcoming Live Sessions</h3>
                        <p>Join live classes and webinars.</p>
                    </div>
                </div>
                <HomeCarousel />
                <div style={{ marginTop: '5rem', paddingBottom: '8rem' }}>
                    <InfoBanner />
                </div>
                <StudentFeedback />
            </div>
            <SocialCTA />
            <DetailedFooter />
            <ContactButton />
        </div>
    );
};

export default HomePage;
