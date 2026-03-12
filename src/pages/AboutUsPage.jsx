import React from 'react';
import SEO from '../components/SEO';
import DetailedFooter from '../components/DetailedFooter';

const AboutUsPage = () => {
    return (
        <div className="about-us-page" style={{ background: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <SEO 
                title="About Us | EvolvEd Academy"
                description="Learn about the mission, vision, and the story behind EvolvEd Academy - evolving education for the future."
            />
            
            <main style={{ flex: 1 }}>
                {/* Hero section for About Us */}
                <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '6rem 1.5rem', textAlign: 'center' }}>
                    <div className="container">
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>About EvolvEd Academy</h1>
                        <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9, lineHeight: 1.8 }}>
                            Evolving Education for the Future.
                        </p>
                    </div>
                </section>

                <div className="container" style={{ padding: '4rem 1.5rem' }}>
                    
                    {/* Story Section */}
                    <section style={{ marginBottom: '5rem' }}>
                        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: 1.8, color: 'var(--color-text)' }}>
                                EvolvEd Academy began as a spark of an idea between two college students who saw a widening gap between traditional education and the rapidly shifting digital landscape. What started as a mission to demystify Artificial Intelligence has grown into a comprehensive learning ecosystem designed for the modern student.
                            </p>
                            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: 1.8, color: 'var(--color-text)' }}>
                                We believe that a student’s potential shouldn't be confined to a textbook. In today’s world, AI is the foundation, but it is the fusion of technology, creativity, and practical skills that creates a truly future-proof individual.
                            </p>
                        </div>
                    </section>

                    {/* Evolution Section */}
                    <section style={{ marginBottom: '5rem', padding: '4rem', backgroundColor: 'var(--color-surface)', borderRadius: '1.5rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '2rem', textAlign: 'center' }}>Our Evolution: Beyond the Algorithm</h2>
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
                    <section style={{ marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '3rem', textAlign: 'center' }}>What Sets Us Apart?</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
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
                                <div key={index} style={{ padding: '2rem', borderRadius: '1rem', border: '1px solid var(--color-border)', backgroundColor: 'white', boxShadow: 'var(--shadow-sm)' }}>
                                    <h3 style={{ color: 'var(--color-secondary)', marginBottom: '1rem', fontSize: '1.5rem' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--color-text-light)', lineHeight: 1.6 }}>{item.content}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Vision for You Section */}
                    <section style={{ marginBottom: '5rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '2rem' }}>Our Vision for You</h2>
                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                                At EvolvEd, we don’t just want you to "keep up" with the digital world; we want you to lead it. We bridge the gap between classroom theory and real-world application, providing the tools to boost your productivity, ignite your creativity, and open doors to global career opportunities.
                            </p>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                                Whether you are looking to master the latest LLM (Large Language Model), design your first brand, or learn how to manage your finances while still in school, we are here to ensure you walk away confident, curious, and multi-faceted.
                            </p>
                            <div style={{ fontSize: '1.8rem', fontWeight: 700, fontStyle: 'italic', marginTop: '2rem', color: 'var(--color-secondary)' }}>
                                "Don't just graduate. Evolve."
                            </div>
                        </div>
                    </section>

                    {/* Mission & Vision Section */}
                    <section style={{ marginBottom: '5rem', backgroundColor: 'var(--color-primary)', color: 'white', padding: '4rem', borderRadius: '1.5rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Our Mission & Vision</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-accent-gold)', display: 'inline-block', paddingBottom: '0.5rem' }}>Our Mission</h3>
                                <p style={{ lineHeight: 1.8, opacity: 0.9 }}>
                                    To democratize high-impact skills by providing affordable, student-centric education that bridges the gap between traditional academics and the demands of the modern digital economy. We aim to equip every learner with the "AI-Plus" advantage, mastery over technology combined with the cultivation of their unique creative and professional passions.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-accent-gold)', display: 'inline-block', paddingBottom: '0.5rem' }}>Our Vision</h3>
                                <p style={{ lineHeight: 1.8, opacity: 0.9 }}>
                                    To become the global gold standard for supplemental education, where a student’s academic degree is perfectly complemented by a robust portfolio of real-world skills. We envision a world where every student, regardless of their financial background, has the tools to be an innovator, a creator, and a leader.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Pillars Section */}
                    <section style={{ marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '3rem', textAlign: 'center' }}>The EvolvEd Pillars</h2>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--color-primary)', color: 'white', textAlign: 'left' }}>
                                        <th style={{ padding: '1.25rem' }}>Pillar</th>
                                        <th style={{ padding: '1.25rem' }}>Our Commitment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { pillar: "Accessibility", commitment: "Keeping price points low enough that every student can invest in themselves without hesitation." },
                                        { pillar: "Relevance", commitment: "Updating our course modules in real-time to reflect the latest shifts in AI, tech, and industry trends." },
                                        { pillar: "Holistic Growth", commitment: "Ensuring students don't have to choose between 'Logic' (Tech/AI) and 'Magic' (Creativity/Arts)." },
                                        { pillar: "Peer Empowerment", commitment: "Maintaining a student-led environment where the learning is relatable, interactive, and fun." }
                                    ].map((row, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                            <td style={{ padding: '1.25rem', fontWeight: 600, color: 'var(--color-primary)', width: '25%' }}>{row.pillar}</td>
                                            <td style={{ padding: '1.25rem', color: 'var(--color-text-light)' }}>{row.commitment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Name Origin Section */}
                    <section style={{ marginBottom: '5rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '2rem' }}>Why the Name "EvolvEd"?</h2>
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
