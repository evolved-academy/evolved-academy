import React, { useState } from 'react';
import { Phone } from 'lucide-react';

const ContactButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}
        >
            {isOpen && (
                <div style={{
                    backgroundColor: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    color: 'var(--color-primary)',
                    fontWeight: '600',
                    animation: 'fadeIn 0.2s ease-in-out'
                }}>
                    Call us: +91 80872 78653
                </div>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    backgroundColor: 'white',
                    color: 'var(--color-primary)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '3.5rem',
                    height: '3.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-lg)',
                    transition: 'transform 0.2s',
                    transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)'
                }}
                onMouseEnter={(e) => !isOpen && (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={(e) => !isOpen && (e.currentTarget.style.transform = 'scale(1)')}
                aria-label="Contact Us"
            >
                <Phone size={24} />
            </button>
        </div>
    );
};

export default ContactButton;
