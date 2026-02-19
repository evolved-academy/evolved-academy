import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { paidCourses } from '../data/courses';
import SEO from '../components/SEO';
import CourseHeader from '../components/CourseHeader';
import CourseSidebar from '../components/CourseSidebar';

const CoursePlayerPage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [currentLectureIndex, setCurrentLectureIndex] = useState(0);

    useEffect(() => {
        const foundCourse = paidCourses.find(c => c.code === courseId);
        setCourse(foundCourse);

        // Reset to first lecture when course changes
        setCurrentModuleIndex(0);
        setCurrentLectureIndex(0);
    }, [courseId]);

    const handleSelectLecture = (mIndex, lIndex) => {
        setCurrentModuleIndex(mIndex);
        setCurrentLectureIndex(lIndex);
    };

    if (!course) {
        return <div className="container" style={{ padding: '4rem' }}>Course not found.</div>;
    }

    // Get current lecture data safely
    const currentModule = course.modules ? course.modules[currentModuleIndex] : null;
    const currentLecture = currentModule ? currentModule.lectures[currentLectureIndex] : null;
    const videoId = currentLecture ? currentLecture.videoId : course.videoId;
    const lectureTitle = currentLecture ? currentLecture.title : course.title;
    const moduleTitle = currentModule ? currentModule.title : 'Overview';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <SEO title={`${course.title} - Learning | EvolvEd Academy`} />

            {/* Header */}
            <CourseHeader title={course.title} progress={25} />

            {/* Main Content Area */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                {/* Left: Video Player Area */}
                <div style={{ flex: 1, overflowY: 'auto', background: '#f9f9f9', padding: '2rem' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                        {/* Video Player */}
                        <div style={{
                            position: 'relative',
                            paddingBottom: '56.25%',
                            height: 0,
                            borderRadius: '12px',
                            overflow: 'hidden',
                            background: '#000',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}>
                            <iframe
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={lectureTitle}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Lecture Info */}
                        <div style={{ marginTop: '2rem', background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                            <h2 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '0.5rem' }}>
                                {moduleTitle}
                            </h2>
                            <h3 style={{ fontSize: '1.1rem', color: '#4b5563', fontWeight: '500' }}>
                                {lectureTitle}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Right: Sidebar */}
                <div style={{ width: '400px', background: 'white', borderLeft: '1px solid #e5e7eb' }}>
                    {course.modules && course.modules.length > 0 ? (
                        <CourseSidebar
                            modules={course.modules}
                            currentModuleIndex={currentModuleIndex}
                            currentLectureIndex={currentLectureIndex}
                            onSelectLecture={handleSelectLecture}
                        />
                    ) : (
                        <div style={{ padding: '2rem', color: '#666' }}>No modules available.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoursePlayerPage;
