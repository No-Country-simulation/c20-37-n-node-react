import { useContext } from "react";
import { UsersContext } from "../context/usersContext";


export const useUsers = () => {

    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("useUsers debe ser usado con UsersProvider");
    }
    return context;
}