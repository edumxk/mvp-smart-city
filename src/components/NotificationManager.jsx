import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../contexts/DataContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import NotificationPopup from './NotificationPopup.jsx';
import { Howl } from 'howler';

export default function NotificationManager() {
  const { notifications, removeNotification } = useData();
  const { user } = useAuth();
  const [currentNotification, setCurrentNotification] = useState(null);
  
  const currentlyProcessingId = useRef(null);
  
  // ⬇️ ADICIONE ESTE useEffect PARA TESTAR
  useEffect(() => {
    console.log('🔁 NotificationManager montado');
  }, []);

  useEffect(() => {
    if (currentlyProcessingId.current) return;

    const userNotifications = notifications.filter(n => n.recipient === user?.nickname);

    if (userNotifications.length > 0) {
      const nextNotification = userNotifications.find(n => n.isPriority) || userNotifications[0];
      
      // --- LINHA DE CONSOLE.LOG ADICIONADA AQUI ---
      console.log('A exibir notificação:', nextNotification.message, '| Fila restante:', userNotifications.slice(1).map(n => n.message));

      currentlyProcessingId.current = nextNotification.id;
      setCurrentNotification(nextNotification);

      if (nextNotification.sound) {
        new Howl({ src: [nextNotification.sound] }).play();
      }

      setTimeout(() => {
        if (typeof removeNotification === 'function') {
          removeNotification(nextNotification.id);
        }
        currentlyProcessingId.current = null;
      }, 3000);
    } else {
      setCurrentNotification(null);
    }

  }, [notifications, user, removeNotification]);

  if (!currentNotification) {
    return null;
  }

  return <NotificationPopup message={currentNotification.message} />;
}

