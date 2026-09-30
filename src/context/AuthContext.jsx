import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        checkEmployeeRole(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        checkEmployeeRole(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkEmployeeRole = async (authUser) => {
    try {
      const username = authUser.user_metadata?.username || (authUser.email ? authUser.email.split('@')[0] : '');
      const userWithUsername = { ...authUser, username };

      const emailQuery = authUser.email ? `email.ilike.${authUser.email}` : '';
      const usernameQuery = username ? `email.ilike.${username}` : '';
      const orCondition = [emailQuery, usernameQuery].filter(Boolean).join(',');

      let query = supabase.from('employees').select('*');
      if (orCondition) {
        query = query.or(orCondition);
      }
      const { data, error } = await query.limit(1);

      if (error) {
        console.error('Error fetching employee role:', error);
      }

      if (data && data.length > 0) {
        setUser({ ...userWithUsername, role: data[0].role || 'viewer' });
      } else {
        setUser({ ...userWithUsername, role: 'student' });
      }
    } catch (error) {
      console.error('Error in checkEmployeeRole:', error);
      const username = authUser.user_metadata?.username || (authUser.email ? authUser.email.split('@')[0] : '');
      setUser({ ...authUser, username, role: 'student' });
    } finally {
      setLoading(false);
    }
  };

  const formatUsernameToEmail = (username) => {
    const clean = username.trim().toLowerCase().replace(/\s+/g, '');
    if (clean.includes('@')) return clean;
    return `${clean}@evolved.app`;
  };

  const loginWithUsername = async (username, password) => {
    const cleanUsername = username.trim().toLowerCase().replace(/\s+/g, '');
    const internalEmail = formatUsernameToEmail(cleanUsername);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: internalEmail,
        password,
      });
      if (error) {
        if (error.code === 'email_not_confirmed' || error.message?.toLowerCase().includes('email not confirmed')) {
          throw new Error("Please disable 'Confirm email' in Supabase Dashboard (Authentication > Providers > Email) to allow instant username logins.");
        }
        throw new Error("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error;
    }
  };

  const signUpWithUsername = async (username, password, fullName) => {
    const cleanUsername = username.trim().toLowerCase().replace(/\s+/g, '');
    const internalEmail = formatUsernameToEmail(cleanUsername);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: internalEmail,
        password,
        options: {
          data: {
            username: cleanUsername,
            full_name: fullName,
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered") || error.status === 422) {
          throw new Error(`Username "${cleanUsername}" is already taken. Please choose another username.`);
        }
        throw error;
      }

      // If session was not established automatically (e.g. Supabase confirmation settings), sign in directly
      if (!data?.session) {
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email: internalEmail,
          password,
        });
        if (signInErr) {
          if (signInErr.code === 'email_not_confirmed' || signInErr.message?.toLowerCase().includes('email not confirmed')) {
            throw new Error("Instant username sign-up requires 'Confirm email' to be turned OFF in your Supabase project (Authentication -> Providers -> Email).");
          }
          throw signInErr;
        }
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const value = {
    isAuthenticated: !!user,
    user,
    loginWithUsername,
    signUpWithUsername,
    loginWithEmail: loginWithUsername,
    signUpWithEmail: signUpWithUsername,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
