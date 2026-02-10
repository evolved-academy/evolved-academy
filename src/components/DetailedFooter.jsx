import React from 'react';
import { Facebook, Instagram, Youtube, Linkedin, Twitter, Send, Phone, Mail } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import './DetailedFooter.css';

const DetailedFooter = () => {
    // const { deleteAccount } = useAuth(); // Reverted for debugging

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        alert("Account deletion feature is temporarily disabled for maintenance.");
        /*
        const isConfirmed = window.confirm("Are You Sure You Want To Delete Your Account? 😢");
        if (isConfirmed) {
            await deleteAccount();
        }
        */
    };

    return (
        <div style={{ backgroundColor: '#113263', color: 'white', padding: '3rem 0', marginTop: 'auto' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                {/* Section 1: Brand & Socials */}
                <div style={{ maxWidth: '300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <img src={logo} alt="EvolvEd Academy Logo" style={{ width: '50px', height: 'auto', borderRadius: '50%' }} />
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>EvolvEd Academy</h2>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#e0e0e0', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                        Learn. Grow, Evolve!
                    </p>

                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Let's get social :</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="#" style={{ color: '#fff' }}><Facebook size={24} /></a>
                        <a href="https://www.instagram.com/evolv.ed.001?igsh=MXdzcnNyZmpxbmFibg==" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}><Instagram size={24} /></a>
                        <a href="https://youtube.com/@evolvedacademy001?si=kjlOXY3Fbjr1mZAW" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}><Youtube size={24} /></a>
                        <a href="#" style={{ color: '#fff' }}><Linkedin size={24} /></a>
                    </div>
                </div>

                {/* Section 2: Columns */}
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>EvolvEd Academy</h3>
                    <ul className="footer-section-list">
                        <li className="footer-link-item"><a href="#">About Us</a></li>
                        <li className="footer-link-item"><a href="#">Get Updates</a></li>
                        <li className="footer-link-item">
                            <a href="#" onClick={handleDeleteAccount}>Account Deletion</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Popular Courses</h3>
                    <ul className="footer-section-list">
                        <li className="footer-link-item">AI Use For Daily Life</li>
                        <li className="footer-link-item">
                            <a href="https://youtu.be/TQ7jr79LAkc?si=HqtaCx-WHitlTAIQ" target="_blank" rel="noopener noreferrer">
                                AI Use for Studies
                            </a>
                        </li>
                        <li className="footer-link-item">
                            <a href="https://youtu.be/oJ9gxehvN9Y?si=Kt-y2DRADJJVwiBq" target="_blank" rel="noopener noreferrer">
                                AI Use For Content Creation
                            </a>
                        </li>
                        <li className="footer-link-item">Prompt Engineering</li>
                        <li className="footer-link-item">MS Excel Mastery</li>
                    </ul>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Connect With Us</h3>
                    <ul className="footer-section-list">
                        <li>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=evolvedacademy001@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-connect-item"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <Mail size={16} /> Email Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="tel:8087278653"
                                className="footer-connect-item"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                onClick={(e) => {
                                    if (window.innerWidth >= 768) {
                                        e.preventDefault();
                                        alert("Call us at: 80872 78653");
                                    }
                                }}
                            >
                                <Phone size={16} /> Talk to A Counselor
                            </a>
                        </li>
                    </ul>

                </div>
            </div>
            {/* Copyright/Footer Bottom */}
            <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem', color: '#aaa' }}>
                &copy; {new Date().getFullYear()} EvolvEd Academy. All rights reserved.
            </div>
        </div>
    );
};

export default DetailedFooter;
