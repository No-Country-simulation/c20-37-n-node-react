/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";

const AuthContext = createContext();


export const useAuth = () => {

    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado con AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {


    return (
        <AuthContext.Provider value={{

        }}>
            {children}
        </AuthContext.Provider>
    )
}