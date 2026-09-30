import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../../components/SEO';
import DetailedFooter from '../../../components/DetailedFooter';
import { ChevronLeft, Users, Calendar, ArrowRight } from 'lucide-react';
import './GuidanceSessionPage.css';

const GuidanceSessionPage = () => {
    const navigate = useNavigate();
    const isActive = false;

    return (
        <div className="guidance-session-page">
            <SEO title="Career Guidance Session | EvolvEd Academy" />
            
            <div className="container session-container">
                <button className="back-btn" onClick={() => navigate('/career-counselling/course')}>
                    <ChevronLeft size={20} /> Back to Course
                </button>

                <div className="session-main-card">
                    <div className="session-icon-wrapper">
                        <Users size={48} />
                    </div>
                    <h1>Career Guidance Session</h1>
                    <p className="description">
                        Welcome to your Career Guidance waiting room. This session is designed to help you map out your future based on your Aptitude results.
                    </p>

                    <div className="session-status-box">
                        <div className="status-indicator">
                            <span className="dot pulse-blue"></span>
                            <span className="status-text">Session Scheduled on 3rd May, 4:00 pm</span>
                        </div>
                        <p className="status-note">See You There!</p>
                    </div>

                    <div className="features-grid">
                        <div className="f-item">
                            <Calendar size={20} />
                            <span>Scheduled Weekly</span>
                        </div>
                        <div className="f-item">
                            <ArrowRight size={20} />
                            <span>Step-by-Step Roadmap</span>
                        </div>
                    </div>

                    <div className="action-area">
                        <button 
                            className={`join-session-btn ${!isActive ? 'deactivated' : ''}`}
                            disabled={!isActive}
                        >
                            {isActive ? "JOIN NOW 🚀" : "JOIN NOW (Deactivated)"}
                        </button>
                        <p className="footer-notice">You will be redirected to the meet link once activated.</p>
                    </div>
                </div>
            </div>
            <DetailedFooter />
        </div>
    );
};

export default GuidanceSessionPage;
