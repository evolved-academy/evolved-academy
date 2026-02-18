import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import ContactButton from '../components/ContactButton';
import DetailedFooter from '../components/DetailedFooter';
import HomeCarousel from '../components/HomeCarousel';
import InfoBanner from '../components/InfoBanner';
import StudentFeedback from '../components/StudentFeedback';
import SocialCTA from '../components/SocialCTA';
import './HomePage.css';


const HomePage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        const checkAccess = async () => {
            if (!user?.email) return;

            try {
                const { data, error } = await supabase
                    .from('student_access')
                    .select('id')
                    .eq('email', user.email)
                    .limit(1);

                if (data && data.length > 0) {
                    setHasAccess(true);
                }
            } catch (error) {
                console.error('Error checking access:', error);
            }
        };

        checkAccess();
    }, [user]);

    const handleContinueLearning = () => {
        if (hasAccess) {
            navigate('/tech-skills/paid');
        } else {
            navigate('/tech-skills');
        }
    };
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
                    <div className="dashboard-card" onClick={handleContinueLearning} style={{ cursor: 'pointer' }}>
                        <h3>Continue Learning</h3>
                        <p>Pick up where you left off in your courses.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/tech-skills/free')} style={{ cursor: 'pointer' }}>
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
