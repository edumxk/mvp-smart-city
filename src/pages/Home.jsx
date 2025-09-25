import React from 'react';
import { Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header com o título e busca */}
      <header className="bg-white sticky top-0 z-5 p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-brand-green-dark">Ocorrências</h1>
          <button className="text-brand-green-dark/70">
            <Search size={24} />
          </button>
        </div>
      </header>
      
      {/* Placeholder para o Mapa */}
      <div className="w-full h-[calc(100vh-160px)] bg-gray-200 flex justify-center items-center">
        <p className="text-gray-400 font-semibold">[ ÁREA DO MAPA INTERATIVO ]</p>
      </div>
    </div>
  );
}
