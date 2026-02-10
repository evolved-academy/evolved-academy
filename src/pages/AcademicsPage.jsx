import React from 'react';
import { Routes, Route, useParams, Link, useNavigate } from 'react-router-dom';
import CourseGrid from '../components/CourseGrid';

// --- Shared Components for Selections ---

const SelectionCard = ({ title, onClick, color }) => (
    <div
        onClick={onClick}
        style={{
            background: 'white',
            border: '1px solid #eee',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: 'var(--shadow-sm)'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            e.currentTarget.style.borderColor = color || 'var(--color-primary)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            e.currentTarget.style.borderColor = '#eee';
        }}
    >
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>{title}</h3>
        <p style={{ color: 'var(--color-text-light)' }}>Click to explore</p>
    </div>
);

const SelectionGrid = ({ title, children }) => (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <h2 style={{ color: 'var(--color-primary)', marginBottom: '2rem', textAlign: 'center' }}>{title}</h2>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
        }}>
            {children}
        </div>
    </div>
);

// --- Page Components ---

const ClassSelection = ({ board: propBoard }) => {
    const { state } = useParams(); // For state board routes
    const navigate = useNavigate();
    const board = propBoard || 'State Board';

    // Determine the base path for navigation
    const basePath = propBoard === 'cbse' ? '/academics/cbse' : `/academics/state/${state}`;
    const displayBoardName = propBoard === 'cbse' ? 'CBSE' : `${state?.toUpperCase()} State Board`;

    const classes = ['8th', '9th', '10th'];

    return (
        <SelectionGrid title={`${displayBoardName} - Select Class`}>
            {classes.map(cls => (
                <SelectionCard
                    key={cls}
                    title={`Class ${cls}`}
                    onClick={() => navigate(`${basePath}/${cls}`)}
                />
            ))}
        </SelectionGrid>
    );
};

const SubjectSelection = ({ board: propBoard }) => {
    const { state, classId } = useParams();
    const navigate = useNavigate();

    const basePath = propBoard === 'cbse' ? `/academics/cbse/${classId}` : `/academics/state/${state}/${classId}`;
    const displayBoardName = propBoard === 'cbse' ? 'CBSE' : `${state?.toUpperCase()} Board`;

    const subjects = ['Science', 'Maths', 'History', 'Geography', 'English'];

    return (
        <SelectionGrid title={`${displayBoardName} Class ${classId} - Select Subject`}>
            {subjects.map(sub => (
                <SelectionCard
                    key={sub}
                    title={sub}
                    onClick={() => navigate(`${basePath}/${sub.toLowerCase()}`)}
                />
            ))}
        </SelectionGrid>
    );
};

const VideoGallery = ({ board: propBoard }) => {
    const params = useParams();
    const { subject, state, classId } = params;

    // Use propBoard if provided (for CBSE route), otherwise try to get from params
    const board = propBoard || params.board;

    const formatSubject = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

    const title = state
        ? `${state.toUpperCase()} Board - Class ${classId} - ${formatSubject(subject)}`
        : `${board ? board.toUpperCase() : 'Board'} - Class ${classId} - ${formatSubject(subject)}`;

    // Mock data with specific YouTube videos for CBSE
    const getVideoData = () => {
        // Example condition with classId
        if (board === 'cbse' && classId === '9th' && subject === 'science') {
            return [
                { title: 'Matter in Our Surroundings', videoId: 'cn6vO1k5r5w', description: 'Class 9 Science Chapter 1 - Full Chapter Explanation' },
                { title: 'Is Matter Around Us Pure', videoId: 'e5zHl9y9yq4', description: 'Class 9 Science Chapter 2 - Detailed Breakdown' },
                { title: 'Atoms and Molecules', videoId: 'qWw3w5w5w5w', description: 'Class 9 Science Chapter 3 - Concepts & Formulas' },
                { title: 'Structure of the Atom', videoId: 'tThF0C0k1k0', description: 'Class 9 Science Chapter 4 - Electron, Proton, Neutron' },
                { title: 'The Fundamental Unit of Life', videoId: 'pPq3q5q5q5q', description: 'Class 9 Science Chapter 5 - Cell Structure' },
                { title: 'Tissues', videoId: 'rRr3r5r5r5r', description: 'Class 9 Science Chapter 6 - Plant & Animal Tissues' }
            ];
        }
        if (board === 'cbse' && classId === '9th' && subject === 'maths') {
            return [
                { title: 'Number Systems', videoId: 'NybHckSEQBI', description: 'Class 9 Maths Chapter 1 - Introduction' },
                { title: 'Polynomials', videoId: 'hHh3h5h5h5h', description: 'Class 9 Maths Chapter 2 - Zeroes & Factorization' },
                { title: 'Coordinate Geometry', videoId: 'cCc3c5c5c5c', description: 'Class 9 Maths Chapter 3 - Plotting Points' },
                { title: 'Linear Equations', videoId: 'lLl3l5l5l5l', description: 'Class 9 Maths Chapter 4 - Graphing Lines' },
                { title: 'Euclids Geometry', videoId: 'eEe3e5e5e5e', description: 'Class 9 Maths Chapter 5 - Axioms & Postulates' },
                { title: 'Lines and Angles', videoId: 'aAa3a5a5a5a', description: 'Class 9 Maths Chapter 6 - Properties of Angles' }
            ];
        }

        // Default fallback with class info in title
        return Array(6).fill(null).map((_, i) => ({
            title: `${formatSubject(subject)} (Class ${classId}) - Lesson ${i + 1}`,
            description: 'Comprehensive video tutorial covering key concepts.',
            thumbnail: null // Placeholder
        }));
    };

    const videos = getVideoData();

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>{title}</h2>
            <CourseGrid items={videos} type="video" />
        </div>
    );
};

import SEO from '../components/SEO';

const AcademicsPage = () => {
    return (
        <>
            <SEO
                title="Academic Courses (CBSE & State) | EvolvEd Academy"
                description="Comprehensive academic courses for Class 8, 9, and 10. Master Science, Maths, and Social Studies with expert-curated content."
            />
            <Routes>
                {/* CBSE Routes */}
                <Route path="cbse" element={<ClassSelection board="cbse" />} />
                <Route path="cbse/:classId" element={<SubjectSelection board="cbse" />} />
                <Route path="cbse/:classId/:subject" element={<VideoGallery board="cbse" />} />

                {/* State Board Routes */}
                <Route path="state/:state" element={<ClassSelection />} />
                <Route path="state/:state/:classId" element={<SubjectSelection />} />
                <Route path="state/:state/:classId/:subject" element={<VideoGallery />} />

                <Route path="/" element={
                    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
                        <h2>Select a Board from the menu to get started</h2>
                    </div>
                } />
            </Routes>
        </>
    );
};

export default AcademicsPage;
