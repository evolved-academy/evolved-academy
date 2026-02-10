import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Download, Award } from 'lucide-react';

import SEO from '../components/SEO';

const CertificationsPage = () => {
    const { user } = useAuth();
    const hasCertificates = user && user.completedCourses && user.completedCourses.length > 0;

    return (
        <div className="container" style={{ padding: '4rem 0', minHeight: '60vh' }}>
            <SEO
                title="Earn Certifications | EvolvEd Academy"
                description="Get certified in your skills. Showcase your achievements in Academics and Technology to the world."
            />
            <h1 style={{ color: 'var(--color-primary)', marginBottom: '2rem', textAlign: 'center' }}>My Certifications</h1>

            {!hasCertificates ? (
                <div style={{
                    textAlign: 'center',
                    padding: '4rem',
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-md)',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😔</div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text)' }}>
                        Sorry, You have not done any course yet..!
                    </h3>
                    <p style={{ color: 'var(--color-text-light)', marginTop: '1rem' }}>
                        Complete a course to earn your certificate.
                    </p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {user.completedCourses.map((course, index) => (
                        <div key={index} style={{
                            background: 'white',
                            borderRadius: 'var(--radius-md)',
                            boxShadow: 'var(--shadow-sm)',
                            overflow: 'hidden',
                            border: '1px solid var(--color-border)'
                        }}>
                            <div style={{
                                height: '180px',
                                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <Award size={64} />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
                                    Completed on: {course.date || new Date().toLocaleDateString()}
                                </p>
                                <button className="btn btn-outline w-full">
                                    <Download size={16} style={{ marginRight: '8px' }} />
                                    Download Certificate (PDF)
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CertificationsPage;
