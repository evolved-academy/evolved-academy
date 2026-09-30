import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../supabase';
import { aptitudeQuestions } from '../aptitudeQuestions';
import { aptitudeProfiles } from '../aptitudeProfiles';
import SEO from '../../../components/SEO';
import DetailedFooter from '../../../components/DetailedFooter';
import { ChevronLeft, ChevronRight, CheckCircle, Brain, Trophy, Briefcase, GraduationCap } from 'lucide-react';
import './AptitudeTestPage.css';

const AptitudeTestPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [testLoading, setTestLoading] = useState(false);
    const [results, setResults] = useState(null);

    useEffect(() => {
        const checkExistingResults = async () => {
            if (!user?.email) return;
            
            try {
                const { data, error } = await supabase
                    .from('aptitude_results')
                    .select('*')
                    .eq('email', user.email)
                    .maybeSingle();

                if (data) {
                    const counts = { A: data.score_a, B: data.score_b, C: data.score_c };
                    const sorted = [
                        { type: 'A', score: counts.A },
                        { type: 'B', score: counts.B },
                        { type: 'C', score: counts.C }
                    ].sort((a, b) => b.score - a.score);

                    let profileKey = sorted[0].type;
                    if (sorted[0].score - sorted[1].score <= 5) {
                        profileKey = [sorted[0].type, sorted[1].type].sort().join('');
                    }

                    setResults({ counts, profile: aptitudeProfiles[profileKey] });
                    if (data.selected_answers) {
                        setAnswers(data.selected_answers);
                    }
                    setIsSubmitted(true);
                }
            } catch (error) {
                console.error('Error checking existing results:', error);
            } finally {
                setLoading(false);
            }
        };

        checkExistingResults();
    }, [user]);

    useEffect(() => {
        if (!isSubmitted && currentIndex < aptitudeQuestions.length) {
            const options = [...aptitudeQuestions[currentIndex].options];
            const shuffled = options.sort(() => Math.random() - 0.5);
            setShuffledOptions(shuffled);
        }
    }, [currentIndex, isSubmitted]);

    const handleOptionSelect = (type) => {
        setAnswers({ ...answers, [currentIndex]: type });
        if (currentIndex < aptitudeQuestions.length - 1) {
            setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
        }
    };

    const calculateResult = () => {
        const counts = { A: 0, B: 0, C: 0 };
        Object.values(answers).forEach(type => counts[type]++);
        
        const sorted = [
            { type: 'A', score: counts.A },
            { type: 'B', score: counts.B },
            { type: 'C', score: counts.C }
        ].sort((a, b) => b.score - a.score);

        const top1 = sorted[0];
        const top2 = sorted[1];

        let profileKey = top1.type;
        if (top1.score - top2.score <= 5) {
            const pair = [top1.type, top2.type].sort().join('');
            profileKey = pair;
        }

        const profile = aptitudeProfiles[profileKey];
        return { counts, profile, code: profileKey };
    };

    const handleSubmit = async () => {
        setTestLoading(true);
        const res = calculateResult();
        
        try {
            const { error } = await supabase
                .from('aptitude_results')
                .insert([{
                    email: user.email,
                    name: user.user_metadata?.full_name || user.email.split('@')[0],
                    score_a: res.counts.A,
                    score_b: res.counts.B,
                    score_c: res.counts.C,
                    selected_answers: answers,
                    dominant_type: res.profile.title,
                    timestamp: new Date().toISOString()
                }]);

            if (error) throw error;
            setResults(res);
            setIsSubmitted(true);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error submitting results:', error);
            alert("Failed to save results. Please try again.");
        } finally {
            setTestLoading(false);
        }
    };

    const progress = ((currentIndex + 1) / aptitudeQuestions.length) * 100;

    if (loading) {
        return (
            <div className="aptitude-page" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div className="loading-spinner">Checking your records...</div>
            </div>
        );
    }

    if (isSubmitted && !isReviewMode) {
        const { profile } = results;
        return (
            <div className="aptitude-page results-view">
                <SEO title={`${profile.title} | Test Results`} />
                <div className="aptitude-container full-results">
                    <div className="results-card premium-card">
                        <Trophy size={64} className="trophy-icon" />
                        <div className="profile-badge">{profile.subtitle}</div>
                        <h1>{profile.title}</h1>
                        <p className="profile-desc">{profile.description}</p>

                        <div className="results-grid">
                            <div className="results-section main-stats">
                                <h3><Brain size={20} /> Your Brain Skills</h3>
                                <div className="skill-box">{profile.skill}</div>
                                
                                <div className="stats-bars">
                                    <div className="stat-item">
                                        <div className="stat-info"><span>Science (A)</span><span>{results.counts.A}/50</span></div>
                                        <div className="stat-bar"><div className="fill a" style={{ width: `${(results.counts.A/50)*100}%` }}></div></div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-info"><span>Commerce (B)</span><span>{results.counts.B}/50</span></div>
                                        <div className="stat-bar"><div className="fill b" style={{ width: `${(results.counts.B/50)*100}%` }}></div></div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-info"><span>Arts (C)</span><span>{results.counts.C}/50</span></div>
                                        <div className="stat-bar"><div className="fill c" style={{ width: `${(results.counts.C/50)*100}%` }}></div></div>
                                    </div>
                                </div>
                            </div>

                            <div className="results-section professions">
                                <h3><Briefcase size={20} /> Top Career Paths for 2026</h3>
                                <ul className="prof-list">
                                    {profile.professions.map((p, i) => {
                                        const [title, desc] = p.split(':');
                                        return (
                                            <li key={i}>
                                                <strong>{title}:</strong> {desc}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div className="results-section stream-advice">
                                <h3><GraduationCap size={20} /> Stream & Academic Advice</h3>
                                <p>{profile.advice}</p>
                            </div>
                        </div>

                        <div className="results-footer" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button className="btn-primary back-home-btn" onClick={() => navigate('/career-counselling/course')}>
                                Back to Course Dashboard
                            </button>
                            <button className="btn-secondary review-answers-btn" onClick={() => {
                                setIsReviewMode(true);
                                setCurrentIndex(0);
                                window.scrollTo(0, 0);
                            }}>
                                Review My Answers
                            </button>
                        </div>
                    </div>
                </div>
                <DetailedFooter />
            </div>
        );
    }

    if (isReviewMode) {
        const currentQuestion = aptitudeQuestions[currentIndex];
        return (
            <div className="aptitude-page review-mode">
                <SEO title={`Review Question ${currentIndex + 1} | Aptitude Test`} />
                <div className="aptitude-container">
                    <header className="aptitude-header">
                        <button className="back-btn" onClick={() => setIsReviewMode(false)}>
                            <ChevronLeft /> Exit Review
                        </button>
                        <div className="progress-wrapper">
                            <div className="progress-text">Reviewing Question {currentIndex + 1} of {aptitudeQuestions.length}</div>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    </header>

                    <main className="question-section">
                        <div className="question-card">
                            <Brain className="brain-icon" size={40} />
                            <div className="review-badge">READ ONLY</div>
                            <h2>{currentQuestion.question}</h2>
                            <div className="options-grid">
                                {currentQuestion.options.map((option, idx) => (
                                    <div 
                                        key={idx}
                                        className={`option-btn review-only ${String(answers[currentIndex]) === String(option.type) ? 'selected' : ''}`}
                                    >
                                        <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                                        <span className="option-text">{option.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="navigation-footer">
                            <button 
                                className="nav-btn prev" 
                                disabled={currentIndex === 0}
                                onClick={() => setCurrentIndex(currentIndex - 1)}
                            >
                                <ChevronLeft /> Previous
                            </button>
                            
                            {currentIndex === aptitudeQuestions.length - 1 ? (
                                <button className="submit-test-btn" onClick={() => {
                                    setIsReviewMode(false);
                                    window.scrollTo(0, 0);
                                }}>
                                    Finish Review <CheckCircle size={20} />
                                </button>
                            ) : (
                                <button 
                                    className="nav-btn next" 
                                    onClick={() => setCurrentIndex(currentIndex + 1)}
                                >
                                    Next <ChevronRight />
                                </button>
                            )}
                        </div>
                    </main>
                </div>
                <DetailedFooter />
            </div>
        );
    }

    const currentQuestion = aptitudeQuestions[currentIndex];

    return (
        <div className="aptitude-page">
            <SEO title={`Question ${currentIndex + 1} | Aptitude Test`} />
            
            <div className="aptitude-container">
                <header className="aptitude-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ChevronLeft /> Back
                    </button>
                    <div className="progress-wrapper">
                        <div className="progress-text">Question {currentIndex + 1} of {aptitudeQuestions.length}</div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </header>

                <main className="question-section">
                    <div className="question-card">
                        <Brain className="brain-icon" size={40} />
                        <h2>{currentQuestion.question}</h2>
                        <div className="options-grid">
                            {shuffledOptions.map((option, idx) => (
                                <button 
                                    key={idx}
                                    className={`option-btn ${answers[currentIndex] === option.type ? 'selected' : ''}`}
                                    onClick={() => handleOptionSelect(option.type)}
                                >
                                    <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                                    <span className="option-text">{option.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="navigation-footer">
                        <button 
                            className="nav-btn prev" 
                            disabled={currentIndex === 0}
                            onClick={() => setCurrentIndex(currentIndex - 1)}
                        >
                            <ChevronLeft /> Previous
                        </button>
                        
                        {currentIndex === aptitudeQuestions.length - 1 ? (
                            <button 
                                className="submit-test-btn" 
                                onClick={handleSubmit} 
                                disabled={testLoading || !answers[currentIndex]}
                                style={{ 
                                    opacity: (testLoading || !answers[currentIndex]) ? 0.5 : 1,
                                    cursor: (testLoading || !answers[currentIndex]) ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {testLoading ? "Saving..." : "Submit Test"} <CheckCircle size={20} />
                            </button>
                        ) : (
                            <button 
                                className="nav-btn next" 
                                onClick={() => setCurrentIndex(currentIndex + 1)}
                                disabled={!answers[currentIndex]}
                                style={{ 
                                    opacity: !answers[currentIndex] ? 0.5 : 1,
                                    cursor: !answers[currentIndex] ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Next <ChevronRight />
                            </button>
                        )}
                    </div>
                </main>
            </div>
            <DetailedFooter />
        </div>
    );
};

export default AptitudeTestPage;
