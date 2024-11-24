import React, { createContext, useState } from 'react';

// Crea el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Estado para el idioma
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Notificaciones
  const [timeFormat, setTimeFormat] = useState('24h'); // Formato de hora
  const [locationAccess, setLocationAccess] = useState(true); // Permiso de ubicación
  const [collectionSchedule, setCollectionSchedule] = useState([]); // Horarios de recolección

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        notificationsEnabled,
        setNotificationsEnabled,
        timeFormat,
        setTimeFormat,
        locationAccess,
        setLocationAccess,
        collectionSchedule,
        setCollectionSchedule, // Nueva función para actualizar los horarios
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
