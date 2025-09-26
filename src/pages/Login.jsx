import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useData } from '../contexts/DataContext.jsx';
import { Link } from 'react-router-dom';
import { User, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { users } = useData(); // Pega a lista de usuários do DataContext

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname) {
      setError('Por favor, insira seu apelido.');
      return;
    }
    
    // Procura o usuário na lista (ignorando maiúsculas/minúsculas)
    const foundUser = users.find(u => u.nickname.toLowerCase() === nickname.toLowerCase());

    if (foundUser) {
      setError('');
      login(foundUser); // Se encontrar, faz o login com os dados completos
    } else {
      setError('Apelido não encontrado. Verifique ou registre-se.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 relative">
      <Link to="/onboarding" className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-green-800 font-semibold transition-colors">
        <ArrowLeft size={20} /><span>Voltar</span>
      </Link>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-green-800">Bem-vindo!</h1>
          <p className="text-gray-500 mt-2">Faça o login para continuar.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Seu Apelido de Herói" value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" required />
          </div>
          {error && <p className="text-red-500 text-sm text-center font-semibold">{error}</p>}
          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition-transform transform hover:scale-105">
            <span>Entrar</span><ArrowRight size={20} />
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Não tem uma conta?{' '}
          <Link to="/register" className="font-bold text-green-600 hover:underline">Crie uma agora</Link>
        </p>
      </div>
    </div>
  );
}

