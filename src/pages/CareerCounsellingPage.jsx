import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Lightbulb, Settings, UserCheck, GraduationCap } from 'lucide-react';
import SEO from '../components/SEO';
import DetailedFooter from '../components/DetailedFooter';
import './CareerCounsellingPage.css';

const CareerCounsellingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="cc-page">
            <SEO 
                title="Career Counselling Course | EvolvEd Academy"
                description="Join our comprehensive career counselling program including aptitude tests, expert guidance, and personalized sessions."
            />

            <header className="cc-hero">
                <div className="bulb-1 cc-lightbulb">
                    <Lightbulb size={32} fill="currentColor" />
                </div>
                <div className="bulb-2 cc-lightbulb">
                    <Lightbulb size={32} fill="currentColor" />
                </div>
                <div className="cc-gears">
                    <Settings size={120} />
                </div>

                <div className="cc-hero-banner">
                    <h1>Career Counselling Course</h1>
                </div>
                <br />
                <div className="cc-sub-banner">
                    <h2>Aptitude Test & Best Career Guidance by EXPERTS</h2>
                </div>
            </header>

            <main className="cc-container">
                <div className="cc-main-grid">
                    <div className="cc-divider"></div>
                    
                    <div className="cc-column">
                        <ul className="cc-feature-list">
                            <li className="cc-feature-item">
                                <span className="cc-feature-icon"><Check size={20} /></span>
                                Detailed Aptitude Test
                            </li>
                            <li className="cc-feature-item">
                                <span className="cc-feature-icon"><Check size={20} /></span>
                                Personalized Career Guidance
                            </li>
                        </ul>
                    </div>

                    <div className="cc-column">
                        <ul className="cc-feature-list">
                            <li className="cc-feature-item">
                                <span className="cc-feature-icon"><Check size={20} /></span>
                                Detailed Aptitude Test
                            </li>
                            <li className="cc-feature-item">
                                <span className="cc-feature-icon"><Check size={20} /></span>
                                Personalized Career Guidance
                            </li>
                            <li className="cc-feature-item">
                                <span className="cc-feature-icon"><Check size={20} /></span>
                                EXPERT SESSION & GUIDANCE
                            </li>
                            <li className="cc-feature-item" style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                                (IITians & CA Toppers)
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="cc-pricing-cards">
                    <div className="cc-price-burst" onClick={() => window.open('https://forms.gle/VFtvMwsHvWE2MEMs8', '_blank')}>
                        <span>ONLY</span>
                        <h3>₹ 199/-</h3>
                        <p>Limited Time Offer</p>
                    </div>

                    <div className="cc-price-burst" onClick={() => window.open('https://forms.gle/VFtvMwsHvWE2MEMs8', '_blank')}>
                        <span>ONLY</span>
                        <h3>₹ 399/-</h3>
                        <p>Limited Time Offer</p>
                    </div>
                </div>

                <div className="cc-cta-section">
                    <button 
                        className="cc-main-register-btn"
                        onClick={() => window.open('https://forms.gle/VFtvMwsHvWE2MEMs8', '_blank')}
                    >
                        REGISTER NOW!
                    </button>
                    <br />
                    <div className="cc-footer-text">
                        Start Your Career Journey for Just ₹399!
                    </div>
                </div>
            </main>

            <DetailedFooter />
        </div>
    );
};

export default CareerCounsellingPage;
