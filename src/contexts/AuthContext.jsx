import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('vivaCidadeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Funções simplificadas: apenas gerenciam o estado da sessão
  const login = (userData) => {
    localStorage.setItem('vivaCidadeUser', JSON.stringify(userData));
    setUser(userData);
    navigate('/home');
  };

  const logout = () => {
    localStorage.removeItem('vivaCidadeUser');
    setUser(null);
    navigate('/onboarding');
  };

  // A função de registro agora é a mesma que login, pois a criação do usuário
  // acontece na página de registro antes de chamar esta função.
  const register = (userData) => {
    login(userData);
  };

  const value = { user, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

