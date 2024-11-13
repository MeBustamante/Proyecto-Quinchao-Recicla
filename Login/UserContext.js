// Este codigo se encarga de almacenar el nombre de usuario agregado en el login
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [nombre, setNombre] = useState('');
    return (
        <UserContext.Provider value={{ nombre, setNombre }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
