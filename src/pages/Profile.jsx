import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useData } from '../contexts/DataContext.jsx';
import { LogOut, ListChecks, LayoutDashboard } from 'lucide-react'; // Ícone adicionado

const AchievementCard = ({ achievement, userProgressData }) => {
    const currentLevel = userProgressData?.level ?? -1;
    const nextTierIndex = currentLevel + 1;
    const hasNextTier = nextTierIndex < achievement.tiers.length;
    const tierToShow = hasNextTier ? achievement.tiers[nextTierIndex] : achievement.tiers[achievement.tiers.length - 1];
    const userProgress = userProgressData?.progress ?? 0;
    const isUnlocked = userProgress >= tierToShow.goal;
    let progressPercentage = isUnlocked ? 100 : Math.floor((userProgress / tierToShow.goal) * 100);
    const tierColors = { 'Bronze': 'text-amber-600', 'Prata': 'text-gray-400', 'Ouro': 'text-yellow-500', 'Diamante': 'text-cyan-400' };
    return (
        <div className={`flex-shrink-0 w-40 h-48 bg-white p-3 rounded-2xl shadow-md flex flex-col justify-between text-center transition-all duration-300 ${isUnlocked ? '' : 'opacity-60'}`}>
            <div className={`mx-auto p-2 rounded-full ${isUnlocked ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>{React.cloneElement(achievement.icon, { size: 28 })}</div>
            <div><h3 className="font-bold text-sm text-gray-800">{achievement.title}</h3><p className={`text-xs font-semibold ${tierColors[tierToShow.name] || 'text-gray-500'}`}>{tierToShow.name}</p><p className="text-xxs text-gray-400 mt-1">{tierToShow.description}</p></div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2"><div className="bg-amber-400 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div></div>
            <p className="text-xxs font-semibold text-gray-500">{isUnlocked ? "Completo!" : `${userProgress}/${tierToShow.goal}`}</p>
        </div>
    );
};

export default function Profile() {
  const { user, logout } = useAuth();
  const { users, reports, allAchievements, getRanking } = useData();
  const navigate = useNavigate();
  const ranking = getRanking();
  const currentUserData = users.find(u => u.nickname === user.nickname);
  const userReports = reports.filter(r => r.author === user.nickname);
  const totalLikes = userReports.reduce((sum, report) => sum + report.likes, 0);

  if (!currentUserData) return <div className="p-4 text-center">Carregando...</div>;

  return (
    <div className="p-4 bg-gray-50 min-h-screen font-sans">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center mb-6">
          <img src={currentUserData.avatar} alt="Avatar" className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-white shadow-lg"/>
          <h1 className="text-3xl font-extrabold text-green-800">{currentUserData.nickname}</h1>
          <p className="text-lg font-bold text-amber-500 mt-2">{currentUserData.points} Pontos</p>
          <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
              <div className="text-center"><p className="font-bold text-xl text-green-800">{userReports.length}</p><p className="text-xs text-gray-500">Reportes</p></div>
              <div className="text-center"><p className="font-bold text-xl text-green-800">{totalLikes}</p><p className="text-xs text-gray-500">Likes</p></div>
          </div>
      </div>

      {/* --- BOTÕES DE AÇÃO --- */}
      <div className="mb-8 px-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => navigate('/my-reports')}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-green-800 font-bold py-3 px-4 rounded-xl shadow-sm transition-colors border border-gray-200"
        >
          <ListChecks size={20} />
          <span>Meus Reportes</span>
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-blue-800 font-bold py-3 px-4 rounded-xl shadow-sm transition-colors border border-gray-200"
        >
          <LayoutDashboard size={20} />
          <span>Painel do Gestor</span>
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-3">Minhas Conquistas</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {allAchievements.map(ach => (<AchievementCard key={ach.id} achievement={ach} userProgressData={currentUserData.achievements[ach.id]} />))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-3">Ranking do Mês</h2>
        <div className="bg-white p-4 rounded-2xl shadow-md space-y-3">
          {ranking.slice(0, 10).map((rankedUser, index) => (<div key={rankedUser.nickname} className={`flex items-center p-3 rounded-lg transition-colors ${ rankedUser.nickname === user.nickname ? 'bg-green-100' : '' }`}> <span className="text-lg font-bold text-gray-400 w-8">{index + 1}º</span> <img src={rankedUser.avatar} alt="Avatar" className="w-10 h-10 rounded-full" /> <span className="flex-1 ml-4 font-semibold text-gray-800">{rankedUser.nickname}</span> <span className="font-bold text-green-800">{rankedUser.points} pts</span> </div>))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button onClick={logout} className="flex items-center justify-center w-full max-w-xs mx-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-full transition-colors">
          <LogOut className="mr-2" size={20} /> Sair
        </button>
      </div>
    </div>
  );
}
