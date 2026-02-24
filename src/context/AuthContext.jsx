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
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('email', authUser.email)
        .single();

      // If found in employees table, add role property
      if (data) {
        setUser({ ...authUser, role: data.role || 'viewer' });
      } else {
        setUser({ ...authUser, role: 'student' });
      }
    } catch (error) {
      // If error (or not found), default to student
      setUser({ ...authUser, role: 'student' });
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error logging in with Google:", error.message);
      alert("Error logging in: " + error.message);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error logging in with Email:", error.message);
      throw error;
    }
  };

  const signUpWithEmail = async (email, password, fullName) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (error) throw error;
      // alert("Sign up successful! Please check your email for verification."); 
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

  /*
  const deleteAccount = async () => {
    try {
      // Attempt to call a database function to delete the user if it exists
      // This is the standard way to handle safe deletion from the client
      const { error } = await supabase.rpc('delete_user_account');

      if (error) {
        // Fallback: If RPC doesn't exist, just sign out for now to satisfy the UI flow
        // In a real production app, you'd need a backend function for this.
        console.warn("Account deletion RPC not found, signing out instead:", error.message);
        await logout();
      } else {
        await logout();
      }
    } catch (error) {
      console.error("Error deleting account:", error.message);
      throw error;
    }
  };
  */

  const value = {
    isAuthenticated: !!user,
    user,
    loginWithGoogle,
    loginWithEmail,
    signUpWithEmail,
    logout,
    // deleteAccount,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
