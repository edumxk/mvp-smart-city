// src/contexts/DataContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext.jsx';
import { Award, Star, Heart, Shield, Gem, Trash2, Lightbulb } from 'lucide-react';

const DataContext = createContext(null);

export const allAchievements = [
    { id: 'total_reports', title: 'Guardião Iniciante', icon: <Star />, tiers: [ { name: 'Bronze', goal: 1, description: 'Faça seu 1º reporte' }, { name: 'Prata', goal: 5, description: 'Faça 5 reportes' }, { name: 'Ouro', goal: 20, description: 'Faça 20 reportes' }, { name: 'Diamante', goal: 100, description: 'Faça 100 reportes' } ] },
    { id: 'total_likes', title: 'Apoio da Comunidade', icon: <Heart />, tiers: [ { name: 'Bronze', goal: 1, description: 'Receba seu 1º like' }, { name: 'Prata', goal: 10, description: 'Receba 10 likes' }, { name: 'Ouro', goal: 50, description: 'Receba 50 likes' }, { name: 'Diamante', goal: 200, description: 'Receba 200 likes' } ] },
    { id: 'Buraco', title: 'Caça-Buracos', icon: <Shield />, tiers: [ { name: 'Bronze', goal: 5, description: 'Reporte 5 buracos' }, { name: 'Prata', goal: 15, description: 'Reporte 15 buracos' }, { name: 'Ouro', goal: 30, description: 'Reporte 30 buracos' }, { name: 'Diamante', goal: 50, description: 'Reporte 50 buracos' } ] },
    { id: 'Lixo', title: 'Faxineiro Urbano', icon: <Trash2 />, tiers: [ { name: 'Bronze', goal: 5, description: 'Reporte 5 focos de lixo' }, { name: 'Prata', goal: 15, description: 'Reporte 15 focos de lixo' }, { name: 'Ouro', goal: 30, description: 'Reporte 30 focos de lixo' }, { name: 'Diamante', goal: 50, description: 'Reporte 50 focos de lixo' } ] },
    { id: 'Lâmpada queimada', title: 'Vigilante Noturno', icon: <Lightbulb />, tiers: [ { name: 'Bronze', goal: 5, description: 'Reporte 5 lâmpadas' }, { name: 'Prata', goal: 15, description: 'Reporte 15 lâmpadas' }, { name: 'Ouro', goal: 30, description: 'Reporte 30 lâmpadas' }, { name: 'Diamante', goal: 50, description: 'Reporte 50 lâmpadas' } ] },
];

const initialReports = [
    { id: 1, author: 'Cidadão_Atento', type: 'Lâmpada queimada', photo: 'https://placehold.co/600x400/000000/FFFFFF?text=Poste+Apagado', location: { lat: -10.185, lng: -48.330 }, severity: 'Médio', status: 'Recebido', timestamp: Date.now() - 86400000, likes: 5 },
];
const initialUsers = [
  { nickname: 'Cidadão_Atento', points: 15, contact: 'cidadao@email.com', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Cida', achievements: { 'total_reports': { level: 0, progress: 1 }, 'total_likes': { level: 0, progress: 5 } } },
];

export function DataProvider({ children }) {
  const { user } = useAuth();
  const [reports, setReports] = useState(initialReports);
  const [users, setUsers] = useState(initialUsers);
  const [notifications, setNotifications] = useState([]);

  // ... (funções showNotification, checkAndAwardAchievements, addReport, addLike permanecem as mesmas)
    const showNotification = (message, recipientNickname) => {
    const id = Date.now() + Math.random();
    setNotifications(prev => [...prev, { id, message, recipient: recipientNickname }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
  };
    const checkAndAwardAchievements = (currentUser, allUserReports, showNotification) => {
    const userStats = { total_reports: allUserReports.length, total_likes: allUserReports.reduce((acc, report) => acc + report.likes, 0), 'Buraco': allUserReports.filter(r => r.type === 'Buraco').length, 'Lixo': allUserReports.filter(r => r.type === 'Lixo').length, 'Lâmpada queimada': allUserReports.filter(r => r.type === 'Lâmpada queimada').length };
    let updatedAchievements = { ...currentUser.achievements };
    allAchievements.forEach(ach => {
      const currentLevel = updatedAchievements[ach.id]?.level ?? -1;
      const nextTierIndex = currentLevel + 1;
      if (nextTierIndex < ach.tiers.length) {
        const nextTier = ach.tiers[nextTierIndex];
        const userProgress = userStats[ach.id] || 0;
        updatedAchievements[ach.id] = { ...updatedAchievements[ach.id], progress: userProgress };
        if (userProgress >= nextTier.goal) {
          updatedAchievements[ach.id] = { level: nextTierIndex, progress: userProgress };
          showNotification(`Conquista: ${ach.title} ${nextTier.name}!`, currentUser.nickname);
        }
      }
    });
    return updatedAchievements;
  };
    const addReport = (newReportData) => {
    setUsers(prevUsers => {
      let userIndex = prevUsers.findIndex(u => u.nickname === user.nickname);
      const updatedUsers = [...prevUsers];
      if (userIndex === -1) { const newUser = { nickname: user.nickname, points: 0, contact: user.contact, avatar: user.avatar, achievements: {} }; updatedUsers.push(newUser); userIndex = updatedUsers.length - 1; }
      const currentUser = updatedUsers[userIndex];
      const newReport = { id: reports.length + 1, author: user.nickname, status: 'Recebido', timestamp: Date.now(), likes: 0, ...newReportData };
      const updatedReports = [newReport, ...reports];
      setReports(updatedReports);
      const updatedUser = { ...currentUser, points: currentUser.points + 10 };
      const allUserReports = updatedReports.filter(r => r.author === user.nickname);
      updatedUser.achievements = checkAndAwardAchievements(currentUser, allUserReports, showNotification);
      updatedUsers[userIndex] = updatedUser;
      showNotification("+10 Pontos pelo seu reporte!", user.nickname);
      return updatedUsers;
    });
  };
    const addLike = (reportId) => {
    let reportAuthor = null;
    const updatedReports = reports.map(report => { if (report.id === reportId) { reportAuthor = report.author; return { ...report, likes: report.likes + 1 }; } return report; });
    setReports(updatedReports);
    if (reportAuthor) {
      setUsers(prevUsers => {
        const userIndex = prevUsers.findIndex(u => u.nickname === reportAuthor);
        if (userIndex === -1) return prevUsers;
        const updatedUsers = [...prevUsers];
        const currentUser = updatedUsers[userIndex];
        const updatedUser = { ...currentUser, points: currentUser.points + 1 };
        const allUserReports = updatedReports.filter(r => r.author === reportAuthor);
        updatedUser.achievements = checkAndAwardAchievements(currentUser, allUserReports, showNotification);
        updatedUsers[userIndex] = updatedUser;
        if (reportAuthor !== user.nickname) { showNotification(`Seu reporte recebeu um like! +1 Ponto!`, reportAuthor); }
        return updatedUsers;
      });
    }
  };


  // --- NOVA FUNÇÃO PARA RESOLVER REPORTES ---
  const resolveReport = (reportId) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === reportId ? { ...report, status: 'Resolvido' } : report
      )
    );
    showNotification("Reporte marcado como resolvido!", user.nickname);
  };

  const getRanking = () => [...users].sort((a, b) => b.points - a.points);
  const getUserReports = () => reports.filter(r => r.author === user.nickname);

  // Adiciona a nova função ao valor do contexto
  const value = { reports, users, addReport, getRanking, getUserReports, addLike, resolveReport, notifications, allAchievements };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
}