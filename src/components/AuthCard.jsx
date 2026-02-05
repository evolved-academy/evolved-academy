import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthCard.css';

const AuthCard = () => {
    const { loginWithGoogle, loginWithEmail, signUpWithEmail } = useAuth();
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isSignUp) {
                await signUpWithEmail(email, password, fullName);
                // Don't navigate, wait for email verification or show message
                setIsSignUp(false); // Switch back to login
            } else {
                await loginWithEmail(email, password);
                navigate('/home');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-card">
            <h2 className="auth-title">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="auth-subtitle">
                {isSignUp ? 'Join us to start learning' : 'Sign in to continue your learning journey'}
            </p>

            {error && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <form onSubmit={handleSubmit} className="auth-form">
                {isSignUp && (
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                </div>

                {!isSignUp && (
                    <div className="form-actions">
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>
                )}

                <button type="submit" className="btn btn-primary w-full">
                    {isSignUp ? 'Sign Up' : 'Log In'}
                </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"} {' '}
                    <button
                        onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-primary)',
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            fontSize: 'inherit'
                        }}
                    >
                        {isSignUp ? 'Log In' : 'Sign Up'}
                    </button>
                </p>
            </div>

            <div className="auth-divider">
                <span>OR</span>
            </div>

            <button onClick={loginWithGoogle} className="btn btn-outline w-full google-btn">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="google-icon" />
                Continue with Google
            </button>
        </div>
    );
};

export default AuthCard;
