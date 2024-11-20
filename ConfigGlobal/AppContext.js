import React, { createContext, useState } from 'react';

// Crea el contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false); // Estado para el tema oscuro
  const [language, setLanguage] = useState('es'); // Estado para el idioma (español por defecto)

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        language,
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
