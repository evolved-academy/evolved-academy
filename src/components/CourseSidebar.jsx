import React, { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, Lock, MonitorPlay, FileText, HelpCircle } from 'lucide-react';

const CourseSidebar = ({ modules, currentModuleIndex, currentLectureIndex, onSelectLecture }) => {
    const [openModules, setOpenModules] = useState(
        new Array(modules.length).fill(false).map((_, i) => i === 0) // Default open first module
    );

    const toggleModule = (index) => {
        const newOpenModules = [...openModules];
        newOpenModules[index] = !newOpenModules[index];
        setOpenModules(newOpenModules);
    };

    return (
        <div style={{
            background: 'white',
            borderLeft: '1px solid #e2e8f0',
            height: '100%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '0.5rem' }}>Course Content</h3>

                {/* Extra buttons mimicking the user image */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button style={{
                        fontSize: '0.8rem',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: '1px solid #9333ea',
                        color: '#9333ea',
                        background: 'white',
                        fontWeight: '500'
                    }}>
                        Resources
                    </button>

                </div>
            </div>

            <div style={{ flex: 1 }}>
                {modules.map((module, mIndex) => {
                    const isOpen = openModules[mIndex];
                    const isActiveModule = currentModuleIndex === mIndex;

                    return (
                        <div key={mIndex} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <button
                                onClick={() => toggleModule(mIndex)}
                                style={{
                                    width: '100%',
                                    padding: '1.25rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: isActiveModule ? '#f8fafc' : 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left'
                                }}
                            >
                                <div>
                                    <h4 style={{
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        color: '#334155',
                                        marginBottom: '4px'
                                    }}>
                                        {module.title}
                                    </h4>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                        {module.duration} | {module.lectures.length} / {module.lectures.length} lectures
                                    </div>
                                </div>
                                {isOpen ? <ChevronUp size={20} color="#94a3b8" /> : <ChevronDown size={20} color="#94a3b8" />}
                            </button>

                            {/* Lectures List */}
                            {isOpen && (
                                <div style={{ background: '#f8fafc' }}>
                                    {module.lectures.map((lecture, lIndex) => {
                                        const isSelected = isActiveModule && currentLectureIndex === lIndex;

                                        return (
                                            <div
                                                key={lIndex}
                                                onClick={() => onSelectLecture(mIndex, lIndex)}
                                                style={{
                                                    padding: '12px 1.25rem 12px 2rem',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    gap: '12px',
                                                    alignItems: 'flex-start',
                                                    background: isSelected ? '#e0e7ff' : 'transparent', // Highlight active
                                                    borderLeft: isSelected ? '4px solid var(--color-primary)' : '4px solid transparent',
                                                    transition: 'background 0.2s'
                                                }}
                                            >
                                                <div style={{ marginTop: '2px' }}>
                                                    {isSelected ? (
                                                        <MonitorPlay size={16} color="var(--color-primary)" />
                                                    ) : (
                                                        <PlayCircle size={16} color="#94a3b8" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div style={{
                                                        fontSize: '0.9rem',
                                                        color: isSelected ? 'var(--color-primary)' : '#475569',
                                                        fontWeight: isSelected ? '600' : '400'
                                                    }}>
                                                        {lIndex + 1}. {lecture.title}
                                                    </div>
                                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                                                        {lecture.duration}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Bottom Mentorship Banner */}
            <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <div style={{
                    background: '#7e22ce', // Keeping purple for this "Live 1:1" button as in mock
                    color: 'white',
                    padding: '12px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 6px rgba(126, 34, 206, 0.2)'
                }}>
                    <HelpCircle size={18} /> Live 1:1 Mentorship
                </div>
            </div>
        </div>
    );
};

export default CourseSidebar;
