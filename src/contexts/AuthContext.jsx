// src/contexts/AuthContext.jsx
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

  // --- ATUALIZADO: register agora aceita mais dados ---
  const register = (nickname, avatar, contact) => {
    // Em um app real, aqui você verificaria se o nickname já existe
    const userData = { nickname, avatar, contact };
    localStorage.setItem('vivaCidadeUser', JSON.stringify(userData));
    setUser(userData);
    navigate('/home');
  };

  const login = (nickname) => {
    // Em um app real, você buscaria os dados do usuário no backend
    // Para nossa simulação, vamos criar um usuário "genérico" ao logar
    const userData = { 
      nickname, 
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${nickname}`,
      contact: ''
    };
    localStorage.setItem('vivaCidadeUser', JSON.stringify(userData));
    setUser(userData);
    navigate('/home');
  };

  const logout = () => {
    localStorage.removeItem('vivaCidadeUser');
    setUser(null);
    navigate('/onboarding'); // Redireciona para a tela inicial
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