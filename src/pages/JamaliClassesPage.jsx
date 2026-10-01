import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import jamaliLogo from '../assets/jamali_classes_logo.png';
import { 
  ArrowLeft, 
  Maximize2, 
  Minimize2, 
  BookOpen, 
  Video, 
  Award, 
  FileText, 
  GraduationCap, 
  Users, 
  ChevronRight, 
  CheckCircle2, 
  PhoneCall, 
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Layers,
  Globe
} from 'lucide-react';
import './JamaliClassesPage.css';

const JamaliClassesPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isWindowedMode, setIsWindowedMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [activeBoard, setActiveBoard] = useState('cbse');

  const handleReturnToEvolvEd = () => {
    navigate('/home');
  };

  const jamaliCourses = [
    {
      id: 'jc-math-10',
      title: "Husain Sir's Class 10 CBSE Mathematics",
      subtitle: "Comprehensive Board Exam Preparation & Mastery",
      category: "CBSE Class 10",
      icon: <GraduationCap size={24} />,
      lessons: 48,
      duration: "120 Hours"
    },
    {
      id: 'jc-science-10',
      title: "Class 10 Physics & Chemistry Intensive",
      subtitle: "Conceptual depth with numerical problem solving",
      category: "CBSE Class 10",
      icon: <BookOpen size={24} />,
      lessons: 42,
      duration: "100 Hours"
    },
    {
      id: 'jc-aptitude-olympiad',
      title: "Aptitude & Competitive STEM Olympiad",
      subtitle: "Logical reasoning and advance problem solving techniques",
      category: "Competitive Prep",
      icon: <Award size={24} />,
      lessons: 30,
      duration: "75 Hours"
    },
    {
      id: 'jc-live-mentorship',
      title: "Husain Sir's Weekly Live Interactive Mentorship",
      subtitle: "Doubts solving, strategy, and personal coaching",
      category: "Live Sessions",
      icon: <Video size={24} />,
      lessons: "Weekly Live",
      duration: "Ongoing"
    }
  ];

  const renderNavbar = () => (
    <nav className="jamali-navbar">
      <div className="jamali-navbar-content">
        <div className="jamali-brand-group">
          <img src={jamaliLogo} alt="Husain Sir's Jamali Classes" className="jamali-logo-img" />
          <span className="jamali-badge-tag">Portal Access</span>
        </div>

        <div className="jamali-nav-menu">
          <button 
            className={`jamali-nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Dashboard
          </button>
          <button 
            className={`jamali-nav-link ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            Jamali Courses
          </button>
          <button 
            className={`jamali-nav-link ${activeTab === 'academics' ? 'active' : ''}`}
            onClick={() => setActiveTab('academics')}
          >
            CBSE & State Boards
          </button>
          <button 
            className={`jamali-nav-link ${activeTab === 'vault' ? 'active' : ''}`}
            onClick={() => setActiveTab('vault')}
          >
            Resource Vault
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={handleReturnToEvolvEd}
            className="jamali-btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem' }}
          >
            <ArrowLeft size={16} /> Exit to EvolvEd
          </button>
        </div>
      </div>
    </nav>
  );

  const renderPortalContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {renderNavbar()}

      {/* Hero Banner */}
      <section className="jamali-hero">
        <div className="jamali-hero-inner">
          <div className="jamali-hero-pill">
            <Sparkles size={16} /> Husain Sir's Specialized Learning Portal
          </div>
          <h1 className="jamali-hero-title">
            Husain Sir's Jamali Classes
          </h1>
          <p className="jamali-hero-subtitle">
            Welcome to your customized learning environment! Designed with custom UI/UX branding to deliver conceptual mastery, rigorous practice, and direct mentorship.
          </p>
          <div className="jamali-hero-cta">
            <button 
              className="jamali-btn-primary"
              onClick={() => setActiveTab('courses')}
            >
              Explore Jamali Modules <ChevronRight size={18} />
            </button>
            <button 
              className="jamali-btn-secondary"
              onClick={() => setActiveTab('vault')}
            >
              <FileText size={18} style={{ marginRight: '6px' }} /> Download Study Materials
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Body / 4 Cards Section */}
      <main className="jamali-dashboard-body">
        <div className="jamali-section-header">
          <h2 className="jamali-section-title">Exclusive Jamali Dashboard</h2>
          <p className="jamali-section-desc">
            Website-inside-website portal customized exclusively for selective Jamali Classes students
          </p>
        </div>

        {/* 4 Dashboard Cards Cloned with Jamali Theme */}
        <div className="jamali-cards-grid">
          <div className="jamali-card" onClick={() => setActiveTab('courses')}>
            <div>
              <div className="jamali-card-icon-wrapper">
                <BookOpen size={26} />
              </div>
              <h3>Continue Learning</h3>
              <p>Pick up where you left off in Husain Sir's conceptual lectures and active modules.</p>
            </div>
            <div className="jamali-card-footer">
              <span>Access Modules</span>
              <ChevronRight size={16} />
            </div>
          </div>

          <div className="jamali-card" onClick={() => setActiveTab('academics')}>
            <div>
              <div className="jamali-card-icon-wrapper">
                <GraduationCap size={26} />
              </div>
              <h3>Board Preparation</h3>
              <p>CBSE & State Board special preparation, sample questions, and step-by-step solutions.</p>
            </div>
            <div className="jamali-card-footer">
              <span>View Syllabi</span>
              <ChevronRight size={16} />
            </div>
          </div>

          <div className="jamali-card" onClick={() => setActiveTab('vault')}>
            <div>
              <div className="jamali-card-icon-wrapper">
                <FileText size={26} />
              </div>
              <h3>Resource Vault</h3>
              <p>Exclusive PDF notes, formula sheets, assignment keys, and practice test papers.</p>
            </div>
            <div className="jamali-card-footer">
              <span>Open Vault</span>
              <ChevronRight size={16} />
            </div>
          </div>

          <div className="jamali-card" onClick={() => alert("Connecting to Husain Sir's Live Mentorship Session...")}>
            <div>
              <div className="jamali-card-icon-wrapper">
                <Video size={26} />
              </div>
              <h3>Live Interactive Classes</h3>
              <p>Join live webinars, doubt clearance sessions, and interactive problem solving with Husain Sir.</p>
            </div>
            <div className="jamali-card-footer">
              <span>Join Session</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>

        {/* Active Tab Content Area */}
        {activeTab === 'home' && (
          <div className="jamali-modules-section">
            <h3 style={{ fontSize: '1.4rem', color: '#1e330e', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={22} style={{ color: '#5a8c29' }} /> Featured Jamali Course Modules
            </h3>
            {jamaliCourses.map(course => (
              <div key={course.id} className="jamali-module-item">
                <div className="jamali-module-info">
                  <div style={{ background: '#eef7e8', color: '#5a8c29', padding: '0.75rem', borderRadius: '10px' }}>
                    {course.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b' }}>{course.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: '#64748b' }}>{course.subtitle}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className="jamali-module-badge">{course.category}</span>
                  <button 
                    className="jamali-btn-primary" 
                    style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                    onClick={() => alert(`Launching ${course.title}...`)}
                  >
                    Start Module
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="jamali-modules-section">
            <h3 style={{ fontSize: '1.5rem', color: '#1e330e', marginBottom: '1.5rem' }}>
              All Available Jamali Modules
            </h3>
            <div className="course-grid">
              {jamaliCourses.map(c => (
                <div key={c.id} className="jamali-card" style={{ height: '100%' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <span className="jamali-module-badge">{c.category}</span>
                    <h3 style={{ marginTop: '0.75rem', fontSize: '1.25rem' }}>{c.title}</h3>
                    <p>{c.subtitle}</p>
                  </div>
                  <button 
                    className="jamali-btn-primary" 
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => alert(`Enrolling in ${c.title}...`)}
                  >
                    Open Course
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'academics' && (
          <div className="jamali-modules-section">
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.75rem' }}>
              <button 
                style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', border: 'none', background: activeBoard === 'cbse' ? '#5a8c29' : '#f1f5f9', color: activeBoard === 'cbse' ? 'white' : '#334155', fontWeight: '600' }}
                onClick={() => setActiveBoard('cbse')}
              >
                CBSE Board (Classes 8th - 10th)
              </button>
              <button 
                style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', border: 'none', background: activeBoard === 'state' ? '#5a8c29' : '#f1f5f9', color: activeBoard === 'state' ? 'white' : '#334155', fontWeight: '600' }}
                onClick={() => setActiveBoard('state')}
              >
                State Boards (MH & GJ)
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {activeBoard === 'cbse' ? (
                ['Class 8th', 'Class 9th', 'Class 10th'].map(cls => (
                  <div key={cls} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', background: '#f8faf6' }}>
                    <h4 style={{ color: '#1e330e', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{cls} - Jamali Syllabus</h4>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem', color: '#475569', fontSize: '0.9rem' }}>
                      <li style={{ padding: '0.3rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="#5a8c29" /> Mathematics In-Depth</li>
                      <li style={{ padding: '0.3rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="#5a8c29" /> Science & Physics Concepts</li>
                      <li style={{ padding: '0.3rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="#5a8c29" /> Chapter-wise Test Series</li>
                    </ul>
                    <button className="jamali-btn-secondary" style={{ width: '100%', color: '#385718', borderColor: '#5a8c29' }}>Explore Class</button>
                  </div>
                ))
              ) : (
                ['Maharashtra State Board', 'Gujarat State Board'].map(board => (
                  <div key={board} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', background: '#f8faf6' }}>
                    <h4 style={{ color: '#1e330e', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{board}</h4>
                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>Tailored curriculum matching local board exam guidelines.</p>
                    <button className="jamali-btn-secondary" style={{ width: '100%', color: '#385718', borderColor: '#5a8c29' }}>Explore Board Materials</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'vault' && (
          <div className="jamali-modules-section">
            <h3 style={{ fontSize: '1.4rem', color: '#1e330e', marginBottom: '1rem' }}>
              📥 Jamali Resource Vault & Question Papers
            </h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Download exclusive PDFs, sample papers, and revision notes curated by Husain Sir.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Class 10 Board Specimen Question Paper 2026', 'Class 10 Physics Important Formulae & Diagrams', 'Class 9 Algebra Formulae & Problem Sets', 'Mental Ability & STEM Reasoning Worksheet'].map((doc, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', border: '1px solid #e2ece0', borderRadius: '10px', background: '#ffffff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FileText size={20} color="#5a8c29" />
                    <span style={{ fontWeight: '600', color: '#334155' }}>{doc}</span>
                  </div>
                  <button className="jamali-btn-primary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }} onClick={() => alert(`Downloading ${doc}...`)}>
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Jamali Footer */}
      <footer className="jamali-footer">
        <div className="jamali-footer-content">
          <div className="jamali-footer-brand">
            <img src={jamaliLogo} alt="Jamali Classes" />
            <p>
              Husain Sir's Jamali Classes is an exclusive educational initiative dedicated to building strong fundamentals and analytical problem-solving skills for students.
            </p>
          </div>

          <div className="jamali-footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home" onClick={() => setActiveTab('home')}>Portal Dashboard</a></li>
              <li><a href="#courses" onClick={() => setActiveTab('courses')}>Jamali Modules</a></li>
              <li><a href="#academics" onClick={() => setActiveTab('academics')}>CBSE & State Syllabi</a></li>
              <li><a href="#vault" onClick={() => setActiveTab('vault')}>Download Vault</a></li>
            </ul>
          </div>

          <div className="jamali-footer-col">
            <h4>Portal Support</h4>
            <ul>
              <li><a href="#contact" onClick={handleReturnToEvolvEd}>EvolvEd Main Platform</a></li>
              <li><a href="#help" onClick={() => alert("Contact Husain Sir's Desk: support@jamaliclasses.app")}>Help & Mentorship Desk</a></li>
            </ul>
          </div>
        </div>

        <div className="jamali-footer-bottom">
          <p>© {new Date().getFullYear()} Husain Sir's Jamali Classes. All Rights Reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Globe size={15} /> Website-inside-Website Portal Mode Active
          </p>
        </div>
      </footer>
    </div>
  );

  return (
    <div className={`jamali-portal-container ${isWindowedMode ? 'windowed-mode' : ''}`}>
      <SEO 
        title="Husain Sir's Jamali Classes Portal | EvolvEd Academy"
        description="Exclusive Jamali Classes website portal with custom UI/UX design and specialized learning resources."
      />

      {/* Top Controls Bar (Switch between Fullscreen & Windowed Frame Mode) */}
      <div className="jamali-browser-bar">
        <div className="jamali-browser-dots">
          <span className="jamali-browser-dot red"></span>
          <span className="jamali-browser-dot yellow"></span>
          <span className="jamali-browser-dot green"></span>
          <span style={{ fontSize: '0.82rem', marginLeft: '0.5rem', fontWeight: '600', color: '#e2ece0', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Globe size={14} color="#a3e635" /> Husain Sir's Jamali Classes Clone
          </span>
        </div>

        <div className="jamali-browser-url">
          🔒 https://jamali-classes.evolved.app/portal
        </div>

        <div className="jamali-browser-controls">
          <button 
            className="jamali-btn-mode-toggle"
            onClick={() => setIsWindowedMode(!isWindowedMode)}
            title="Toggle Windowed Frame UI/UX View"
          >
            {isWindowedMode ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
            {isWindowedMode ? 'Full Screen' : 'Window Frame View'}
          </button>

          <button 
            className="jamali-btn-exit"
            onClick={handleReturnToEvolvEd}
          >
            <ArrowLeft size={14} /> Return to EvolvEd
          </button>
        </div>
      </div>

      {/* Main View Container */}
      {isWindowedMode ? (
        <div className="jamali-browser-frame">
          {renderPortalContent()}
        </div>
      ) : (
        renderPortalContent()
      )}
    </div>
  );
};

export default JamaliClassesPage;
