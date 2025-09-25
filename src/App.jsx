import React from 'react';
import { Outlet, NavLink } from 'react-router-dom'; // useLocation e Navigate removidos
// Ícones importados diretamente aqui para uso no NavBar
import { Map, User, PlusCircle } from 'lucide-react';

// O componente NavBar permanece o mesmo
function NavBar() {
  // Estilo para o link ativo, usando a cor principal da marca
  const activeLinkStyle = {
    color: '#2A5B46' // brand-green-dark
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm z-10">
      <div className="flex justify-around items-center h-20 border-t border-gray-200">
        <NavLink 
          to="/home" 
          className="flex flex-col items-center text-gray-400 transition-colors duration-200"
          style={({ isActive }) => isActive ? activeLinkStyle : undefined}
        >
          <Map size={28} />
          <span className="text-xs mt-1 font-bold">Mapa</span>
        </NavLink>
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


function App() {
  // CORREÇÃO: O hook `useLocation` e a lógica de redirecionamento foram removidos.
  // Eles estavam sendo usados fora do contexto do roteador, o que causava o erro.
  // A responsabilidade de redirecionar da rota "/" deve ficar na configuração central do roteador.
  
  return (
    <div className="font-sans bg-gray-50">
      <main className="pb-24"> {/* Padding para não sobrepor o conteúdo com a NavBar */}
        {/* O Outlet renderiza a página atual (Home, Profile, etc.) */}
        <Outlet />
      </main>
      
      {/* A NavBar aparecerá em todas as telas dentro deste layout */}
      <NavBar />
    </div>
  );
}

export default App;

