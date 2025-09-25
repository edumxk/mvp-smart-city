import React from 'react';
import { Link } from 'react-router-dom';

export default function Onboarding() {
  return (
    <div className="bg-gradient-to-br from-brand-green-light/20 to-brand-blue/20 min-h-screen flex flex-col justify-center items-center p-6 text-center">
      <img src="/assets/logo.png" alt="Logo VivaCidade" className="w-40 h-40 mb-8" />
      <h1 className="text-5xl font-extrabold text-brand-green-dark mb-4">VivaCidade</h1>
      <p className="text-lg text-brand-green-dark/80 mb-12 max-w-md">
        Juntos, construindo uma cidade melhor. Participe!
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        {/* Botão para Entrar (Login) */}
        <Link
          to="/login"
          className="bg-brand-yellow hover:bg-yellow-400 text-brand-green-dark font-bold py-3 px-8 rounded-full text-lg shadow-md transition-transform transform hover:scale-105 w-full"
        >
          Entrar
        </Link>
        
        {/* Botão para Registrar */}
        <Link
          to="/register"
          className="bg-white hover:bg-gray-100 text-brand-green-dark font-bold py-3 px-8 rounded-full text-lg shadow-md transition-transform transform hover:scale-105 w-full border-2 border-brand-green-light/50"
        >
          Registrar
        </Link>
      </div>
    </div>
  );
}