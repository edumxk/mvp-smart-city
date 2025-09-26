import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext.jsx';
import { Award, Star, Heart, Shield, Gem, Trash2, Lightbulb } from 'lucide-react';

const DataContext = createContext(null);

export const allAchievements = [
  { id: 'total_reports', title: 'Guardião Iniciante', icon: <Star />, tiers: [{ name: 'Bronze', goal: 1, description: 'Faça seu 1º reporte' }, { name: 'Prata', goal: 5, description: 'Faça 5 reportes' }, { name: 'Ouro', goal: 20, description: 'Faça 20 reportes' }, { name: 'Diamante', goal: 100, description: 'Faça 100 reportes' }] }, { id: 'total_likes', title: 'Apoio da Comunidade', icon: <Heart />, tiers: [{ name: 'Bronze', goal: 1, description: 'Receba seu 1º like' }, { name: 'Prata', goal: 10, description: 'Receba 10 likes' }, { name: 'Ouro', goal: 50, description: 'Receba 50 likes' }, { name: 'Diamante', goal: 200, description: 'Receba 200 likes' }] }, { id: 'Buraco', title: 'Caça-Buracos', icon: <Shield />, tiers: [{ name: 'Bronze', goal: 5, description: 'Reporte 5 buracos' }, { name: 'Prata', goal: 15, description: 'Reporte 15 buracos' }, { name: 'Ouro', goal: 30, description: 'Reporte 30 buracos' }, { name: 'Diamante', goal: 50, description: 'Reporte 50 buracos' }] }, { id: 'Lixo', title: 'Faxineiro Urbano', icon: <Trash2 />, tiers: [{ name: 'Bronze', goal: 5, description: 'Reporte 5 focos de lixo' }, { name: 'Prata', goal: 15, description: 'Reporte 15 focos de lixo' }, { name: 'Ouro', goal: 30, description: 'Reporte 30 focos de lixo' }, { name: 'Diamante', goal: 50, description: 'Reporte 50 focos de lixo' }] }, { id: 'Lâmpada queimada', title: 'Vigilante Noturno', icon: <Lightbulb />, tiers: [{ name: 'Bronze', goal: 5, description: 'Reporte 5 lâmpadas' }, { name: 'Prata', goal: 15, description: 'Reporte 15 lâmpadas' }, { name: 'Ouro', goal: 30, description: 'Reporte 30 lâmpadas' }, { name: 'Diamante', goal: 50, description: 'Reporte 50 lâmpadas' }] },
];


// --- DATASEED: PERSONAS E REPORTES INICIAIS ---

const initialUsers = [
  {
    nickname: 'Joao_Motoboy',
    contact: 'joao.silva@email.com',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=JoaoSilva',
    points: 100, // (4 reports * 10) + 60 likes
    achievements: {
      'total_reports': { level: 0, progress: 4 },
      'total_likes': { level: 2, progress: 60 },
      'Buraco': { level: -1, progress: 2 },
      'Lixo': { level: -1, progress: 1 },
      'Lâmpada queimada': { level: -1, progress: 1 },
    }
  },
  {
    nickname: 'Profa_Claudia',
    contact: 'claudia.mendes@email.com',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ClaudiaMendes',
    points: 158, // (5 reports * 10) + 108 likes
    achievements: {
      'total_reports': { level: 1, progress: 5 },
      'total_likes': { level: 2, progress: 108 },
      'Buraco': { level: -1, progress: 1 },
      'Lixo': { level: -1, progress: 2 },
      'Lâmpada queimada': { level: -1, progress: 2 },
    }
  },
  {
    nickname: 'Roberto_Inova',
    contact: 'roberto.almeida@email.com',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=RobertoAlmeida',
    points: 86, // (3 reports * 10) + 56 likes
    achievements: {
      'total_reports': { level: 0, progress: 3 },
      'total_likes': { level: 2, progress: 56 },
      'Buraco': { level: -1, progress: 1 },
      'Lixo': { level: -1, progress: 1 },
      'Lâmpada queimada': { level: -1, progress: 1 },
    }
  },
];

const initialReports = [
  // --- Reportes do João Silva (Taquaralto) ---
  { id: 1, author: 'Joao_Motoboy', type: 'Buraco', photo: 'https://media.istockphoto.com/id/157743690/pt/foto/perigoso-buraco-de-estrada-na-estrada.jpg?s=1024x1024&w=is&k=20&c=B4444DGJx1z_Ff2f9i_GM7YiCJ-SQWeW7ZCozf0sWBo=', location: { lat: -10.3235, lng: -48.2911 }, severity: 'Médio', status: 'Recebido', timestamp: Date.now() - 86400000, likes: 12 },
  { id: 2, author: 'Joao_Motoboy', type: 'Lâmpada queimada', photo: 'https://images.pexels.com/photos/220023/pexels-photo-220023.jpeg?auto=compress&cs=tinysrgb&w=600', location: { lat: -10.3281, lng: -48.2954 }, severity: 'Alto', status: 'Recebido', timestamp: Date.now() - 172800000, likes: 25 },
  { id: 3, author: 'Joao_Motoboy', type: 'Buraco', photo: 'https://media.istockphoto.com/id/586178792/pt/foto/hole-in-the-road-filled-with-water.jpg?s=1024x1024&w=is&k=20&c=E29l4cA71rNHgtXe318j6w1PWN0GUn630AQdzPFGha4=', location: { lat: -10.3352, lng: -48.3001 }, severity: 'Baixo', status: 'Resolvido', timestamp: Date.now() - 259200000, likes: 8 },
  { id: 4, author: 'Joao_Motoboy', type: 'Lixo', photo: 'https://images.pexels.com/photos/3467431/pexels-photo-3467431.jpeg?auto=compress&cs=tinysrgb&w=600', location: { lat: -10.3299, lng: -48.2987 }, severity: 'Médio', status: 'Recebido', timestamp: Date.now() - 345600000, likes: 15 },
  // --- Reportes da Cláudia Mendes (Centro/Norte) ---
  { id: 5, author: 'Profa_Claudia', type: 'Lixo', photo: 'https://images.pexels.com/photos/7045572/pexels-photo-7045572.jpeg?auto=compress&cs=tinysrgb&w=600', location: { lat: -10.1741, lng: -48.3325 }, severity: 'Alto', status: 'Recebido', timestamp: Date.now() - 86400000, likes: 28 },
  { id: 6, author: 'Profa_Claudia', type: 'Lâmpada queimada', photo: 'https://images.pexels.com/photos/1578332/pexels-photo-1578332.jpeg?auto=compress&cs=tinysrgb&w=600', location: { lat: -10.1795, lng: -48.3351 }, severity: 'Médio', status: 'Resolvido', timestamp: Date.now() - 172800000, likes: 18 },
  { id: 7, author: 'Profa_Claudia', type: 'Buraco', photo: 'https://media.istockphoto.com/id/1214998117/pt/foto/close-up-of-a-road-in-very-bad-condition-with-big-potholes-full-of-dirty-rain-water-pools.jpg?s=1024x1024&w=is&k=20&c=9dw2K-cLCwvuV9IzU3QgGz2-o9yK6aGCoM2_ztuWJqU=', location: { lat: -10.1888, lng: -48.3303 }, severity: 'Médio', status: 'Recebido', timestamp: Date.now() - 259200000, likes: 22 },
  { id: 8, author: 'Profa_Claudia', type: 'Lixo', photo: 'https://images.pexels.com/photos/3299386/pexels-photo-3299386.jpeg?auto=compress&cs=tinysrgb&w=600', location: { lat: -10.1812, lng: -48.3289 }, severity: 'Baixo', status: 'Recebido', timestamp: Date.now() - 345600000, likes: 10 },
  { id: 9, author: 'Profa_Claudia', type: 'Lâmpada queimada', photo: 'https://images.pexels.com/photos/545046/pexels-photo-545046.jpeg?auto=compress&cs=tinysrgb&w=600', location: { lat: -10.1711, lng: -48.3398 }, severity: 'Alto', status: 'Recebido', timestamp: Date.now() - 432000000, likes: 30 },
  // --- Reportes do Roberto Almeida (Plano Diretor Sul) ---
  { id: 10, author: 'Roberto_Inova', type: 'Buraco', photo: 'https://media.istockphoto.com/id/973356452/pt/foto/the-bad-asphalted-road-with-a-pothole-filled-with-water-dangerous-destroyed-roadbed.jpg?s=2048x2048&w=is&k=20&c=bU21heVvRjbyS_eQ0rxCvoFOerzXdarVIaCpWHr96hA=', location: { lat: -10.2450, lng: -48.3221 }, severity: 'Alto', status: 'Resolvido', timestamp: Date.now() - 86400000, likes: 19 },
  { id: 11, author: 'Roberto_Inova', type: 'Lâmpada queimada', photo: 'https://images.pexels.com/photos/89443/pexels-photo-89443.jpeg?auto=compress&cs=tinysrgb&w=600', location: { lat: -10.2515, lng: -48.3288 }, severity: 'Alto', status: 'Recebido', timestamp: Date.now() - 172800000, likes: 26 },
  { id: 12, author: 'Roberto_Inova', type: 'Lixo', photo: 'https://images.pexels.com/photos/6328847/pexels-photo-6328847.jpeg?auto=compress&cs=tinysrgb&w=600', location: { lat: -10.2398, lng: -48.3195 }, severity: 'Alto', status: 'Recebido', timestamp: Date.now() - 259200000, likes: 11 },
];


export function DataProvider({ children }) {
  const { user } = useAuth();
  const [reports, setReports] = useState(initialReports);
  const [users, setUsers] = useState(initialUsers);
  const [notifications, setNotifications] = useState([]);

  const addUser = (userData) => { setUsers(prevUsers => [...prevUsers, userData]); };

  const showNotification = (message, recipientNickname) => { const id = Date.now() + Math.random(); setNotifications(prev => [...prev, { id, message, recipient: recipientNickname }]); setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000); };
  const checkAndAwardAchievements = (currentUser, allUserReports, showNotification) => { const userStats = { total_reports: allUserReports.length, total_likes: allUserReports.reduce((acc, report) => acc + report.likes, 0), 'Buraco': allUserReports.filter(r => r.type === 'Buraco').length, 'Lixo': allUserReports.filter(r => r.type === 'Lixo').length, 'Lâmpada queimada': allUserReports.filter(r => r.type === 'Lâmpada queimada').length }; let updatedAchievements = { ...currentUser.achievements }; allAchievements.forEach(ach => { const currentLevel = updatedAchievements[ach.id]?.level ?? -1; const nextTierIndex = currentLevel + 1; if (nextTierIndex < ach.tiers.length) { const nextTier = ach.tiers[nextTierIndex]; const userProgress = userStats[ach.id] || 0; updatedAchievements[ach.id] = { ...updatedAchievements[ach.id], progress: userProgress }; if (userProgress >= nextTier.goal) { updatedAchievements[ach.id] = { level: nextTierIndex, progress: userProgress }; showNotification(`Conquista: ${ach.title} ${nextTier.name}!`, currentUser.nickname); } } }); return updatedAchievements; };
  const addReport = (newReportData) => { const newReport = { id: reports.length + 1, author: user.nickname, status: 'Recebido', timestamp: Date.now(), likes: 0, ...newReportData }; const updatedReports = [newReport, ...reports]; setReports(updatedReports); setUsers(prevUsers => { const userIndex = prevUsers.findIndex(u => u.nickname === user.nickname); if (userIndex === -1) return prevUsers; const updatedUsers = [...prevUsers]; const currentUser = updatedUsers[userIndex]; const updatedUser = { ...currentUser, points: currentUser.points + 10 }; const allUserReports = updatedReports.filter(r => r.author === user.nickname); updatedUser.achievements = checkAndAwardAchievements(currentUser, allUserReports, showNotification); updatedUsers[userIndex] = updatedUser; showNotification("+10 Pontos pelo seu reporte!", user.nickname); return updatedUsers; }); };
  const addLike = (reportId) => { let reportAuthor = null; const updatedReports = reports.map(report => { if (report.id === reportId) { reportAuthor = report.author; return { ...report, likes: report.likes + 1 }; } return report; }); setReports(updatedReports); if (reportAuthor) { setUsers(prevUsers => { const userIndex = prevUsers.findIndex(u => u.nickname === reportAuthor); if (userIndex === -1) return prevUsers; const updatedUsers = [...prevUsers]; const currentUser = updatedUsers[userIndex]; const updatedUser = { ...currentUser, points: currentUser.points + 1 }; const allUserReports = updatedReports.filter(r => r.author === reportAuthor); updatedUser.achievements = checkAndAwardAchievements(currentUser, allUserReports, showNotification); updatedUsers[userIndex] = updatedUser; if (reportAuthor !== user.nickname) { showNotification(`Seu reporte recebeu um like! +1 Ponto!`, reportAuthor); } return updatedUsers; }); } };
  const resolveReport = (reportId) => { setReports(prevReports => prevReports.map(report => report.id === reportId ? { ...report, status: 'Resolvido' } : report)); showNotification("Reporte marcado como resolvido!", user.nickname); };

  const getRanking = () => [...users].sort((a, b) => b.points - a.points);
  const getUserReports = () => user ? reports.filter(r => r.author === user.nickname) : [];

  const value = { reports, users, addUser, addReport, getRanking, getUserReports, addLike, resolveReport, notifications, allAchievements };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() { const context = useContext(DataContext); if (!context) throw new Error('useData must be used within a DataProvider'); return context; }

