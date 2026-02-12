import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, signup as apiSignup } from '../services/userService';
import Loader from '../components/Loader';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('primetrade_user');
    if (storedUser) {
      try {
          setUser(JSON.parse(storedUser));
      } catch (e) {
          console.error("Failed to parse stored user", e);
          localStorage.removeItem('primetrade_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await apiLogin({ email, password });
      const userData = data.user || data; 
      setUser(userData);
      localStorage.setItem('primetrade_user', JSON.stringify(userData));
      // Backend sets cookie, no token returned
      return data;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const data = await apiSignup({ email, password, name });
      const userData = data.user || data;
      setUser(userData);
      localStorage.setItem('primetrade_user', JSON.stringify(userData));
       // Backend sets cookie, no token returned
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('primetrade_user');
    localStorage.removeItem('primetrade_token');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
