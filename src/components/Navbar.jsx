import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, User, PlusCircle } from 'lucide-react';

export default function NavBar() {
  // Estilo para o link ativo, usando a cor principal da marca
  const activeLinkStyle = {
    color: '#2A5B46' // brand-green-dark
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm z-10">
      <div className="flex justify-around items-center h-20 border-t border-gray-200">
        
        {/* Usamos NavLink para que ele possa detectar automaticamente o link ativo */}
        <NavLink 
          to="/home" 
          className="flex flex-col items-center text-gray-400 transition-colors duration-200"
          style={({ isActive }) => isActive ? activeLinkStyle : undefined}
        >
          <Map size={28} />
          <span className="text-xs mt-1 font-bold">Mapa</span>
        </NavLink>

        {/* Botão de Adicionar Reporte (ação principal) */}
        <button className="transform -translate-y-6 focus:outline-none">
          <PlusCircle 
            size={72} 
            className="text-brand-yellow bg-white rounded-full shadow-lg hover:text-yellow-400 transition-colors" 
            strokeWidth={1.5} 
          />
        </button>

        <NavLink 
          to="/profile" 
          className="flex flex-col items-center text-gray-400 transition-colors duration-200"
          style={({ isActive }) => isActive ? activeLinkStyle : undefined}
        >
          <User size={28} />
          <span className="text-xs mt-1 font-bold">Perfil</span>
        </NavLink>
      </div>
    </nav>
  );
}
