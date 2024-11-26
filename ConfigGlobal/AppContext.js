import React, { createContext, useState } from 'react';

// Crea el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Estado para el idioma
  const [notifications, setNotifications] = useState([]); // Lista de notificaciones
  const [collectionSchedule, setCollectionSchedule] = useState([]); // Estado para el cronograma

  // Función para agregar una nueva notificación con fecha y hora
  const addNotification = (message) => {
    const newNotification = {
      text: message,
      date: new Date().toLocaleString(), // Fecha y hora en formato local
    };
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
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
