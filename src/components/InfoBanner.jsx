import React from 'react';
import { PlayCircle, FileText, HelpCircle, Camera } from 'lucide-react';
import './InfoBanner.css';

import taherSirImg from '../assets/taher-sir.png';
import studentImg from '../assets/student-img.png';

const InfoBanner = () => {
    return (
        <div className="info-banner-container">
            <div className="info-banner-content">
                {/* Left Text Section */}
                <div className="banner-text-section">
                    <h2 className="banner-headline">
                        <span className="highlight-evolve">Evolve Yourself</span> In This Evolving Era, By Doing Our Valuable Courses!
                    </h2>
                    <p className="banner-subtext">
                        Unlock your potential by signing up with EvolvEd Academy - The most valuable learning solution.
                    </p>
                    <button className="banner-cta">Get Started</button>
                </div>

                {/* Right Visual Section */}
                <div className="banner-visual-section">
                    <div className="dashed-connector"></div>

                    {/* Circle 1 - Teacher */}
                    <div className="circle-frame frame-left">
                        <img src={taherSirImg} alt="Taher Sir" className="profile-img" />
                    </div>
                    {/* Bubble 1 */}
                    <div className="chat-bubble bubble-left">
                        <strong>EvolvEd Academy</strong> Is Where Students Can Evolve Their Education By Upskilling
                    </div>

                    {/* Circle 2 - Student */}
                    <div className="circle-frame frame-right">
                        <img src={studentImg} alt="Student" className="profile-img" />
                    </div>
                    {/* Bubble 2 */}
                    <div className="chat-bubble bubble-right">
                        What Is <strong>EvolvEd Academy</strong>?
                    </div>
                </div>
            </div>

            {/* Floating Stats Bar */}
            <div className="stats-bar">
                <div className="stat-item">
                    <div className="stat-icon" style={{ color: '#ff4d4f' }}>
                        <PlayCircle size={32} />
                    </div>
                    <div className="stat-number">AI Bootcamps</div>
                    <div className="stat-label">Live Interactive Bootcamps</div>
                </div>
                <div className="stat-divider"></div>

                <div className="stat-item">
                    <div className="stat-icon" style={{ color: '#1890ff' }}>
                        <FileText size={32} />
                    </div>
                    <div className="stat-number">For every course</div>
                    <div className="stat-label">Get Tests, sample papers & notes</div>
                </div>
                <div className="stat-divider"></div>

                <div className="stat-item">
                    <div className="stat-icon" style={{ color: '#722ed1' }}>
                        <HelpCircle size={32} />
                    </div>
                    <div className="stat-number">24 x 7</div>
                    <div className="stat-label">Doubt solving sessions</div>
                </div>
                <div className="stat-divider"></div>

                <div className="stat-item">
                    <div className="stat-icon" style={{ color: '#faad14' }}>
                        <Camera size={32} />
                    </div>
                    <div className="stat-number">Recordings</div>
                    <div className="stat-label">Available too</div>
                </div>
            </div>
        </div>
    );
};

export default InfoBanner;
