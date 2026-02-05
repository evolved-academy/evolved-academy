import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-overlay">
                <div className="container hero-content">
                    <h1 className="hero-title">
                        Academics, Technical Mastery, and Soft Skills for the Future
                    </h1>
                    <p className="hero-subtitle">
                        Join EvolvEd Academy to transform your learning journey with world-class education and practical skills.
                    </p>
                    <div className="hero-actions">
                        <button className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
                            Get Started
                        </button>
                        <button className="btn btn-outline" style={{ fontSize: '1.2rem', padding: '1rem 2rem', borderColor: 'white', color: 'white' }}>
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
