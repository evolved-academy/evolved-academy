import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import CourseGrid from '../components/CourseGrid';

const ResourceList = () => {
    const { category } = useParams();
    const title = category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Resources` : 'Library';

    const resources = Array(5).fill(null).map((_, i) => ({
        title: `${title} - Note ${i + 1}`,
        description: 'Downloadable PDF study material.',
    }));

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h2 style={{ color: 'var(--color-primary)' }}>{title}</h2>
            <CourseGrid items={resources} type="resource" />
        </div>
    );
};

const LibraryPage = () => {
    return (
        <Routes>
            <Route path=":category" element={<ResourceList />} />
            <Route path="/" element={
                <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                    <h2>Select a category to view resources</h2>
                </div>
            } />
        </Routes>
    );
};

export default LibraryPage;
