import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext.jsx'; // Caminho da importação corrigido

const DataContext = createContext(null);

// --- DADOS INICIAIS PARA TESTE (MOCK) ---
const initialReports = [
  { id: 1, author: 'Cidadão_Atento', type: 'Lâmpada queimada', photo: 'https://placehold.co/600x400/000000/FFFFFF?text=Poste+Apagado', location: { lat: -10.185, lng: -48.330 }, severity: 'Médio', status: 'Recebido', timestamp: Date.now() - 86400000 },
  { id: 2, author: 'Vigilante_da_Rua', type: 'Lixo', photo: 'https://placehold.co/600x400/964B00/FFFFFF?text=Lixo', location: { lat: -10.200, lng: -48.345 }, severity: 'Baixo', status: 'Resolvido', timestamp: Date.now() - 172800000 },
];

const initialUsers = [
  { nickname: 'Cidadão_Atento', points: 10, medals: ['Primeiro Reporte'] },
  { nickname: 'Vigilante_da_Rua', points: 10, medals: ['Primeiro Reporte'] },
];
// --- FIM DOS DADOS INICIAIS ---

export function DataProvider({ children }) {
  const { user } = useAuth();
  const [reports, setReports] = useState(initialReports);
  const [users, setUsers] = useState(initialUsers);

  // Função para adicionar um novo reporte
  const addReport = (newReportData) => {
    if (!user) return; // Garante que o usuário está logado

    const newReport = {
      id: Date.now(),
      author: user.nickname,
      status: 'Recebido',
      timestamp: Date.now(),
      location: { lat: -10.190 + (Math.random() - 0.5) * 0.1, lng: -48.335 + (Math.random() - 0.5) * 0.1 }, // Localização aleatória perto de Palmas
      ...newReportData,
    };

    // Adiciona o novo reporte à lista
    setReports(prevReports => [newReport, ...prevReports]);

    // Lógica de Gamificação
    setUsers(prevUsers => {
      const userIndex = prevUsers.findIndex(u => u.nickname === user.nickname);
      
      // Se o usuário não existe na lista de usuários (primeiro reporte), adicione-o
      if (userIndex === -1) {
          const newUser = { nickname: user.nickname, points: 0, medals: [] };
          prevUsers.push(newUser);
          userIndex = prevUsers.length - 1;
      }
      
      const currentUser = prevUsers[userIndex];

      // 1. Adicionar pontos
      const updatedUser = { ...currentUser, points: currentUser.points + 10 };

      // 2. Verificar medalhas (exemplo simples)
      const userReports = [newReport, ...reports].filter(r => r.author === user.nickname);
      if (userReports.length === 1 && !updatedUser.medals.includes('Primeiro Reporte')) {
        updatedUser.medals.push('Primeiro Reporte');
      }
      if (userReports.filter(r => r.type === 'Buraco').length >= 5 && !updatedUser.medals.includes('Caça-Buracos')) {
        updatedUser.medals.push('Caça-Buracos');
      }

      const newUsers = [...prevUsers];
      newUsers[userIndex] = updatedUser;
      return newUsers;
    });
  };
  
  // Função para obter o ranking
  const getRanking = () => {
    return [...users].sort((a, b) => b.points - a.points);
  };
  
  // Função para obter reportes do usuário logado
  const getUserReports = () => {
    if (!user) return [];
    return reports.filter(r => r.author === user.nickname);
  }

  const value = { reports, users, addReport, getRanking, getUserReports };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}

