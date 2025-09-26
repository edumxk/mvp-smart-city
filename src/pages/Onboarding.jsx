import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

export default function Onboarding() {
  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-6 text-center bg-gray-50 font-sans">
      
      {/* Espaçador para empurrar o conteúdo para o centro/topo */}
      <div />

      {/* Conteúdo Principal */}
      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-full shadow-xl mb-8">
          <img 
            src="/assets/logo.png" 
            alt="Logo VivaCidade" 
            className="w-32 h-32"
          />
        </div>

        <h1 className="text-5xl font-extrabold text-green-800 mb-4">
          VivaCidade
        </h1>
        <p className="text-lg text-gray-600 mb-12 max-w-md">
          Juntos, construindo uma cidade melhor. Participe!
        </p>
        
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Link to="/login" className="flex items-center justify-center gap-2 w-full bg-green-800 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition-transform transform hover:scale-105">
            <LogIn size={20} />
            <span>Entrar</span>
          </Link>
          <Link to="/register" className="flex items-center justify-center gap-2 w-full bg-amber-400 hover:bg-amber-500 text-green-900 font-bold py-3 px-8 rounded-full text-lg shadow-md transition-transform transform hover:scale-105">
            <UserPlus size={20} />
            <span>Registrar</span>
          </Link>
        </div>
      </div>
      
      {/* --- NOVO: Rodapé com Créditos --- */}
      <footer className="w-full text-center text-gray-500 text-sm mt-12">
        <p>Desenvolvido por Eduardo Patrick</p>
        <a 
          href="https://github.com/edumxk" // <-- SUBSTITUA PELO SEU LINK
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-semibold text-green-700 hover:underline"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
