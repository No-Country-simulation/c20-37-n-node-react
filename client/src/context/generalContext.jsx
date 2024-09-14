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
    const [calendar, setCalendar] = useState([]);
    const [availableTime, setAvailableTime] = useState([]);
    const [doctorAvailability, setDoctorAvailability] = useState([]);
    const [consultations, setConsultations] = useState([]);
    const [consultation, setConsultation] = useState([]);
    const [slot, setSlot] = useState({});
    const [errors, setErrors] = useState('');
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [activeTab, setActiveTab] = useState(0);
    const [onCall, setOnCall] = useState(false);


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
            calendar,
            setCalendar,
            availableTime,
            setAvailableTime,
            doctorAvailability,
            setDoctorAvailability,
            consultations,
            setConsultations,
            consultation,
            setConsultation,
            slot,
            setSlot,
            authenticated,
            setAuthenticated,
            errors,
            setErrors,
            activeMenu,
            setActiveMenu,
            activeTab,
            setActiveTab,
            onCall,
            setOnCall
        }}>
            {children}
        </GeneralContext.Provider>
    );
};