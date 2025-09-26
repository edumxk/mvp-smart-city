import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useData } from '../contexts/DataContext.jsx';
import { Link } from 'react-router-dom';
import { User, Phone, ArrowRight, ArrowLeft } from 'lucide-react';

const avatars = [ 'https://api.dicebear.com/7.x/bottts/svg?seed=Max', 'https://api.dicebear.com/7.x/bottts/svg?seed=Bella', 'https://api.dicebear.com/7.x/bottts/svg?seed=Charlie', 'https://api.dicebear.com/7.x/bottts/svg?seed=Lucy', 'https://api.dicebear.com/7.x/bottts/svg?seed=Leo', 'https://api.dicebear.com/7.x/bottts/svg?seed=Zoe' ];

export default function Register() {
  const [nickname, setNickname] = useState('');
  const [contact, setContact] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const { users, addUser } = useData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname || !selectedAvatar) {
      setError('Por favor, escolha um apelido e um avatar.');
      return;
    }
    
    // Verifica se o apelido já existe
    const userExists = users.some(u => u.nickname.toLowerCase() === nickname.toLowerCase());
    if (userExists) {
      setError('Este apelido já está em uso. Por favor, escolha outro.');
      return;
    }

    setError('');
    const newUserData = {
      nickname,
      avatar: selectedAvatar,
      contact,
      points: 0,
      achievements: {},
    };
    
    addUser(newUserData); // Adiciona o usuário ao "banco de dados"
    register(newUserData); // Faz o login com o novo usuário
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 relative">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-green-800 font-semibold transition-colors">
        <ArrowLeft size={20} /><span>Voltar</span>
      </Link>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-green-800">Crie sua Conta</h1>
          <p className="text-gray-500 mt-2">Torne-se um guardião da sua cidade.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-3 text-center">Escolha seu Avatar de Herói</label>
            <div className="grid grid-cols-3 gap-4">
              {avatars.map(avatarUrl => ( <button type="button" key={avatarUrl} onClick={() => setSelectedAvatar(avatarUrl)} className={`p-1 rounded-full transition-all duration-200 ${ selectedAvatar === avatarUrl ? 'ring-4 ring-amber-400' : 'ring-2 ring-transparent' }`} > <img src={avatarUrl} alt="Avatar" className="w-full h-auto rounded-full bg-gray-100" /> </button> ))}
            </div>
          </div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Apelido / Nome de Herói" value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" required />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Contato (opcional)" value={contact} onChange={(e) => setContact(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          {error && <p className="text-red-500 text-sm text-center font-semibold">{error}</p>}
          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-green-900 font-bold py-3 px-8 rounded-full text-lg shadow-md transition-transform transform hover:scale-105">
            <span>Criar Conta</span><ArrowRight size={20} />
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-bold text-green-600 hover:underline">Faça o login</Link>
        </p>
      </div>
    </div>
  );
}

