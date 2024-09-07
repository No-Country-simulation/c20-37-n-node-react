/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useGeneralContext } from "../hooks/useGeneralContext";
import { getAllUsers, updateUser } from "../api/users"
import { getMedicalHistory, updateMedicalHistory } from "../api/medicalHistory"
import toast from "react-hot-toast";


export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const { loading, setLoading } = useGeneralContext()
    const [medicalHistory, setMedicalHistory] = useState([]);
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
            console.log(error)  
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

    const getMedicalHistoryById = async (id) => {
        try {
            setLoading(true)
            const response = await getMedicalHistory(id)
            if (!response) {
                setMedicalHistory([])
                return toast.error('No se pudo obtener la historia clínica')
            }
            toast.success('Historia clínica obtenida correctamente')
            setMedicalHistory(response.data.playload)
            return response.data.playload
        } catch (error) {
            toast.error('No se pudo obtener la historia clínica, pruebe refrescando la pagina, en caso de persisitir contactar al administrador')
            setMedicalHistory([])
        }
        finally {
            setLoading(false)
        }
    }
    // useEffect(() => {
    //     getUsers()
    //     console.log('render desde el context')
    // }, [])

    const updateMedicalHistoryById = async (id, data) => {
        setLoading(true)
        try {
            const update = await updateMedicalHistory(id, data)
            if (update.status === 400 || update.status === 404) {
                return toast.error('No se pudo actualizar la historia clínica, verifique que los datos sean correctos')
            }
            toast.success('Historia clínica actualizada correctamente')
        } catch (error) {
            toast.error('No se pudo actualizar la historia clínica')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <UsersContext.Provider value={{
            users,
            setUsers,
            getUsers,
            updateUserById,
            loading,
            getMedicalHistoryById,
            updateMedicalHistoryById,
            medicalHistory
        }}>
            {children}
        </UsersContext.Provider>
    )
}
