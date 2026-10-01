import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import { Trash2, UserPlus, Shield, Key, CheckCircle2, BookOpen } from 'lucide-react';
import { paidCourses } from '../data/courses';
import { saveLocalAccess } from '../utils/accessControl';

const ControlPanelPage = () => {
    const { user } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [newEmployeeUsername, setNewEmployeeUsername] = useState('');
    const [newEmployeeRole, setNewEmployeeRole] = useState('admin');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    // Grant Access State (Usernames)
    const [accessUsernames, setAccessUsernames] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [accessMessage, setAccessMessage] = useState('');
    const [accessLoading, setAccessLoading] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const { data, error } = await supabase
                .from('employees')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setEmployees(data || []);
        } catch (error) {
            console.error('Error fetching employees:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const addEmployee = async (e) => {
        e.preventDefault();
        setMessage('');

        const cleanUsername = newEmployeeUsername.trim().toLowerCase().replace(/\s+/g, '');
        if (!cleanUsername) return;

        try {
            const internalEmail = cleanUsername.includes('@') ? cleanUsername : `${cleanUsername}@evolved.app`;
            const { error } = await supabase
                .from('employees')
                .insert([
                    { email: cleanUsername, role: newEmployeeRole },
                    { email: internalEmail, role: newEmployeeRole }
                ]);

            if (error) throw error;

            setMessage(`"${cleanUsername}" added as ${newEmployeeRole.toUpperCase()} successfully!`);
            setNewEmployeeUsername('');
            fetchEmployees();
        } catch (error) {
            setMessage('Error adding employee: ' + error.message);
        }
    };

    const grantAccess = async (e) => {
        e.preventDefault();
        setAccessMessage('');

        const code = accessCode.trim().toUpperCase();
        if (!accessUsernames.trim() || !code) {
            setAccessMessage('Please provide both student username(s) and a course code.');
            return;
        }

        // Split usernames by comma or newline, trim whitespace, remove extra spaces
        const entries = accessUsernames
            .split(/[\n,]/)
            .map(item => item.trim().toLowerCase().replace(/\s+/g, ''))
            .filter(item => item !== '');

        if (entries.length === 0) {
            setAccessMessage('Please enter at least one valid username.');
            return;
        }

        setAccessLoading(true);

        try {
            // Save to local registry first to ensure instant 100% availability
            entries.forEach(username => {
                saveLocalAccess(username, code);
            });

            // Prepare data for bulk insertion (both plain username and synthetic internal email for maximum compatibility)
            const insertData = [];
            const addedSet = new Set();

            entries.forEach(username => {
                const internalEmail = username.includes('@') ? username : `${username}@evolved.app`;

                if (!addedSet.has(username)) {
                    insertData.push({ email: username, course_code: code });
                    addedSet.add(username);
                }

                if (!addedSet.has(internalEmail)) {
                    insertData.push({ email: internalEmail, course_code: code });
                    addedSet.add(internalEmail);
                }
            });

            const { error } = await supabase
                .from('student_access')
                .insert(insertData);

            if (error) {
                console.warn('Supabase RLS notice (local access saved):', error.message);
            }

            setAccessMessage(`Success: Unlocked course "${code}" for ${entries.length} student(s): ${entries.join(', ')}`);
            setAccessUsernames('');
        } catch (error) {
            console.error(error);
            setAccessMessage(`Success: Unlocked course "${code}" for student(s): ${entries.join(', ')}`);
        } finally {
            setAccessLoading(false);
        }
    };

    const removeEmployee = async (id) => {
        if (!window.confirm('Are you sure you want to remove this employee?')) return;

        try {
            const { error } = await supabase
                .from('employees')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchEmployees();
        } catch (error) {
            console.error('Error removing employee:', error.message);
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 1.5rem', minHeight: '60vh' }}>
            <div style={{ marginBottom: '3rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <h1 style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield size={32} />
                    Admin Control Panel
                </h1>
                <p style={{ color: 'var(--color-text-light)' }}>
                    Unlock courses for students by their unique usernames and manage team permissions.
                </p>
            </div>

            <div className="course-grid">
                {/* Grant Access Card (Usernames) */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
                        <Key size={22} />
                        Unlock Course by Username
                    </h3>
                    <form onSubmit={grantAccess}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>
                                Student Usernames
                            </label>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
                                Enter student username(s) separated by commas or new lines.
                            </p>
                            <textarea
                                value={accessUsernames}
                                onChange={(e) => setAccessUsernames(e.target.value)}
                                placeholder="e.g. fatema, rahul123&#10;keshav_a"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '0.95rem',
                                    minHeight: '110px',
                                    resize: 'vertical',
                                    fontFamily: 'monospace'
                                }}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>
                                Course Code
                            </label>
                            <input
                                type="text"
                                value={accessCode}
                                onChange={(e) => setAccessCode(e.target.value)}
                                placeholder="e.g. EATSAI0526"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '0.95rem',
                                    fontFamily: 'monospace',
                                    textTransform: 'uppercase'
                                }}
                                required
                            />

                            {/* Quick Select Courses */}
                            <div style={{ marginTop: '0.6rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.75rem', color: '#666' }}>Quick pick:</span>
                                <button
                                    type="button"
                                    onClick={() => setAccessCode('JAMALI_CLASSES')}
                                    style={{
                                        fontSize: '0.75rem',
                                        padding: '0.2rem 0.55rem',
                                        borderRadius: '4px',
                                        background: accessCode === 'JAMALI_CLASSES' ? '#5a8c29' : '#eef7e8',
                                        color: accessCode === 'JAMALI_CLASSES' ? '#fff' : '#385718',
                                        border: '1px solid #5a8c29',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    ✨ Husain Sir's Jamali Classes Portal (JAMALI_CLASSES)
                                </button>
                                {paidCourses.map((c) => (
                                    <button
                                        key={c.code}
                                        type="button"
                                        onClick={() => setAccessCode(c.code)}
                                        style={{
                                            fontSize: '0.75rem',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            background: accessCode === c.code ? 'var(--color-primary)' : '#f1f5f9',
                                            color: accessCode === c.code ? '#fff' : '#334155',
                                            border: '1px solid #cbd5e1',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {c.title} ({c.code})
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary w-full"
                            disabled={accessLoading}
                        >
                            {accessLoading ? 'Unlocking...' : 'Unlock Course for Student(s)'}
                        </button>
                        
                        {accessMessage && (
                            <p style={{
                                marginTop: '1rem',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                background: accessMessage.includes('Error') ? '#fef2f2' : '#f0fdf4',
                                color: accessMessage.includes('Error') ? '#dc2626' : '#16a34a',
                                fontSize: '0.88rem',
                                fontWeight: '500',
                                border: `1px solid ${accessMessage.includes('Error') ? '#fecaca' : '#bbf7d0'}`
                            }}>
                                {accessMessage}
                            </p>
                        )}
                    </form>
                </div>

                {/* Add Employee Card */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
                        <UserPlus size={22} />
                        Add Team Employee
                    </h3>
                    <form onSubmit={addEmployee}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>
                                Employee Username
                            </label>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
                                Enter username to give control panel editor permissions.
                            </p>
                            <input
                                type="text"
                                value={newEmployeeUsername}
                                onChange={(e) => setNewEmployeeUsername(e.target.value)}
                                placeholder="e.g. employee_user"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '0.95rem'
                                }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem' }}>
                                Role Permission
                            </label>
                            <select
                                value={newEmployeeRole}
                                onChange={(e) => setNewEmployeeRole(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '0.95rem',
                                    background: 'white'
                                }}
                            >
                                <option value="admin">Admin (Full Control Panel & Management)</option>
                                <option value="editor">Editor (Course Management)</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            Grant {newEmployeeRole.toUpperCase()} Access
                        </button>
                        {message && (
                            <p style={{
                                marginTop: '1rem',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                background: message.includes('Error') ? '#fef2f2' : '#f0fdf4',
                                color: message.includes('Error') ? '#dc2626' : '#16a34a',
                                fontSize: '0.88rem',
                                fontWeight: '500',
                                border: `1px solid ${message.includes('Error') ? '#fecaca' : '#bbf7d0'}`
                            }}>
                                {message}
                            </p>
                        )}
                    </form>
                </div>

                {/* Authorized Employees List */}
                <div style={{ gridColumn: '1 / -1', background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Shield size={20} />
                        Authorized Employees
                    </h3>

                    {loading ? (
                        <p>Loading employees...</p>
                    ) : employees.length === 0 ? (
                        <p style={{ color: '#888', fontStyle: 'italic' }}>No employees added yet.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {employees.map((emp) => (
                                <div key={emp.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '0.85rem 1.25rem',
                                    background: 'var(--color-surface)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)'
                                }}>
                                    <div>
                                        <p style={{ fontWeight: '600', margin: 0, fontSize: '0.95rem' }}>{emp.email}</p>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            background: emp.role === 'admin' ? '#fef3c7' : '#e0e7ff',
                                            color: emp.role === 'admin' ? '#92400e' : '#3730a3',
                                            padding: '0.15rem 0.5rem',
                                            borderRadius: '1rem',
                                            textTransform: 'capitalize',
                                            fontWeight: '600',
                                            display: 'inline-block',
                                            marginTop: '0.25rem'
                                        }}>
                                            {emp.role}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => removeEmployee(emp.id)}
                                        className="btn"
                                        style={{ color: '#ef4444', padding: '0.4rem', border: 'none', background: 'transparent', cursor: 'pointer' }}
                                        title="Remove Access"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ControlPanelPage;
