import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Calendar, Info, MessageCircle } from 'lucide-react';
import './HomeCarousel.css';

const HomeCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        {
            id: 1,
            type: 'intro',
            tag: 'About Us',
            title: 'Empowering Future Innovators',
            description: 'EvolvEd Academy is dedicated to providing courses in tech skills and beyond. Join us to shape your education.',
            bgGradient: 'linear-gradient(135deg, #1a2980 0%, #26d0ce 100%)',
            icon: Info
        },
        {
            id: 2,
            type: 'course',
            tag: 'Featured Course',
            title: 'Transforming Creative Minds',
            description: 'Dive deep into the world of Artificial Intelligence, and its use in everyday life, with help of our AI Bootcamps',
            bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            icon: Calendar
        },
        {
            id: 3,
            type: 'review',
            tag: 'Student Success',
            title: 'Transformative Experience',
            description: '"The projects and teaching at EvolvEd increased my knowledge towards AI, and its power!. I highly recommend their certification bootcamps!"',
            author: '- Student',
            rating: 5,
            bgGradient: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)',
            icon: MessageCircle
        },
        {
            id: 4,
            type: 'announcement',
            tag: 'New Launch',
            title: 'Web Developement Bootcamp',
            description: 'Starting next month: A comprehensive 12-week bootcamp to take you from beginner to full-stack pro. Early bird registration open now!',
            bgGradient: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
            icon: Calendar
        }
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
            className="home-carousel-container"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <div
                className="home-carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="home-carousel-slide">
                        <div
                            className="carousel-content"
                            style={{ background: slide.bgGradient }}
                        >
                            <div className="carousel-overlay"></div>
                            <div className="carousel-text-content">
                                {slide.tag && <span className="carousel-tag">{slide.tag}</span>}

                                {slide.type === 'review' && (
                                    <div className="review-stars">
                                        {[...Array(slide.rating)].map((_, i) => (
                                            <Star key={i} fill="currentColor" size={24} style={{ display: 'inline-block', marginRight: '4px' }} />
                                        ))}
                                    </div>
                                )}

                                <h2 className="carousel-title">{slide.title}</h2>
                                <p className="carousel-description">{slide.description}</p>

                                {slide.author && <p className="review-author">{slide.author}</p>}

                                <button className="carousel-btn">Learn More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="carousel-nav-btn carousel-prev" onClick={prevSlide}>
                <ChevronLeft size={28} />
            </button>
            <button className="carousel-nav-btn carousel-next" onClick={nextSlide}>
                <ChevronRight size={28} />
            </button>

            <div className="carousel-indicators">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeCarousel;
