import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../../components/SEO';
import DetailedFooter from '../../../components/DetailedFooter';
import { Headphones, Video, ShieldCheck, ChevronLeft, Sparkles } from 'lucide-react';
import './ExpertSessionPage.css';

const ExpertSessionPage = () => {
    const navigate = useNavigate();
    const isActive = false;

    return (
        <div className="expert-session-page premium-theme">
            <SEO title="Expert Premium Session | EvolvEd Academy" />
            
            <div className="container expert-container">
                <button className="back-btn-premium" onClick={() => navigate('/career-counselling/course')}>
                    <ChevronLeft /> Return to Course
                </button>

                <div className="premium-card-wrapper">
                    <div className="glass-card">
                        <div className="premium-header">
                            <div className="icon-glow">
                                <Headphones size={64} className="premium-icon" />
                            </div>
                            <div className="premium-badge">
                                <Sparkles size={14} /> PREMIUM ACCESS
                            </div>
                            <h1>Expert Session Room</h1>
                            <p className="premium-subtitle">Exclusive 1-on-1 Mentorship with IITians & CA Toppers</p>
                        </div>

                        <div className="premium-status-area">
                            <div className="glass-status">
                                <div className="status-label">
                                    <Sparkles size={18} className="text-gold" /> SESSION SCHEDULED
                                </div>
                                <div className="status-value">10th May</div>
                                <div className="status-msg">See You There!</div>
                            </div>
                        </div>

                        <div className="premium-benefits">
                            <div className="benefit">
                                <ShieldCheck size={20} />
                                <span>Verified Experts</span>
                            </div>
                            <div className="benefit">
                                <Video size={20} />
                                <span>HD Video Support</span>
                            </div>
                        </div>

                        <div className="premium-action-footer">
                            <button 
                                className={`premium-join-btn ${!isActive ? 'disabled-grayscale' : ''}`}
                                disabled={!isActive}
                            >
                                {isActive ? "JOIN EXPERT SESSION 🚀" : "JOIN NOW (Deactivated)"}
                            </button>
                            <p className="activation-hint">The Expert will activate this room at the scheduled time.</p>
                        </div>
                    </div>
                </div>
            </div>
            <DetailedFooter />
        </div>
    );
};

export default ExpertSessionPage;
