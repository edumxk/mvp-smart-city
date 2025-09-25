import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Corrigindo o caminho da importação para ser absoluto a partir da pasta src
import { useAuth } from '/src/contexts/AuthContext.jsx';

export default function Register() {
  const [nickname, setNickname] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nickname.trim()) {
      register(nickname.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white to-brand-blue/20 font-sans">
      <Link to="/onboarding">
        <img src="/assets/logo.png" alt="Logo VivaCidade" className="w-24 h-24 mb-8" />
      </Link>

      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-brand-green-dark mb-6">
          Criar Conta
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="nickname" className="text-sm font-bold text-gray-600 mb-1 block">Escolha seu Apelido</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Seja criativo!"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-brand-green-light transition-colors"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-brand-yellow hover:bg-yellow-400 text-brand-green-dark font-bold py-3 px-8 rounded-full text-lg shadow-md transition-transform transform hover:scale-105"
          >
            Registrar e Entrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-semibold text-brand-green-dark hover:underline">
            Faça o login
          </Link>
        </p>
      </div>
    </div>
  );
}

