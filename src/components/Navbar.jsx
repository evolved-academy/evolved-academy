import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleNavClick = (path) => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate(path);
        }
        setIsMobileMenuOpen(false);
    };

    // Close mobile menu when route changes (for links inside dropdowns)
    React.useEffect(() => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    }, [navigate]);

    const handleMouseEnter = (name) => {
        if (isAuthenticated) setActiveDropdown(name);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    const navLinks = [
        { name: 'Academics', path: '/academics' },
        { name: 'Tech Skills', path: '/tech-skills' },
        { name: 'Non-Tech Skills', path: '/non-tech-skills' },
        { name: 'Library', path: '/library' },
        { name: 'Certifications', path: '/certifications' },
        { name: 'AI Prompts', path: '/ai-prompts' },
        // Only show Control Panel to editors/admins
        ...(user?.role === 'editor' || user?.role === 'admin' ? [{ name: 'Control Panel', path: '/admin' }] : []),
        { name: 'Register Forever', path: '/register' },
    ];

    const renderDropdown = (linkName) => {
        if (linkName === 'Academics') {
            return (
                <div className="dropdown-menu">
                    <div className="dropdown-column">
                        <h4>CBSE</h4>{/* Updated to Class structure */}
                        {['8th', '9th', '10th'].map(cls => (
                            <div key={cls} className="nested-dropdown-trigger">
                                <span>Class {cls}</span>
                                <div className="nested-dropdown">
                                    <Link to={`/academics/cbse/${cls}/maths`}>Maths</Link>
                                    <Link to={`/academics/cbse/${cls}/science`}>Science</Link>
                                    <Link to={`/academics/cbse/${cls}/history`}>History Civics</Link>
                                    <Link to={`/academics/cbse/${cls}/geography`}>Geography</Link>
                                    <Link to={`/academics/cbse/${cls}/english`}>English</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="dropdown-column">
                        <h4>State Board</h4>
                        <div className="nested-dropdown-trigger">
                            <span>Maharashtra</span>
                            <div className="nested-dropdown">
                                <Link to="/academics/state/mh">View Classes</Link>
                            </div>
                        </div>
                        <div className="nested-dropdown-trigger">
                            <span>Gujarat</span>
                            <div className="nested-dropdown">
                                <Link to="/academics/state/gj">View Classes</Link>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (linkName === 'Tech Skills' || linkName === 'Non-Tech Skills') {
            const basePath = linkName === 'Tech Skills' ? '/tech-skills' : '/non-tech-skills';
            return (
                <div className="dropdown-menu">
                    <Link to={`${basePath}/free`}>Free Courses</Link>
                    <Link to={`${basePath}/paid`}>Paid Courses</Link>
                </div>
            );
        }
        if (linkName === 'Library') {
            return (
                <div className="dropdown-menu">
                    <Link to="/library/academics">Academics</Link>
                    <Link to="/library/tech">Tech Skills</Link>
                    <Link to="/library/non-tech">Non-Tech Skills</Link>
                </div>
            );
        }
        return null;
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={logo} alt="EvolvEd Academy" style={{ height: '50px' }} />
                </Link>

                <div className="navbar-links desktop-only">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="nav-item"
                            onMouseEnter={() => handleMouseEnter(link.name)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                onClick={() => handleNavClick(link.path)}
                                className="nav-link"
                            >
                                {link.name}
                                {['Academics', 'Tech Skills', 'Non-Tech Skills', 'Library'].includes(link.name) && isAuthenticated && (
                                    <ChevronDown size={14} style={{ marginLeft: '4px' }} />
                                )}
                            </button>
                            {isAuthenticated && activeDropdown === link.name && renderDropdown(link.name)}
                        </div>
                    ))}
                </div>

                <div className="navbar-auth desktop-only">
                    {isAuthenticated ? (
                        <button onClick={logout} className="btn btn-outline">
                            <LogOut size={18} style={{ marginRight: '8px' }} />
                            Log Out
                        </button>
                    ) : (
                        <Link to="/login" className="btn btn-primary">
                            Sign In / Log In
                        </Link>
                    )}
                </div>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    {navLinks.map((link) => (
                        <div key={link.name} className="mobile-nav-item">
                            {['Academics', 'Tech Skills', 'Non-Tech Skills', 'Library'].includes(link.name) ? (
                                <>
                                    <button
                                        onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                                        className="mobile-nav-link"
                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                    >
                                        {link.name}
                                        <ChevronDown size={16} style={{
                                            transform: activeDropdown === link.name ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.2s'
                                        }} />
                                    </button>
                                    {activeDropdown === link.name && (
                                        <div className="mobile-dropdown-content">
                                            {/* Reuse renderDropdown logic but we might need to adjust styles or structure. 
                                                Since renderDropdown returns a specific structure, we might need a mobile-specific render 
                                                OR we rely on CSS to reset the absolute positioning for .dropdown-menu when inside .mobile-menu */}
                                            {renderDropdown(link.name)}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <button
                                    onClick={() => handleNavClick(link.path)}
                                    className="mobile-nav-link"
                                >
                                    {link.name}
                                </button>
                            )}
                        </div>
                    ))}
                    <div className="mobile-auth">
                        {isAuthenticated ? (
                            <button onClick={logout} className="btn btn-outline w-full">
                                <LogOut size={18} style={{ marginRight: '8px' }} />
                                Log Out
                            </button>
                        ) : (
                            <Link to="/login" className="btn btn-primary w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                Sign In / Log In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
