import React from 'react';
import { PlayCircle, Clock, Calendar, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnrolledCourseCard = ({ course, progress = 0 }) => {
    const navigate = useNavigate();

    return (
        <div className="enrolled-course-card" style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            border: '1px solid #eee',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
        >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                {/* Icon/Thumbnail */}
                <div style={{
                    minWidth: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #1e293b, #334155)', // Dark/Techy background
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                }}>
                    🏆
                </div>

                <div style={{ flex: 1 }}>
                    <h3 style={{
                        margin: 0,
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: '#1e293b',
                        lineHeight: '1.3'
                    }}>
                        {course.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                        <Clock size={14} />
                        <span>Self-Paced</span>
                    </div>
                </div>
            </div>

            {/* Description Tooltip/Overlay (Simple version: text appearing on hover) */}
            <div className="course-description" title={course.description}>
                {/* Using title attribute for simple native tooltip, or could build custom overlay */}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748b' }}>
                <Calendar size={14} color="#9333ea" />
                <span>Enrolled On 26th Jan 2026</span>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '0.9rem' }}>
                        <Info size={16} color="#9333ea" />
                        <span>Course Progress</span>
                    </div>
                    <span style={{ fontWeight: '600', color: '#16a34a' }}>{progress}%</span>
                </div>

                {/* Progress Bar Track */}
                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px' }}>
                    {/* Progress Bar Fill */}
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: '#16a34a', // Green progress
                        borderRadius: '4px',
                        transition: 'width 0.5s ease-out'
                    }}></div>
                </div>
            </div>

            <button
                onClick={() => navigate(`/course/${course.code}`)}
                style={{
                    width: '100%',
                    padding: '12px',
                    background: '#9333ea', // Purple button
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '0.5rem',
                    transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#7e22ce'}
                onMouseOut={(e) => e.currentTarget.style.background = '#9333ea'}
            >
                Resume <PlayCircle size={18} fill="white" color="#9333ea" />
            </button>
        </div>
    );
};

export default EnrolledCourseCard;
