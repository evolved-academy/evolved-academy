import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';
import SEO from '../components/SEO';
import DetailedFooter from '../components/DetailedFooter';
import { Lock, GraduationCap, ClipboardCheck, Users, Headphones } from 'lucide-react';
import './CareerCourseSubPage.css';

const CareerCourseSubPage = () => {
    const { user } = useAuth();
    const [accessLevel, setAccessLevel] = useState(0); // 0: none, 199: base, 399: full
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccess = async () => {
            if (!user?.email) return;

            try {
                const { data, error } = await supabase
                    .from('student_access')
                    .select('course_code')
                    .eq('email', user.email)
                    .like('course_code', 'SC-CAREER-%');

                if (data && data.length > 0) {
                    const codes = data.map(item => item.course_code.toUpperCase());
                    if (codes.includes('SC-CAREER-399')) {
                        setAccessLevel(399);
                    } else if (codes.includes('SC-CAREER-199')) {
                        setAccessLevel(199);
                    } else {
                        // Fallback for other SC codes if any
                        setAccessLevel(199);
                    }
                }
            } catch (error) {
                console.error('Error fetching access level:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccess();
    }, [user]);

    const handleAction = (title, locked) => {
        if (locked) {
            alert("This session is only available in the Premium (399) plan. Please upgrade to access.");
            return;
        }
        alert(`Opening ${title}... (Modules coming soon)`);
    };

    return (
        <div className="home-page sc-subpage">
            <SEO 
                title="Career Counselling Course | EvolvEd Academy"
                description="Access your career counselling modules, aptitude tests, and expert sessions."
            />
            
            <div className="container home-dashboard-container">
                <h1 className="dashboard-welcome">
                    Glad To Have You Here 🚀
                </h1>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>Loading your modules...</div>
                ) : (
                    <div className="dashboard-grid">
                        {/* Card 1: Aptitude Test */}
                        <div className="dashboard-card" onClick={() => handleAction("Aptitude Test", false)}>
                            <div className="card-icon"><ClipboardCheck size={32} /></div>
                            <h3>Aptitude Test</h3>
                            <p>Take your detailed aptitude assessment to discover your strengths.</p>
                        </div>

                        {/* Card 2: Career Guidance Session */}
                        <div className="dashboard-card" onClick={() => handleAction("Career Guidance Session", false)}>
                            <div className="card-icon"><Users size={32} /></div>
                            <h3>Career Guidance Session</h3>
                            <p>Explore personalized career paths based on your interests.</p>
                        </div>

                        {/* Card 3: Expert Session */}
                        <div 
                            className={`dashboard-card ${accessLevel < 399 ? 'locked-card' : ''}`} 
                            onClick={() => handleAction("Expert Session", accessLevel < 399)}
                        >
                            <div className="card-icon">
                                {accessLevel < 399 ? <Lock size={32} /> : <Headphones size={32} />}
                            </div>
                            <h3>Expert Session</h3>
                            <p>One-on-one session with IITians & CA Toppers for deep guidance.</p>
                            {accessLevel < 399 && (
                                <div className="locked-badge">PREMIUM ONLY</div>
                            )}
                        </div>
                    </div>
                )}
                
                <div style={{ marginTop: '4rem', textAlign: 'center', padding: '2rem', background: 'rgba(255,255,255,0.5)', borderRadius: '20px' }}>
                    <p style={{ color: '#1e293b', fontWeight: '600' }}>
                        {accessLevel === 399 ? 
                            "🌟 You have Full Premium Access! Enjoy all your sessions." : 
                            "Standard Access: Upgrade to SC-CAREER-399 for Expert Sessions."}
                    </p>
                </div>
            </div>

            <DetailedFooter />
        </div>
    );
};

export default CareerCourseSubPage;
