import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { paidCourses } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const CoursePlayerPage = () => {
    const { courseId } = useParams();
    const { user } = useAuth();
    const [course, setCourse] = useState(null);
    const [progress, setProgress] = useState(65); // Mock progress

    useEffect(() => {
        const foundCourse = paidCourses.find(c => c.code === courseId);
        setCourse(foundCourse);
    }, [courseId]);

    if (!course) {
        return <div className="container" style={{ padding: '4rem' }}>Course not found.</div>;
    }

    return (
        <div className="course-player-page" style={{ padding: '2rem', minHeight: '80vh' }}>
            <SEO title={`${course.title} - Learning | EvolvEd Academy`} />

            <div className="container">
                <Link to="/home" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--color-primary)', textDecoration: 'none' }}>
                    <ArrowLeft size={20} /> Back to Dashboard
                </Link>

                <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                    <h1 style={{ marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{course.title}</h1>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                            <span>Course Progress</span>
                            <span>{progress}% Completed</span>
                        </div>
                        <div style={{ width: '100%', height: '10px', background: '#e5e7eb', borderRadius: '5px', overflow: 'hidden' }}>
                            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--color-primary)', borderRadius: '5px' }}></div>
                        </div>
                    </div>

                    {/* Video Player */}
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-md)', background: '#000' }}>
                        <iframe
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            src={`https://www.youtube.com/embed/${course.videoId}?autoplay=1`}
                            title={course.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <h3>About this Module</h3>
                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                            {course.description} In this module, you will continue learning key concepts and practical applications.
                            Remember to take notes and complete the exercises at the end of the video.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayerPage;
