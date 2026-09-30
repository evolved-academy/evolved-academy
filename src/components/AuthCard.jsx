import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthCard.css';

const AuthCard = () => {
    const { loginWithUsername, signUpWithUsername } = useAuth();
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        const cleanUsername = username.trim().toLowerCase();
        if (!cleanUsername) {
            setError('Please enter a username.');
            return;
        }

        if (cleanUsername.length < 3) {
            setError('Username must be at least 3 characters long.');
            return;
        }

        if (!/^[a-zA-Z0-9_.-]+$/.test(cleanUsername)) {
            setError('Username can only contain letters, numbers, underscores, and hyphens (no spaces).');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            if (isSignUp) {
                await signUpWithUsername(cleanUsername, password, fullName);
                navigate('/home');
            } else {
                await loginWithUsername(cleanUsername, password);
                navigate('/home');
            }
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="auth-card">
            <h2 className="auth-title">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="auth-subtitle">
                {isSignUp ? 'Choose a unique username to start learning' : 'Sign in with your username to continue'}
            </p>

            {error && <p className="error-message" style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: '500' }}>{error}</p>}
            {message && <p className="success-message" style={{ color: '#10b981', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: '500' }}>{message}</p>}

            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="e.g. john123"
                        required
                        autoComplete="username"
                    />
                </div>

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
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        autoComplete={isSignUp ? "new-password" : "current-password"}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '0.5rem' }}>
                    {isSignUp ? 'Create Account' : 'Log In'}
                </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"} {' '}
                    <button
                        onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
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
        </div>
    );
};

export default AuthCard;
