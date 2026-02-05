import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import CourseGrid from '../components/CourseGrid';

const VideoGallery = ({ board: propBoard }) => {
    const params = useParams();
    const { subject, state } = params;
    // Use propBoard if provided (for CBSE route), otherwise try to get from params (though not in current route defs)
    // For state board, we rely on 'state' param being present to determine title.
    const board = propBoard || params.board;

    const formatSubject = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

    const title = state
        ? `${state.toUpperCase()} Board - ${formatSubject(subject)}`
        : `${board ? board.toUpperCase() : 'Board'} - ${formatSubject(subject)}`;

    // Mock data with specific YouTube videos for CBSE
    const getVideoData = () => {
        if (board === 'cbse' && subject === 'science') {
            return [
                { title: 'Matter in Our Surroundings', videoId: 'cn6vO1k5r5w', description: 'Class 9 Science Chapter 1 - Full Chapter Explanation' },
                { title: 'Is Matter Around Us Pure', videoId: 'e5zHl9y9yq4', description: 'Class 9 Science Chapter 2 - Detailed Breakdown' },
                { title: 'Atoms and Molecules', videoId: 'qWw3w5w5w5w', description: 'Class 9 Science Chapter 3 - Concepts & Formulas' },
                { title: 'Structure of the Atom', videoId: 'tThF0C0k1k0', description: 'Class 9 Science Chapter 4 - Electron, Proton, Neutron' },
                { title: 'The Fundamental Unit of Life', videoId: 'pPq3q5q5q5q', description: 'Class 9 Science Chapter 5 - Cell Structure' },
                { title: 'Tissues', videoId: 'rRr3r5r5r5r', description: 'Class 9 Science Chapter 6 - Plant & Animal Tissues' }
            ];
        }
        if (board === 'cbse' && subject === 'maths') {
            return [
                { title: 'Number Systems', videoId: 'NybHckSEQBI', description: 'Class 9 Maths Chapter 1 - Introduction' },
                { title: 'Polynomials', videoId: 'hHh3h5h5h5h', description: 'Class 9 Maths Chapter 2 - Zeroes & Factorization' },
                { title: 'Coordinate Geometry', videoId: 'cCc3c5c5c5c', description: 'Class 9 Maths Chapter 3 - Plotting Points' },
                { title: 'Linear Equations', videoId: 'lLl3l5l5l5l', description: 'Class 9 Maths Chapter 4 - Graphing Lines' },
                { title: 'Euclids Geometry', videoId: 'eEe3e5e5e5e', description: 'Class 9 Maths Chapter 5 - Axioms & Postulates' },
                { title: 'Lines and Angles', videoId: 'aAa3a5a5a5a', description: 'Class 9 Maths Chapter 6 - Properties of Angles' }
            ];
        }

        // Default fallback
        return Array(6).fill(null).map((_, i) => ({
            title: `${title} - Lesson ${i + 1}`,
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

const AcademicsPage = () => {
    return (
        <Routes>
            <Route path="cbse/:subject" element={<VideoGallery board="cbse" />} />
            <Route path="state/:state/:subject" element={<VideoGallery />} />
            <Route path="/" element={
                <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
                    <h2>Select a Board and Subject from the menu</h2>
                </div>
            } />
        </Routes>
    );
};

export default AcademicsPage;
