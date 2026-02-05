import React from 'react';
import { Facebook, Instagram, Youtube, Linkedin, Twitter, Send, Phone, Mail } from 'lucide-react';
import logo from '../assets/logo.png';

const DetailedFooter = () => {
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
                        <a href="#" style={{ color: '#fff' }}><Youtube size={24} /></a>
                        <a href="#" style={{ color: '#fff' }}><Linkedin size={24} /></a>
                        <a href="#" style={{ color: '#fff' }}><Twitter size={24} /></a>
                        <a href="#" style={{ color: '#fff' }}><Send size={24} /></a>
                    </div>
                </div>

                {/* Section 2: Columns */}
                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Company</h3>
                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#e0e0e0', lineHeight: '2' }}>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Updates</a></li>
                        <li><a href="#">Account Deletion</a></li>
                    </ul>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Popular Courses</h3>
                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#e0e0e0', lineHeight: '2' }}>
                        <li>AI Use For Daily Life</li>
                        <li>AI Use for Studies</li>
                        <li>AI Use For Content Creation</li>
                        <li>Prompt Engineering</li>
                        <li>MS Excel Mastery</li>
                    </ul>
                </div>

                <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>Connect With Us</h3>
                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#e0e0e0', lineHeight: '2' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} /> Email Us</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} /> Talk to A Counselor</li>
                    </ul>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>Our Products</h3>
                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#e0e0e0', lineHeight: '2' }}>
                        <li>EA App Learning</li>
                        <li>EA Offline Payments</li>
                    </ul>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>Quick Links</h3>
                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', color: '#e0e0e0', lineHeight: '2' }}>
                        <li>EA Prerna</li>
                        <li>EA SIP</li>
                        <li>EA Gurukulam</li>
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
