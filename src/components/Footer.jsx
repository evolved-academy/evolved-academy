import React from 'react';

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
                    <span style={{ margin: '0 10px' }}>Privacy Policy</span>
                    <span style={{ margin: '0 10px' }}>Terms of Service</span>
                    <span style={{ margin: '0 10px' }}>Contact Us</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
