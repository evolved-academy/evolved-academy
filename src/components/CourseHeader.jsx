import React from 'react';
import { ArrowLeft, Flag, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseHeader = ({ title, progress = 0 }) => {
    return (
        <div style={{
            height: '64px',
            background: 'var(--color-primary)', // Using site primary color instead of purple
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            color: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link to="/my-courses" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                    <ArrowLeft size={24} />
                </Link>
                <h1 style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0 }}>{title}</h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>


                <Info size={24} color="white" cursor="pointer" />

                {/* Progress Bar Widget */}
                <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    width: '180px',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                        <span>Course Progress</span>
                        <span style={{ fontWeight: '700' }}>{progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: '#00d084', borderRadius: '3px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseHeader;
