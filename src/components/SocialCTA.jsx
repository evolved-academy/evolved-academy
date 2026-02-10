import React from 'react';
import { Youtube } from 'lucide-react';
import './SocialCTA.css';

const SocialCTA = () => {
    return (
        <div className="social-cta-container">
            <div className="social-cta-content">
                <h2 className="social-cta-title">Join The EvolvEd Family, Today!</h2>
                <p className="social-cta-text">
                    Explore our YouTube Channel and subscribe to get access to quality free courses, and explore our website to enroll in paid ones!
                </p>
                <a
                    href="https://youtube.com/@evolvedacademy001?si=RQeb82RrcfVGF_3U"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-cta-btn"
                >
                    <Youtube size={20} />
                    Visit YouTube Channel
                </a>
            </div>
        </div>
    );
};

export default SocialCTA;
