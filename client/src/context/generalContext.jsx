/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

// Crear el contexto
export const GeneralContext = createContext();

// Crear el proveedor
export const GeneralProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [logued, setLogued] = useState({});
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [errors, setErrors] = useState('');


    return (
        <GeneralContext.Provider value={{
            logued,
            setLogued,
            loading,
            setLoading,
            users,
            setUsers,
            medicalHistory,
            setMedicalHistory,
            authenticated,
            setAuthenticated,
            errors,
            setErrors
        }}>
            {children}
        </GeneralContext.Provider>
    );
};