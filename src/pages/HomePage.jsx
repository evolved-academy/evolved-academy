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
import { getStudentUnlockedCourses, hasUserJamaliAccess } from '../utils/accessControl';
import jamaliLogo from '../assets/jamali_classes_logo.png';
import { ExternalLink } from 'lucide-react';
import './HomePage.css';


const HomePage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [unlockedCourses, setUnlockedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAccess = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const courses = await getStudentUnlockedCourses(user);
                setUnlockedCourses(courses);
            } catch (error) {
                console.error('Error checking access:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAccess();
    }, [user]);

    const hasJamaliAccess = hasUserJamaliAccess(user, unlockedCourses);

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
                    {/* Dashboard cards */}
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

                    {/* 4th Card: Selective Access to Husain Sir's Jamali Classes */}
                    {hasJamaliAccess && (
                        <div className="dashboard-card jamali-dashboard-card" onClick={() => navigate('/jamali-classes')}>
                            <div className="jamali-card-header">
                                <img src={jamaliLogo} alt="Husain Sir's Jamali Classes" className="jamali-card-logo" />
                                <span className="jamali-card-badge">Selective Access</span>
                            </div>
                            <h3>Husain Sir's Jamali Classes</h3>
                            <p>Launch the exclusive Jamali Classes portal with custom UI & specialized learning environment.</p>
                            <div className="jamali-card-action">
                                <span>Open Portal (Website inside Website)</span>
                                <ExternalLink size={16} />
                            </div>
                        </div>
                    )}
                </div>

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
