import React from 'react';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { Check, Star, Zap, Crown } from 'lucide-react';

const RegisterPage = () => {
    const { upgradeToPremium, user } = useAuth();

    const handlePayment = (planName, price) => {
        if (user?.isPremium) {
            alert("You are already a Premium member!");
            return;
        }

        const confirmPayment = window.confirm(`Proceed to pay ${price} for the ${planName} plan via Mock Payment Gateway?`);

        if (confirmPayment) {
            // Simulate API call/processing
            setTimeout(() => {
                upgradeToPremium();
                alert(`Payment Successful! Welcome to the ${planName} plan. You are now a Premium member.`);
            }, 1000);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <SEO
                title="Join Us | EvolvEd Academy Registration"
                description="Sign up for EvolvEd Academy today. Unlock access to premium courses, library resources, and AI tools."
            />
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                    Invest in Your Evolution... One Pass, Unlimited Access!
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
                    Unlock every course from EvolvEd! Choose the plan that fits your journey.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                alignItems: 'start'
            }}>
                {/* Card 1: The Starter */}
                <div style={{
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid var(--color-border)'
                }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Monthly Access</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                        ₹799 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--color-text-light)' }}>/ month</span>
                    </div>
                    <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                        Perfect for short-term learning goals!
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
                            <Check size={18} color="green" style={{ marginRight: '10px' }} /> Full access for 30 days
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
                            <Check size={18} color="green" style={{ marginRight: '10px' }} /> Notes & PDF Library included
                        </li>
                    </ul>
                    <button
                        className="btn btn-outline w-full"
                        onClick={() => handlePayment('Monthly Access', '₹799')}
                    >
                        Get Started
                    </button>
                </div>

                {/* Card 2: The Commit (Most Popular) */}
                <div style={{
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-lg)',
                    border: '2px solid var(--color-primary)',
                    position: 'relative',
                    transform: 'scale(1.05)',
                    zIndex: 1
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'var(--color-primary)',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                    }}>
                        MOST POPULAR
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Yearly Access <Zap size={20} fill="gold" color="gold" />
                    </h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                        ₹5,999 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--color-text-light)' }}>/ year</span>
                    </div>
                    <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                        Commit to a year of serious growth!
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
                            <Check size={18} color="green" style={{ marginRight: '10px' }} /> Full access for 365 days
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
                            <Check size={18} color="green" style={{ marginRight: '10px' }} /> Priority support
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
                            <Check size={18} color="green" style={{ marginRight: '10px' }} /> Certification included
                        </li>
                    </ul>
                    <button
                        className="btn btn-primary w-full"
                        onClick={() => handlePayment('Yearly Access', '₹5,999')}
                    >
                        Join for a Year
                    </button>
                </div>

                {/* Card 3: The Lifer */}
                <div style={{
                    background: 'linear-gradient(135deg, #fff 0%, #f9f9f9 100%)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid var(--color-accent)'
                }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Lifetime Access <Crown size={20} color="var(--color-accent)" />
                    </h3>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                        ₹9,999 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--color-text-light)' }}>One-time</span>
                    </div>
                    <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                        Never pay again, Learn forever!
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
                            <Check size={18} color="green" style={{ marginRight: '10px' }} /> Unlimited lifetime access
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
                            <Check size={18} color="green" style={{ marginRight: '10px' }} /> VIP Community Access
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
                            <Check size={18} color="green" style={{ marginRight: '10px' }} /> Direct Mentor Support
                        </li>
                    </ul>
                    <button
                        className="btn w-full"
                        style={{ background: 'var(--color-accent)', color: 'white', border: 'none' }}
                        onClick={() => handlePayment('Lifetime Access', '₹9,999')}
                    >
                        Get Lifetime Access
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
