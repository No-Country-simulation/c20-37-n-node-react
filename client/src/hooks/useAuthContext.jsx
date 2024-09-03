import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuth = () => {

    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado con AuthProvider");
    }
    return context;
}