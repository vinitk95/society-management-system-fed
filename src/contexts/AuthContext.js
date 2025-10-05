import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          apiClient.setToken(storedToken);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (usernameOrEmail, password) => {
    try {
      const response = await apiClient.post('/auth/signin', {
        usernameOrEmail,
        password
      });

      // Handle the login response format: { accessToken, type, id, username, email, firstName, lastName, phone, address, role, roles }
      const { accessToken, id, username, email, firstName, lastName, phone, address, role, roles } = response;
      
      // Create user object from the response
      const userData = {
        id,
        username,
        email,
        firstName,
        lastName,
        phone,
        address,
        role,
        roles
      };
      
      setToken(accessToken);
      setUser(userData);
      apiClient.setToken(accessToken);
      
      localStorage.setItem('authToken', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiClient.post('/auth/signup', userData);
      return { success: true, message: response.message || 'Registration successful' };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    apiClient.clearToken();
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
