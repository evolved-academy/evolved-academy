import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Terminal, Image as ImageIcon } from 'lucide-react';

const PromptCarousel = ({ resultTitle, promptText, resultColor, promptColor, resultImage }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
    };

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '300px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            background: '#000'
        }}>
            {/* Slides Container */}
            <div style={{
                display: 'flex',
                width: '200%',
                height: '100%',
                transform: `translateX(-${currentIndex * 50}%)`,
                transition: 'transform 0.5s ease-in-out'
            }}>
                {/* Slide 1: Result Image */}
                <div style={{
                    width: '50%',
                    height: '100%',
                    background: resultColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    padding: resultImage ? '0' : '2rem',
                    textAlign: 'center',
                    position: 'relative'
                }}>
                    {resultImage ? (
                        <>
                            <img
                                src={resultImage}
                                alt={resultTitle}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                padding: '10px',
                                background: 'rgba(0,0,0,0.6)',
                                color: 'white'
                            }}>
                                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{resultTitle}</h3>
                            </div>
                        </>
                    ) : (
                        <>
                            <ImageIcon size={48} style={{ marginBottom: '1rem', opacity: 0.8 }} />
                            <h3 style={{ fontSize: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{resultTitle}</h3>
                            <div style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>Result Image</div>
                        </>
                    )}
                </div>

                {/* Slide 2: Prompt Image (Terminal Style) */}
                <div style={{
                    width: '50%',
                    height: '100%',
                    background: promptColor || '#1a1a1a',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00ff00',
                    padding: '2rem',
                    fontFamily: 'monospace',
                    textAlign: 'left'
                }}>
                    <div style={{ width: '100%', maxWidth: '250px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#666' }}>
                            <Terminal size={16} />
                            <span style={{ fontSize: '0.8rem' }}>prompt_terminal.exe</span>
                        </div>
                        <div style={{
                            border: '1px solid #333',
                            padding: '1rem',
                            borderRadius: '4px',
                            background: '#000',
                            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
                        }}>
                            <span style={{ color: '#ff79c6' }}>&gt;</span> {promptText}
                            <span className="cursor-blink" style={{ display: 'inline-block', width: '8px', height: '15px', background: '#00ff00', marginLeft: '4px', verticalAlign: 'middle' }}></span>
                        </div>
                    </div>
                    <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#666' }}>Prompt Image</div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    backdropFilter: 'blur(4px)'
                }}
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={nextSlide}
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    backdropFilter: 'blur(4px)'
                }}
            >
                <ChevronRight size={20} />
            </button>

            {/* Indicators */}
            <div style={{
                position: 'absolute',
                bottom: '15px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px'
            }}>
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: currentIndex === 0 ? 'white' : 'rgba(255,255,255,0.4)',
                    transition: 'background 0.3s'
                }} />
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: currentIndex === 1 ? 'white' : 'rgba(255,255,255,0.4)',
                    transition: 'background 0.3s'
                }} />
            </div>
        </div>
    );
};

export default PromptCarousel;
