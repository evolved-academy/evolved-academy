import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AcademicsPage = React.lazy(() => import('./pages/AcademicsPage'));
const TechSkillsPage = React.lazy(() => import('./pages/TechSkillsPage'));
const LibraryPage = React.lazy(() => import('./pages/LibraryPage'));
const CertificationsPage = React.lazy(() => import('./pages/CertificationsPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const AIPromptsPage = React.lazy(() => import('./pages/AIPromptsPage'));
const ControlPanelPage = React.lazy(() => import('./pages/ControlPanelPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

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
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
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

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
