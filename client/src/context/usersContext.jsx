/* eslint-disable react/prop-types */
import { useContext, createContext, useState } from "react";
import { getAllUsers } from "../api/users"
import toast from "react-hot-toast";


const UsersContext = createContext();


export const useUsers = () => {

    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("useUsers debe ser usado con UsersProvider");
    }
    return context;
}

export const UsersProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const getUsers = async () => {
        try {
            setLoading(true)
            const response = await getAllUsers()
            console.log(response)
            if (!response) {
                setLoading(false)
                return toast.error('No se pudo obtener los usuarios')
            }
            // setUsers(response.data)
        } catch (error) {
            console.log(error)
            toast.error('No se pudo obtener los usuarios')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <UsersContext.Provider value={{
            users,
            getUsers,
            loading
        }}>
            {children}
        </UsersContext.Provider>
    )
}
