import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const navigate = useNavigate();

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
                        <button 
                            className="btn btn-primary btn-hero-primary" 
                            style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
                            onClick={() => navigate('/login')}
                        >
                            Get Started
                        </button>
                        <button 
                            className="btn btn-outline" 
                            style={{ fontSize: '1.2rem', padding: '1rem 2rem', borderColor: 'white', color: 'white' }}
                            onClick={() => navigate('/about')}
                        >
                            About Us
                        </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
