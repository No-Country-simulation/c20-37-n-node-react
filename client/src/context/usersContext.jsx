/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useGeneralContext } from "../hooks/useGeneralContext";
import { getAllUsers, updateUser } from "../api/users"
import toast from "react-hot-toast";


export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const { loading, setLoading } = useGeneralContext()
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            setLoading(true)
            const response = await getAllUsers()
            if (!response) {
                return toast.error('No se pudo obtener los usuarios')
            }
            setUsers(response.data.playload)

        } catch (error) {
            toast.error('No se pudo obtener los usuarios')
            toast.error(error.response.data.msg)
        }
        finally {
            setLoading(false)
        }
    }


    const updateUserById = async (id, user) => {
        setLoading(true)
        try {
            const update = await updateUser(id, user)
            if (update.status === 400 || update.status === 404) {
                return toast.error('No se pudo actualizar el usuario, verifique que los datos sean correctos')
            }
            toast.success('Usuario actualizado correctamente')
        } catch (error) {
            toast.error('No se pudo actualizar el usuario')
            toast.error(error.response.data.msg)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsers()
        console.log('render desde el context')
    }, [users.length])


    return (
        <UsersContext.Provider value={{
            users,
            getUsers,
            updateUserById,
            loading
        }}>
            {children}
        </UsersContext.Provider>
    )
}
