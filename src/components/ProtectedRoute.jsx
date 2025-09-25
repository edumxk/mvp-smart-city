import React from 'react';
import { Navigate } from 'react-router-dom';
// CORREÇÃO: O caminho da importação foi ajustado para incluir a extensão do arquivo.
import { useAuth } from '../contexts/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // Se não houver usuário, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se houver usuário, renderiza o componente filho (a página protegida)
  return children;
}

