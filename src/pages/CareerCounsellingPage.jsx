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
                <div className="cc-statements-card">
                    <div className="cc-statement-item">
                        <span className="cc-number">1.</span>
                        <p>This Counselling Will Be Conducted Fully Online</p>
                    </div>
                    <div className="cc-statement-item">
                        <span className="cc-number">2.</span>
                        <p>Test and Sessions Both Will Be Conducted Through Our Website And Online Virtual Rooms</p>
                    </div>
                    <div className="cc-statement-item">
                        <span className="cc-number">3.</span>
                        <p>Fill This Form By Clicking On Button Below, We Will Contact You Through Your Details As Soon As Possible!</p>
                    </div>
                </div>

                <div className="cc-cta-section">
                    <button 
                        className="cc-main-register-btn"
                        onClick={() => window.open('https://forms.gle/HsNiQJkpwwo5Vsva8', '_blank')}
                    >
                        REGISTER NOW!
                    </button>
                </div>
            </main>

            <DetailedFooter />
        </div>
    );
};

export default CareerCounsellingPage;
