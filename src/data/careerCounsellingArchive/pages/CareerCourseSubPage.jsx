import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../supabase';
import SEO from '../../../components/SEO';
import DetailedFooter from '../../../components/DetailedFooter';
import { Lock, GraduationCap, ClipboardCheck, Headphones } from 'lucide-react';
import './CareerCourseSubPage.css';

const CareerCourseSubPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [accessLevel, setAccessLevel] = useState(0);
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
                    if (codes.includes('SC-CAREER-199')) {
                        setAccessLevel(199);
                    } else {
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
            alert("This session is only available in the Career Counselling plan. Please contact us to access.");
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
                        <div className="dashboard-card" onClick={() => navigate('/career-counselling/aptitude-test')}>
                            <div className="card-icon"><ClipboardCheck size={32} /></div>
                            <h3>Aptitude Test</h3>
                            <p>Take your detailed aptitude assessment to discover your strengths.</p>
                        </div>

                        <div 
                            className={`dashboard-card ${accessLevel < 199 ? 'locked-card' : ''}`} 
                            onClick={() => accessLevel < 199 ? handleAction("Expert Session", true) : navigate('/career-counselling/expert-session')}
                        >
                            <div className="card-icon">
                                {accessLevel < 199 ? <Lock size={32} /> : <Headphones size={32} />}
                            </div>
                            <h3>Expert Session</h3>
                            <p>One-on-one session with IITians & CA Toppers for deep guidance.</p>
                            {accessLevel < 199 && (
                                <div className="locked-badge">ACCESS REQUIRED</div>
                            )}
                        </div>

                        <div className="dashboard-card" onClick={() => navigate('/career-counselling/materials')}>
                            <div className="card-icon"><GraduationCap size={32} /></div>
                            <h3>Career Choice Materials</h3>
                            <p>Explore resources, guides, and materials to help you make informed career decisions.</p>
                        </div>
                    </div>
                )}
            </div>

            <DetailedFooter />
        </div>
    );
};

export default CareerCourseSubPage;
