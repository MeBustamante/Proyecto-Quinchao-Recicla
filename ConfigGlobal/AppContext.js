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
  const [collectionSchedule, setCollectionSchedule] = useState([]); // Estado para el cronograma

  // Función para agregar una nueva notificación con fecha y hora
  const addNotification = async (message) => {
    const defaultPushMessage = `✅ Su solicitud ha sido ingresada exitosamente y será gestionada a la brevedad. Gracias por su compromiso con el cuidado del medio ambiente y por ser parte del cambio.`;
    const newNotification = {
      text: message,
      date: new Date().toLocaleString(), // Fecha y hora en formato local
    };
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);

    // Enviar notificación push local
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Quinchao Recicla',
        body: `✅ Su solicitud ha sido ingresada exitosamente y será gestionada a la brevedad. Gracias por su compromiso.`,
        data: { data: message },
      },
      trigger: null, // Inmediata
    });
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        notifications,
        addNotification, // Proveer la función de agregar notificaciones
        collectionSchedule,
        setCollectionSchedule, // Proveer el estado y función del cronograma
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
