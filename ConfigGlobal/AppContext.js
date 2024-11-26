import React, { createContext, useState } from 'react';
import * as Notifications from 'expo-notifications';

// Configurar el manejador de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Crea el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Estado para el idioma
  const [notifications, setNotifications] = useState([]); // Lista de notificaciones
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // Estado para notificaciones habilitadas/deshabilitadas
  const [collectionSchedule, setCollectionSchedule] = useState([]); // Estado para el cronograma

  // Función para agregar una nueva notificación con fecha y hora
  const addNotification = async (message) => {
    const messages = {
      es: `✅ Su solicitud ha sido ingresada exitosamente y será gestionada a la brevedad. Gracias por su compromiso con el cuidado del medio ambiente y por ser parte del cambio.`,
      en: `✅ Your request has been successfully submitted and will be processed shortly. Thank you for your commitment to environmental care and for being part of the change.`,
    };

    const defaultPushMessage = messages[language] || messages['es']; // Mensaje según el idioma actual
    const newNotification = {
      text: message,
      date: new Date().toLocaleString(), // Fecha y hora en formato local
    };
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);

    if (notificationsEnabled) {
      // Enviar notificación push local
      await Notifications.scheduleNotificationAsync({
        content: {
          title: language === 'es' ? 'Quinchao Recicla' : 'Quinchao Recycles',
          body: defaultPushMessage,
          data: { data: message },
        },
        trigger: null, // Inmediata
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        notifications,
        addNotification,
        notificationsEnabled, // Proveer el estado de notificaciones
        setNotificationsEnabled, // Proveer la función para actualizar el estado
        collectionSchedule,
        setCollectionSchedule,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
