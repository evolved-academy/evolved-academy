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
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h2 style={{ color: 'var(--color-primary)' }}>{title}</h2>
            <CourseGrid items={resources} type="resource" />
        </div>
    );
};

import SEO from '../components/SEO';

const LibraryPage = () => {
    return (
        <>
            <SEO
                title="Digital Library & Resources | EvolvEd Academy"
                description="Access a vast collection of study materials, reference books, and notes to support your academic success."
            />
            <Routes>
                <Route path=":category" element={<ResourceList />} />
                <Route path="/" element={
                    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
                        <h2>Select a category to view resources</h2>
                    </div>
                } />
            </Routes>
        </>
    );
};

export default LibraryPage;
