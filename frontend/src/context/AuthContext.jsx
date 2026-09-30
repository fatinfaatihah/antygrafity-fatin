import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUserData } from '../data/demoData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Load stored auth or fallback to demo user
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('kimi_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialUserData; }
    }
    return initialUserData;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('kimi_auth_logged_in') !== 'false';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('kimi_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kimi_auth_user');
    }
    localStorage.setItem('kimi_auth_logged_in', isAuthenticated ? 'true' : 'false');
  }, [user, isAuthenticated]);

  const login = (email, password) => {
    // In demo mode: accept any valid credentials or default demo user
    const loggedInUser = {
      ...initialUserData,
      email: email || initialUserData.email,
      name: email ? email.split('@')[0].toUpperCase() : initialUserData.name
    };
    setUser(loggedInUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const register = (name, email, password) => {
    const newUser = {
      id: Date.now(),
      name: name || "Pengguna Baru",
      email: email,
      dailyGoal: 2000,
      weight: 60,
      activityLevel: "Sedang",
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
