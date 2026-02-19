import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import { paidCourses } from '../data/courses';
import EnrolledCourseCard from '../components/EnrolledCourseCard';
import SEO from '../components/SEO';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyCoursesPage = () => {
    const { user } = useAuth();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            if (!user?.email) return;

            try {
                const { data, error } = await supabase
                    .from('student_access')
                    .select('course_code')
                    .eq('email', user.email);

                if (data) {
                    const codes = data.map(item => item.course_code);
                    const userCourses = paidCourses.filter(course => codes.includes(course.code));
                    setEnrolledCourses(userCourses);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, [user]);

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
            <SEO title="My Courses | EvolvEd Academy" />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link to="/home" style={{ color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                            <ChevronLeft /> Back
                        </Link>
                        <h1 style={{ fontSize: '2rem', color: '#1e293b', margin: 0 }}>Enrolled Courses</h1>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Search courses..."
                                style={{
                                    padding: '10px 16px',
                                    paddingRight: '40px',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    width: '250px',
                                    outline: 'none'
                                }}
                            />
                            <Search size={18} color="#94a3b8" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <ChevronLeft color="#9333ea" />
                            </button>
                            <button style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <ChevronRight color="#9333ea" />
                            </button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>Loading courses...</div>
                ) : enrolledCourses.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '2rem'
                    }}>
                        {enrolledCourses.map((course, index) => (
                            <EnrolledCourseCard
                                key={index}
                                course={course}
                                // Mocking different progress for demo
                                progress={index === 0 ? 0 : index === 1 ? 26 : 65}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{
                        background: 'white',
                        padding: '3rem',
                        borderRadius: '16px',
                        textAlign: 'center',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <h3>No enrolled courses found.</h3>
                        <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>Explore our catalog to start learning!</p>
                        <Link to="/tech-skills/paid" className="btn btn-primary">Browse Courses</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCoursesPage;
