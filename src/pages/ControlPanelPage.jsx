import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';
import { Trash2, UserPlus, Shield, Key } from 'lucide-react';

const ControlPanelPage = () => {
    const { user } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [newEmail, setNewEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    // Grant Access State
    const [accessEmail, setAccessEmail] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [accessMessage, setAccessMessage] = useState('');

    // Special Course Access State
    const [specialEmail, setSpecialEmail] = useState('');
    const [specialCode, setSpecialCode] = useState('');
    const [specialMessage, setSpecialMessage] = useState('');

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

        if (!newEmail) return;

        try {
            const { error } = await supabase
                .from('employees')
                .insert([{ email: newEmail, role: 'editor' }]);

            if (error) throw error;

            setMessage('Employee added successfully!');
            setNewEmail('');
            fetchEmployees();
        } catch (error) {
            setMessage('Error adding employee: ' + error.message);
        }
    };

    const grantAccess = async (e) => {
        e.preventDefault();
        setAccessMessage('');

        if (!accessEmail || !accessCode) return;

        // Split emails by comma or newline, trim whitespace, and filter out empty strings
        const emails = accessEmail
            .split(/[\n,]/)
            .map(email => email.trim())
            .filter(email => email !== '');

        if (emails.length === 0) {
            setAccessMessage('Please enter at least one valid email address.');
            return;
        }

        try {
            // Prepare the data for bulk insertion
            const insertData = emails.map(email => ({
                email: email,
                course_code: accessCode
            }));

            const { error } = await supabase
                .from('student_access')
                .insert(insertData);

            if (error) throw error;

            setAccessMessage(`Access granted successfully to ${emails.length} student(s)!`);
            setAccessEmail('');
        } catch (error) {
            console.error(error);
            setAccessMessage('Error granting access: ' + error.message);
        }
    };

    const grantSpecialAccess = async (e) => {
        e.preventDefault();
        setSpecialMessage('');

        if (!specialEmail || !specialCode) return;

        if (!specialCode.toUpperCase().startsWith('SC')) {
            setSpecialMessage('Error: Special course codes must start with "SC"');
            return;
        }

        // Split emails by comma or newline
        const emails = specialEmail
            .split(/[\n,]/)
            .map(email => email.trim())
            .filter(email => email !== '');

        if (emails.length === 0) {
            setSpecialMessage('Please enter at least one valid email address.');
            return;
        }

        try {
            const insertData = emails.map(email => ({
                email: email,
                course_code: specialCode.toUpperCase()
            }));

            const { error } = await supabase
                .from('student_access')
                .insert(insertData);

            if (error) throw error;

            setSpecialMessage(`Special access granted successfully to ${emails.length} student(s)!`);
            setSpecialEmail('');
            setSpecialCode('');
        } catch (error) {
            console.error(error);
            setSpecialMessage('Error granting special access: ' + error.message);
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
                    Manage access permissions for your team.
                </p>
            </div>

            <div className="course-grid">
                {/* Add Employee Card */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <UserPlus size={20} />
                        Add New Employee
                    </h3>
                    <form onSubmit={addEmployee}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Gmail Address</label>
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="employee@gmail.com"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '1rem'
                                }}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            Grant Access
                        </button>
                        {message && <p style={{ marginTop: '1rem', color: message.includes('Error') ? 'red' : 'green', fontSize: '0.9rem' }}>{message}</p>}
                    </form>
                </div>

                {/* Grant Access Card */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Key size={20} />
                        Grant Course Access
                    </h3>
                    <form onSubmit={grantAccess}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Student Emails (separate by comma or new line)</label>
                            <textarea
                                value={accessEmail}
                                onChange={(e) => setAccessEmail(e.target.value)}
                                placeholder="student1@gmail.com, student2@gmail.com&#10;student3@gmail.com"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '1rem',
                                    minHeight: '100px',
                                    resize: 'vertical'
                                }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Course Code</label>
                            <input
                                type="text"
                                value={accessCode}
                                onChange={(e) => setAccessCode(e.target.value)}
                                placeholder="e.g. EATSFS0126"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '1rem'
                                }}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            Unlock Course
                        </button>
                        {accessMessage && <p style={{ marginTop: '1rem', color: accessMessage.includes('Error') ? 'red' : 'green', fontSize: '0.9rem' }}>{accessMessage}</p>}
                    </form>
                </div>

                {/* Special Course Access Card */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Shield size={20} className="text-primary" />
                        Special Course Access
                    </h3>
                    <form onSubmit={grantSpecialAccess}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Student Emails (comma/newline separated)</label>
                            <textarea
                                value={specialEmail}
                                onChange={(e) => setSpecialEmail(e.target.value)}
                                placeholder="student@gmail.com"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '1rem',
                                    minHeight: '100px',
                                    resize: 'vertical'
                                }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Special Code (Starts with SC)</label>
                            <input
                                type="text"
                                value={specialCode}
                                onChange={(e) => setSpecialCode(e.target.value)}
                                placeholder="e.g. SC-CAREER-01"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    fontSize: '1rem'
                                }}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full" style={{ backgroundColor: 'var(--cc-navy, #002f5d)' }}>
                            Unlock Special Course
                        </button>
                        {specialMessage && <p style={{ marginTop: '1rem', color: specialMessage.includes('Error') ? 'red' : 'green', fontSize: '0.9rem' }}>{specialMessage}</p>}
                    </form>
                </div>

                {/* Employee List Card */}
                <div style={{ gridColumn: '1 / -1', background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Authorized Employees</h3>

                    {loading ? (
                        <p>Loading...</p>
                    ) : employees.length === 0 ? (
                        <p style={{ color: '#888', fontStyle: 'italic' }}>No employees added yet.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {employees.map((emp) => (
                                <div key={emp.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    background: 'var(--color-surface)',
                                    borderRadius: 'var(--radius-md)'
                                }}>
                                    <div>
                                        <p style={{ fontWeight: '600' }}>{emp.email}</p>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            background: '#e0e7ff',
                                            color: '#3730a3',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '1rem',
                                            textTransform: 'capitalize'
                                        }}>
                                            {emp.role}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => removeEmployee(emp.id)}
                                        className="btn"
                                        style={{ color: '#ef4444', padding: '0.5rem' }}
                                        title="Remove Access"
                                    >
                                        <Trash2 size={20} />
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
