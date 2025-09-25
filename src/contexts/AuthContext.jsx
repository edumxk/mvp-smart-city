import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // IMPORTANTE: O useNavigate() agora funciona porque o AuthProvider
  // será renderizado DENTRO do BrowserRouter em main.jsx
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('vivaCidadeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (nickname) => {
    const userData = { nickname };
    localStorage.setItem('vivaCidadeUser', JSON.stringify(userData));
    setUser(userData);
    navigate('/home');
  };

  const login = (nickname) => {
    const userData = { nickname };
    localStorage.setItem('vivaCidadeUser', JSON.stringify(userData));
    setUser(userData);
    navigate('/home');
  };

  const logout = () => {
    localStorage.removeItem('vivaCidadeUser');
    setUser(null);
    navigate('/onboarding');
  };

  const value = { user, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

