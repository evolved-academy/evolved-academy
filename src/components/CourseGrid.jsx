import React from 'react';
import { PlayCircle, Download, ShoppingCart, CheckCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PaymentButton from './PaymentButton';

const CourseGrid = ({ items, type = 'video', unlockedCodes = [] }) => {
    const navigate = useNavigate();

    const handleCourseClick = (item, isUnlocked) => {
        if (type === 'paid' && isUnlocked) {
            navigate(`/course/${item.code}`);
        }
    };

    return (
        <div className="course-grid">
            {items.map((item, index) => {
                const isUnlocked = type === 'paid' ? unlockedCodes.includes(item.code) : true;
                const showVideo = item.videoId && (type === 'video' || (type === 'paid' && isUnlocked));

                return (
                    <div key={index}
                        onClick={() => handleCourseClick(item, isUnlocked)}
                        style={{
                            background: 'white',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'var(--shadow-sm)',
                            overflow: 'hidden',
                            transition: 'transform 0.2s',
                            cursor: (type === 'paid' && isUnlocked) ? 'pointer' : 'default'
                        }}
                        onMouseEnter={(e) => {
                            if (type === 'paid' && isUnlocked) {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (type === 'paid' && isUnlocked) {
                                e.currentTarget.style.transform = 'translateY(0)';
                            }
                        }}
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
                            {showVideo ? (
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
                                        <div style={{ fontSize: '3rem', color: '#ccc' }}>
                                            {type === 'paid' && !isUnlocked ? <Lock size={48} color="#9ca3af" /> : '🎓'}
                                        </div>
                                    )}

                                    {/* Overlay for Video Type */}
                                    {type === 'video' && !showVideo && (
                                        <div style={{
                                            position: 'absolute',
                                            background: 'rgba(0,0,0,0.6)',
                                            borderRadius: '50%',
                                            padding: '10px',
                                            color: 'white',
                                            pointerEvents: 'none'
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

                            {type === 'paid' && !isUnlocked && (
                                <div style={{ marginTop: '1rem' }}>
                                    <div style={{
                                        fontSize: '0.9rem',
                                        color: '#ffffff',
                                        background: 'var(--color-primary)',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        display: 'inline-block',
                                        marginBottom: '0.5rem',
                                        fontWeight: 'bold'
                                    }}>
                                        Course Code: {item.code}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--color-primary)' }}>
                                            {item.price}
                                        </span>
                                        <PaymentButton amount={item.price} courseTitle={item.title} />
                                    </div>
                                </div>
                            )}

                            {type === 'paid' && isUnlocked && (
                                <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#dcfce7', borderRadius: 'var(--radius-md)', color: '#166534', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                                    <CheckCircle size={20} />
                                    Access Granted
                                </div>
                            )}

                            {type === 'resource' && (
                                <button className="btn btn-outline w-full" style={{ marginTop: '0.5rem' }}>
                                    <Download size={16} style={{ marginRight: '5px' }} /> Download PDF
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CourseGrid;
