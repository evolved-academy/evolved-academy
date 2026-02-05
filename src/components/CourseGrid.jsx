import React from 'react';
import { PlayCircle, Download, ShoppingCart } from 'lucide-react';
import PaymentButton from './PaymentButton';

const CourseGrid = ({ items, type = 'video' }) => {
    return (
        <div className="course-grid">
            {items.map((item, index) => (
                <div key={index} style={{
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-sm)',
                    overflow: 'hidden',
                    transition: 'transform 0.2s',
                    cursor: 'pointer'
                }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    {/* Thumbnail */}
                    <div style={{
                        height: '160px',
                        background: '#eee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        {item.videoId ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${item.videoId}`}
                                title={item.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ border: 'none' }}
                            ></iframe>
                        ) : (
                            <>
                                {item.thumbnail ? (
                                    <img src={item.thumbnail} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ fontSize: '3rem', color: '#ccc' }}>🎓</div>
                                )}
                                {type === 'video' && (
                                    <div style={{
                                        position: 'absolute',
                                        background: 'rgba(0,0,0,0.6)',
                                        borderRadius: '50%',
                                        padding: '10px',
                                        color: 'white',
                                        pointerEvents: 'none' // Ensure clicks go to the card or iframe if needed, but here it's just visual overlay if no video
                                    }}>
                                        <PlayCircle size={32} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>{item.title}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
                            {item.description || 'Learn the fundamentals and master this topic.'}
                        </p>

                        {type === 'paid' && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                <span style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--color-primary)' }}>
                                    {item.price}
                                </span>
                                <PaymentButton amount={item.price} courseTitle={item.title} />
                            </div>
                        )}

                        {type === 'resource' && (
                            <button className="btn btn-outline w-full" style={{ marginTop: '0.5rem' }}>
                                <Download size={16} style={{ marginRight: '5px' }} /> Download PDF
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseGrid;
