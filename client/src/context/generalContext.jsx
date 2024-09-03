/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

// Crear el contexto
export const GeneralContext = createContext();

// Crear el proveedor
export const GeneralProvider = ({ children }) => {
    const [logued, setLogued] = useState({});
    const [loading, setLoading] = useState(false);

    return (
        <GeneralContext.Provider value={{
            logued,
            setLogued,
            loading,
            setLoading
        }}>
            {children}
        </GeneralContext.Provider>
    );
};