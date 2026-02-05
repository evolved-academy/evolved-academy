import React from 'react';
import AuthCard from '../components/AuthCard';

const LoginPage = () => {
    return (
        <div className="login-page" style={{
            minHeight: 'calc(100vh - 80px - 200px)', // Adjust for navbar and footer
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'linear-gradient(135deg, var(--color-surface) 0%, #e6f0fa 100%)'
        }}>
            <AuthCard />
        </div>
    );
};

export default LoginPage;
