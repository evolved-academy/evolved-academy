import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="not-found-page" style={{
            minHeight: 'calc(100vh - 80px - 200px)', // Adjust for navbar/footer
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)'
        }}>
            <SEO
                title="Page Not Found | EvolvEd Academy"
                description="The page you are looking for does not exist. Return to EvolvEd Academy home."
            />

            <AlertTriangle size={80} color="var(--color-primary)" style={{ marginBottom: '1.5rem', opacity: 0.8 }} />

            <h1 style={{
                fontSize: '4rem',
                color: 'var(--color-primary)',
                marginBottom: '0.5rem',
                fontWeight: '800'
            }}>404</h1>

            <h2 style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                color: 'var(--color-text)'
            }}>Page Not Found</h2>

            <p style={{
                fontSize: '1.1rem',
                color: 'var(--color-text-light)',
                maxWidth: '500px',
                marginBottom: '2.5rem',
                lineHeight: '1.6'
            }}>
                Oops! The page you're looking for seems to have wandered off.
                It might have been removed, renamed, or didn't exist in the first place.
            </p>

            <Link to="/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--color-primary)',
                color: 'white',
                padding: '0.8rem 2rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                boxShadow: '0 4px 14px rgba(0, 118, 255, 0.39)',
                transition: 'transform 0.2s ease'
            }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
                <Home size={20} />
                Return Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
