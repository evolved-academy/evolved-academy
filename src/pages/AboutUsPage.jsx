import React from 'react';
import SEO from '../components/SEO';
import DetailedFooter from '../components/DetailedFooter';
import './AboutUsPage.css';

const AboutUsPage = () => {
    return (
        <div className="about-us-page">
            <SEO 
                title="About Us | EvolvEd Academy"
                description="Learn about the mission, vision, and the story behind EvolvEd Academy - evolving education for the future."
            />
            
            <main style={{ flex: 1 }}>
                {/* Hero section for About Us */}
                <section className="about-hero">
                    <div className="container">
                        <h1 className="about-hero-title">About EvolvEd Academy</h1>
                        <p className="about-hero-subtitle">
                            Evolving Education for the Future.
                        </p>
                    </div>
                </section>

                <div className="about-container">
                    
                    {/* Story Section */}
                    <section className="about-section">
                        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                            <p className="about-story-text">
                                EvolvEd Academy began as a spark of an idea between two college students who saw a widening gap between traditional education and the rapidly shifting digital landscape. What started as a mission to demystify Artificial Intelligence has grown into a comprehensive learning ecosystem designed for the modern student.
                            </p>
                            <p className="about-story-text">
                                We believe that a student’s potential shouldn't be confined to a textbook. In today’s world, AI is the foundation, but it is the fusion of technology, creativity, and practical skills that creates a truly future-proof individual.
                            </p>
                        </div>
                    </section>

                    {/* Evolution Section */}
                    <section className="about-section about-evolution-box">
                        <h2 className="about-section-title">Our Evolution: Beyond the Algorithm</h2>
                        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                                While our DNA is rooted in high-level AI literacy, we realized that students possess a vast array of passions, from coding and data science to graphic design, financial literacy, and the creative arts. Too often, these talents are sidelined to make room for academic pressure.
                            </p>
                            <p style={{ fontSize: '1.1rem', marginBottom: '0', lineHeight: 1.8 }}>
                                EvolvEd Academy is here to change that narrative. We offer a diverse range of courses that run parallel to school and college academics, ensuring that your passions don't just survive, they thrive.
                            </p>
                        </div>
                    </section>

                    {/* What Sets Us Apart Section */}
                    <section className="about-section">
                        <h2 className="about-section-title">What Sets Us Apart?</h2>
                        <div className="about-grid-360">
                            {[
                                {
                                    title: "AI-First Foundation",
                                    content: "Our USP remains our cutting-edge AI curriculum. We don’t just teach you how to use AI; we teach you how to build, prompt, and innovate with it."
                                },
                                {
                                    title: "The 360° Skill Hub",
                                    content: "From Tech (Web Dev, App Development) and Creative Arts (Digital Illustration, Content Creation) to Non-Tech Essentials (Communication, Marketing, Personal Finance), we cover the full spectrum of modern success."
                                },
                                {
                                    title: "Radical Affordability",
                                    content: "We are student-led, and we understand the student budget. Our mission is to democratize high-quality skill development, making it accessible to everyone, not just the elite."
                                },
                                {
                                    title: "Peer-to-Peer Relatability",
                                    content: "We are students teaching students. We know exactly where the curriculum falls short and where the industry is moving, allowing us to provide mentorship that is grounded, relevant, and jargon-free."
                                }
                            ].map((item, index) => (
                                <div key={index} className="about-card">
                                    <h3 className="about-card-title">{item.title}</h3>
                                    <p className="about-card-text">{item.content}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Vision for You Section */}
                    <section className="about-section" style={{ textAlign: 'center' }}>
                        <h2 className="about-section-title">Our Vision for You</h2>
                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                                At EvolvEd, we don’t just want you to "keep up" with the digital world; we want you to lead it. We bridge the gap between classroom theory and real-world application, providing the tools to boost your productivity, ignite your creativity, and open doors to global career opportunities.
                            </p>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                                Whether you are looking to master the latest LLM (Large Language Model), design your first brand, or learn how to manage your finances while still in school, we are here to ensure you walk away confident, curious, and multi-faceted.
                            </p>
                            <div className="about-quote">
                                "Don't just graduate. Evolve."
                            </div>
                        </div>
                    </section>

                    {/* Mission & Vision Section */}
                    <section className="about-section about-mission-vision-box">
                        <h2 style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center' }}>Our Mission & Vision</h2>
                        <div className="about-mv-grid">
                            <div className="about-mv-item">
                                <h3>Our Mission</h3>
                                <p style={{ lineHeight: 1.8, opacity: 0.9 }}>
                                    To democratize high-impact skills by providing affordable, student-centric education that bridges the gap between traditional academics and the demands of the modern digital economy. We aim to equip every learner with the "AI-Plus" advantage, mastery over technology combined with the cultivation of their unique creative and professional passions.
                                </p>
                            </div>
                            <div className="about-mv-item">
                                <h3>Our Vision</h3>
                                <p style={{ lineHeight: 1.8, opacity: 0.9 }}>
                                    To become the global gold standard for supplemental education, where a student’s academic degree is perfectly complemented by a robust portfolio of real-world skills. We envision a world where every student, regardless of their financial background, has the tools to be an innovator, a creator, and a leader.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Pillars Section */}
                    <section className="about-section">
                        <h2 className="about-section-title">The EvolvEd Pillars</h2>
                        <div className="about-pillars-table-wrapper">
                            <table className="about-pillars-table">
                                <thead>
                                    <tr>
                                        <th>Pillar</th>
                                        <th>Our Commitment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { pillar: "Accessibility", commitment: "Keeping price points low enough that every student can invest in themselves without hesitation." },
                                        { pillar: "Relevance", commitment: "Updating our course modules in real-time to reflect the latest shifts in AI, tech, and industry trends." },
                                        { pillar: "Holistic Growth", commitment: "Ensuring students don't have to choose between 'Logic' (Tech/AI) and 'Magic' (Creativity/Arts)." },
                                        { pillar: "Peer Empowerment", commitment: "Maintaining a student-led environment where the learning is relatable, interactive, and fun." }
                                    ].map((row, i) => (
                                        <tr key={i}>
                                            <td className="about-pillar-name">{row.pillar}</td>
                                            <td style={{ padding: '1.25rem', color: 'var(--color-text-light)' }}>{row.commitment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Name Origin Section */}
                    <section className="about-section" style={{ textAlign: 'center' }}>
                        <h2 className="about-section-title">Why the Name "EvolvEd"?</h2>
                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <p style={{ fontSize: '1.2rem', lineHeight: 1.8 }}>
                                The name is a play on "Evolving Education." We believe education is not a static milestone you reach at graduation, but a continuous process of adaptation. In a world that changes by the hour, you don't just need to be educated—you need to be EvolvEd.
                            </p>
                        </div>
                    </section>

                </div>
            </main>

            <DetailedFooter />
        </div>
    );
};

export default AboutUsPage;
