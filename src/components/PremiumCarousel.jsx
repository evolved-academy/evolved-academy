import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './PremiumCarousel.css';

// Import images
import untitledDesign1 from '../assets/untitled_design_1.png';
import bg1 from '../assets/premium_bg_1.png';
import secondSlide from '../assets/second_slide.png';
import slide3 from '../assets/slide3_new.png';
import bg2 from '../assets/premium_bg_2.png';
import bg3 from '../assets/premium_bg_3.png';

const PremiumCarousel = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        { id: 1, image: untitledDesign1 },
        { id: 2, image: secondSlide },
        { id: 3, image: slide3, hasButton: true }
    ];

    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    return (
        <div
            className="premium-carousel-container"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <div
                className="premium-carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="premium-carousel-slide">
                        <div
                            className="premium-carousel-image"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="premium-carousel-overlay"></div>
                            {slide.hasButton && (
                                <button 
                                    className="premium-register-btn"
                                    onClick={() => window.open('https://forms.gle/VFtvMwsHvWE2MEMs8', '_blank')}
                                >
                                    REGISTER NOW!
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button className="premium-carousel-nav-btn premium-prev" onClick={prevSlide}>
                <ChevronLeft size={32} />
            </button>
            <button className="premium-carousel-nav-btn premium-next" onClick={nextSlide}>
                <ChevronRight size={32} />
            </button>

            <div className="premium-carousel-indicators">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`premium-carousel-dot ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PremiumCarousel;
