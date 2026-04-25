import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import ContactButton from '../components/ContactButton';
import DetailedFooter from '../components/DetailedFooter';
import HomeCarousel from '../components/HomeCarousel';
import PremiumCarousel from '../components/PremiumCarousel';
import InfoBanner from '../components/InfoBanner';
import StudentFeedback from '../components/StudentFeedback';
import SocialCTA from '../components/SocialCTA';
import './HomePage.css';


const HomePage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [unlockedCourses, setUnlockedCourses] = useState([]);
    const [specialCourses, setSpecialCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAccess = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('student_access')
                    .select('course_code')
                    .eq('email', user.email);

                if (data && data.length > 0) {
                    const allCodes = data.map(item => item.course_code);
                    setUnlockedCourses(allCodes);
                    
                    // Filter special courses (codes starting with SC)
                    const scCourses = allCodes.filter(code => code.toUpperCase().startsWith('SC'));
                    setSpecialCourses(scCourses);
                } else {
                    setUnlockedCourses([]);
                    setSpecialCourses([]);
                }
            } catch (error) {
                console.error('Error checking access:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAccess();
    }, [user]);

    const handleContinueLearning = () => {
        if (unlockedCourses.length > 0) {
            // Redirect to the Enrolled Courses page
            navigate('/my-courses');
        } else {
            alert("You have not enrolled for any course yet...");
        }
    };
    return (
        <div className="home-page" style={{ background: 'linear-gradient(to bottom, #bdf7ff, #6abce4)', minHeight: '100%', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <SEO
                title="Student Dashboard | EvolvEd Academy"
                description="Manage your courses, track progress, and access learning resources from your personalized dashboard."
            />
            <div className="container home-dashboard-container">
                <h1 className="dashboard-welcome">
                    Welcome to Your Dashboard!
                </h1>
                <div className="dashboard-grid">
                    {/* Placeholder cards */}
                    <div className="dashboard-card" onClick={handleContinueLearning}>
                        <h3>Continue Learning</h3>
                        <p>Pick up where you left off in your courses.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/tech-skills/free')}>
                        <h3>Recommended for You</h3>
                        <p>Explore new topics based on your interests.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate('/tech-skills/paid')}>
                        <h3>Upcoming Live Sessions</h3>
                        <p>Join live classes and webinars.</p>
                    </div>
                </div>

                {/* Special Courses Section */}
                {specialCourses.length > 0 && (
                    <div className="special-courses-section" style={{ marginTop: '3rem' }}>
                        <h2 style={{ color: '#002f5d', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ backgroundColor: '#ffd54f', width: '8px', height: '32px', borderRadius: '4px' }}></span>
                            Continue Special Learning
                        </h2>
                        <div className="dashboard-grid">
                            {specialCourses.map((code, index) => (
                                <div key={index} className="dashboard-card special-card" style={{ 
                                    background: 'linear-gradient(135deg, #002f5d 0%, #004a8f 100%)', 
                                    color: 'white',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: 'default'
                                }}>
                                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
                                        <GraduationCap size={120} />
                                    </div>
                                    <h3 style={{ color: '#ffd54f' }}>Career Counselling</h3>
                                    <p style={{ color: 'white' }}>Access your personalized career path and expert modules.</p>
                                    <button 
                                        className="btn btn-primary" 
                                        style={{ 
                                            marginTop: '1.5rem', 
                                            background: '#ffd54f', 
                                            color: '#002f5d', 
                                            border: 'none',
                                            fontWeight: '800'
                                        }}
                                        onClick={() => navigate('/career-counselling/course')}
                                    >
                                        RESUME
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <PremiumCarousel />
                <HomeCarousel />
                <div className="info-banner-wrapper">
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
