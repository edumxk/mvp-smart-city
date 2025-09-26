// src/App.jsx
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Map, User, PlusCircle } from 'lucide-react';
import { useData } from './contexts/DataContext.jsx';
import { useAuth } from './contexts/AuthContext.jsx'; // Importar o useAuth
import NotificationPopup from './components/NotificationPopup.jsx';

function NavBar() {
  // ... (componente NavBar permanece o mesmo)
  const navigate = useNavigate();
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm z-10">
      <div className="flex justify-around items-center h-20 border-t border-gray-200">
        <NavLink to="/home" className={({ isActive }) => `flex flex-col items-center transition-colors duration-200 ${isActive ? 'text-green-800' : 'text-gray-400'}`}>
          <Map size={28} />
          <span className="text-xs mt-1 font-bold">Mapa</span>
        </NavLink>
        <button onClick={() => navigate("/new-report")} className="transform -translate-y-1/3">
          <PlusCircle size={72} className="text-amber-400 bg-white rounded-full shadow-lg hover:text-amber-500" strokeWidth={1.5}/>
        </button>
        <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center transition-colors duration-200 ${isActive ? 'text-green-800' : 'text-gray-400'}`}>
          <User size={28} />
          <span className="text-xs mt-1 font-bold">Perfil</span>
        </NavLink>
      </div>
    </nav>
  );
}

function App() {
  const { notifications } = useData();
  const { user } = useAuth(); // Pegar o usuário logado

  // --- FILTRO DE NOTIFICAÇÕES APLICADO AQUI ---
  // Renderiza apenas as notificações destinadas ao usuário atual
  const myNotifications = user ? notifications.filter(n => n.recipient === user.nickname) : [];

  return (
    <div className="font-sans bg-gray-50">
      <div className="notification-container fixed top-0 left-0 w-full h-full pointer-events-none z-50">
        {myNotifications.map(notif => (
          <NotificationPopup key={notif.id} message={notif.message} />
        ))}
      </div>
      
      <main className="pb-24">
        <Outlet />
      </main>
      
      <NavBar />
    </div>
  );
}

export default App;