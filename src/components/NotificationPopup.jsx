// src/components/NotificationPopup.jsx
import React, { useEffect, useState } from 'react';
import { CheckCircle, Award } from 'lucide-react';

export default function NotificationPopup({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const isAchievement = message.toLowerCase().includes('conquista');

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 py-3 px-6 rounded-full shadow-lg transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      } ${
        isAchievement
          ? 'bg-amber-400 text-green-900' // Amarelo/Âmbar padrão com texto escuro
          : 'bg-gradient-to-r from-green-500 to-green-800 text-white' // Gradiente com verdes padrão
      }`}
    >
      {isAchievement ? <Award size={20} /> : <CheckCircle size={20} />}
      <span className="font-bold text-sm">{message}</span>
    </div>
  );
}