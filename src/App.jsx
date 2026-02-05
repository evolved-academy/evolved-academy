import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AcademicsPage from './pages/AcademicsPage';
import TechSkillsPage from './pages/TechSkillsPage';
import LibraryPage from './pages/LibraryPage';
import CertificationsPage from './pages/CertificationsPage';
import RegisterPage from './pages/RegisterPage';
import AIPromptsPage from './pages/AIPromptsPage';
import ControlPanelPage from './pages/ControlPanelPage';

// Protected Route Component
const ProtectedRoute = ({ children, requireHost }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (requireHost && user?.role !== 'editor' && user?.role !== 'admin') {
    // If not employee (editor/admin), redirect to home
    return <Navigate to="/home" />;
  }
  return children;
};

// Public Route Component (redirects to home if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <AuthProvider>
        <Router>
          <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Routes>
                <Route path="/" element={
                  <PublicRoute>
                    <LandingPage />
                  </PublicRoute>
                } />
                <Route path="/login" element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                } />
                <Route path="/home" element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                } />

                {/* Feature Routes */}
                <Route path="/academics/*" element={
                  <ProtectedRoute>
                    <AcademicsPage />
                  </ProtectedRoute>
                } />
                <Route path="/tech-skills/*" element={
                  <ProtectedRoute>
                    <TechSkillsPage />
                  </ProtectedRoute>
                } />
                <Route path="/non-tech-skills/*" element={
                  <ProtectedRoute>
                    <TechSkillsPage /> {/* Reusing TechSkills layout for now as requested */}
                  </ProtectedRoute>
                } />
                <Route path="/library/*" element={
                  <ProtectedRoute>
                    <LibraryPage />
                  </ProtectedRoute>
                } />
                <Route path="/certifications" element={
                  <ProtectedRoute>
                    <CertificationsPage />
                  </ProtectedRoute>
                } />
                <Route path="/register" element={
                  <ProtectedRoute>
                    <RegisterPage />
                  </ProtectedRoute>
                } />
                <Route path="/ai-prompts" element={
                  <ProtectedRoute>
                    <AIPromptsPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute requireHost={true}>
                    <ControlPanelPage />
                  </ProtectedRoute>
                } />

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </AuthProvider>
  );
}

export default App;
