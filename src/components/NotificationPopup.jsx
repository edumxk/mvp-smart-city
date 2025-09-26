import React, { useEffect, useState } from 'react';
import { CheckCircle, Award } from 'lucide-react';

export default function NotificationPopup({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Efeito de entrada
    const timer = setTimeout(() => setVisible(false), 2700); // Começa a desaparecer um pouco antes de ser removido
    return () => clearTimeout(timer);
  }, [message]);

  const isAchievement = message.toLowerCase().includes('conquista');

  return (
    <div
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-3 py-3 px-6 rounded-full shadow-lg transition-all duration-300 min-w-[280px] max-w-sm ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
      } ${
        isAchievement
          ? 'bg-amber-400 text-green-900'
          : 'bg-gradient-to-r from-green-500 to-green-800 text-white'
      }`}
    >
      {isAchievement ? <Award size={20} /> : <CheckCircle size={20} />}
      <span className="font-bold text-sm text-center">{message}</span>
    </div>
  );
}
