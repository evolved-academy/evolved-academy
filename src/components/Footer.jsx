import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            padding: 'var(--spacing-lg) 0',
            marginTop: 'auto'
        }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <p>&copy; {new Date().getFullYear()} EvolvEd Academy. All rights reserved.</p>
                <div style={{ marginTop: 'var(--spacing-sm)', fontSize: '0.9rem', opacity: 0.8 }}>
                    <Link to="/legal" style={{ margin: '0 10px', color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
                    <Link to="/legal" style={{ margin: '0 10px', color: 'inherit', textDecoration: 'none' }}>Terms of Service</Link>
                    <Link to="/legal" style={{ margin: '0 10px', color: 'inherit', textDecoration: 'none' }}>Contact Us</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
