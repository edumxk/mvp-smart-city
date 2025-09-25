import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Login() {
  const [nickname, setNickname] = React.useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nickname.trim()) {
      login(nickname.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white to-brand-blue/20 font-sans">
      <Link to="/onboarding">
        <img src="/assets/logo.png" alt="Logo VivaCidade" className="w-24 h-24 mb-8" />
      </Link>
      
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-brand-green-dark mb-6">
          Entrar
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="nickname" className="text-sm font-bold text-gray-600 mb-1 block">Seu Apelido</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="ex: Guardião_Urbano"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-brand-green-light transition-colors"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-brand-yellow hover:bg-yellow-400 text-brand-green-dark font-bold py-3 px-8 rounded-full text-lg shadow-md transition-transform transform hover:scale-105"
          >
            Acessar Plataforma
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Ainda não tem uma conta?{' '}
          <Link to="/register" className="font-semibold text-brand-green-dark hover:underline">
            Registre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}

