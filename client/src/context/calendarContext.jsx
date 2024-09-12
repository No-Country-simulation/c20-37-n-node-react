/* eslint-disable react/prop-types */
import { createContext} from "react";
import { useGeneralContext } from "../hooks/useGeneralContext";
import toast from "react-hot-toast";
import { getCalendarByOwner, createCalendar, removeByOwner } from "../api/calendar/calendar";
import { createDoctorAvailableTime, getAvailableTimeByDoctor, getAvailableTimeByDoctorAndRangeDate, removeByDoctorAndDate, updateByDoctor, updateByDoctorAndDate } from "../api/calendar/availableTime";
import { createConsultation, getConsultationByDoctorAndRangeDate, getConsultationByID, removeConsultationByID, updateConsultationByID } from "../api/calendar/consultation";


export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
    const { loading, setLoading, calendar, setCalendar, availableTime, setAvailableTime, doctorAvailability, setDoctorAvailability, consultations, setConsultations } = useGeneralContext()

    //Calendar
    const getCalendar = async (ownerId) => {
        try {
            setLoading(true)
            const response = await getCalendarByOwner(ownerId)
            if (!response) {
                return toast.error('No se pudo obtener el calendario')
            }
            setCalendar(response.data.playload)
        } catch (error) {
            toast.error('No se pudo obtener el calendario', error)
        }
        finally {
            setLoading(false)
        }
    }

    const createNewCalendar = async (values) => {
        try {
            setLoading(true)
            const response = await createCalendar(values)
            if (response.status !== 201) {
                return toast.error('No se pudo crear el calendario')
            }
            toast.success('Calendario creado correctamente')
            setCalendar(response.data.playload)
            return response
        } catch (error) {
            toast.error(error.response.data.msg)
            toast.error('No se pudo crear el calendario')
        }
        finally {
            setLoading(false)
        }
    }

    const removeCalendar = async (ownerId) => {
        setLoading(true)
        try {
            const remove = await removeByOwner(ownerId);
            if (remove.status === 400 || remove.status === 404) {
                return toast.error('No se pudo eliminar el calendario')
            }
            toast.success('Calendario borrado correctamente')
            setCalendar([]); 
        } catch (error) {
            toast.error('No se pudo eliminar el calendario')
            toast.error(error.response.data.msg)
        }
        finally {
            setLoading(false)
        }
    }

    // AvailableTime
    const getDoctorAvalability= async (doctorId) => {
        try {
            setLoading(true)
            const response = await getAvailableTimeByDoctor(doctorId)
            if (!response) {
                return toast.error('No se pudo obtener los horarios disponibles')
            }
            setDoctorAvailability(response.data.playload)
        } catch (error) {
            toast.error('No se pudo obtener los horarios disponibles', error)
        }
        finally {
            setLoading(false)
        }
    }

    const getAvailableTimeByRangeDate = async (doctorId, startDate, endDate) => {
        try {
            setLoading(true)
            const response = await getAvailableTimeByDoctorAndRangeDate(doctorId, startDate, endDate)
            if (!response) {
                return toast.error('No se pudo obtener los horarios disponibles')
            }
            setAvailableTime(response.data.playload)
        } catch (error) {
            toast.error('No se pudo obtener los horarios disponibles', error)
        }
        finally {
            setLoading(false)
        }
    }

    const createDoctorAvailability = async (values) => {
        try {
            setLoading(true)
            const response = await createDoctorAvailableTime(values)
            if (response.status !== 201) {
                return toast.error('No se pudo establecer los horarios disponibles del doctor')
            }
            toast.success('Horarios disponibles establecidos correctamente')
            setDoctorAvailability(response.data.playload)
            return response
        } catch (error) {
            toast.error(error.response.data.msg)
            toast.error('No se pudo establecer los horarios disponibles del doctor')
        }
        finally {
            setLoading(false)
        }
    }

    const modifyAvailableTimesForSpecificDate = async (doctorId, date, newTimeSlots) => {
        setLoading(true)
        try {
            const update = await updateByDoctorAndDate(doctorId, date, newTimeSlots)
            if (update.status === 400 || update.status === 404) {
                return toast.error('No se pudo actualizar el horario disponible del doctor, verifique que los datos sean correctos')
            }
            toast.success('Horario disponible actualizado correctamente')
            setDoctorAvailability(update.data.playload)
        } catch (error) {
            toast.error('No se pudo actualizar el horario disponible del doctor')
            toast.error(error.response.data.msg)
        }
        finally {
            setLoading(false)
        }
    }

    const updateAvailableTime = async (doctorId, data) => {
        setLoading(true)
        try {
            const update = await updateByDoctor(doctorId, data)
            if (update.status === 400 || update.status === 404) {
                return toast.error('No se pudo actualizar los horarios disponibles del doctor, verifique que los datos sean correctos')
            }
            toast.success('Horarios disponibles actualizados correctamente')
            setDoctorAvailability(update.data.playload)
        } catch (error) {
            toast.error('No se pudo actualizar los horarios disponibles del doctor')
            toast.error(error.response.data.msg)
        }
        finally {
            setLoading(false)
        }
    }

    const removeAvailableTime = async (doctorId, date) => {
        setLoading(true)
        try {
            const remove = await removeByDoctorAndDate(doctorId, date);
            if (remove.status === 400 || remove.status === 404) {
                return toast.error('No se pudo eliminar el dia particular de horarios disponibles')
            }
            toast.success('Dia particular borrado correctamente')
            setDoctorAvailability(remove.data.playload);
        } catch (error) {
            toast.error('No se pudo eliminar el dia particular de horarios disponibles')
            toast.error(error.response.data.msg)
        }
        finally {
            setLoading(false)
        }
    }
    
    //Consultation

    const getConsultation = async (id) => {
        try {
            setLoading(true)
            const response = await getConsultationByID(id)
            if (!response) {
                return toast.error('No se pudo obtener la consulta')
            }
            setConsultations([response.data.playload]);
        } catch (error) {
            toast.error('No se pudo obtener la consulta', error)
        }
        finally {
            setLoading(false)
        }
    }

    const getConsultationByDoctor = async (doctorId, startDate, endDate) => {
        try {
            setLoading(true)
            const response = await getConsultationByDoctorAndRangeDate(doctorId, startDate, endDate)
            if (!response) {
                return toast.error('No se pudo obtener las consultas')
            }
            setConsultations(response.data.playload)
        } catch (error) {
            toast.error('No se pudo obtener las consultas', error)
        }
        finally {
            setLoading(false)
        }
    }
   
    const getConsultationByPatient = async (patientId, startDate, endDate) => {
        try {
            setLoading(true)
            const response = await getConsultationByDoctorAndRangeDate(patientId, startDate, endDate)
            if (!response) {
                return toast.error('No se pudo obtener las consultas')
            }
            setConsultations(response.data.playload)
        } catch (error) {
            toast.error('No se pudo obtener las consultas', error)
        }
        finally {
            setLoading(false)
        }
    }

    const createNewConsultation = async (values) => {
        try {
            setLoading(true)
            const response = await createConsultation(values)
            if (response.status !== 201) {
                return toast.error('No se pudo establecer crear la consulta')
            }
            toast.success('Consulta creada correctamente')
            setConsultations([...consultations, response.data.playload])
            return response
        } catch (error) {
            toast.error(error.response.data.msg)
            toast.error('No se pudo establecer crear la consulta')
        }
        finally {
            setLoading(false)
        }
    }

    const updateConsultation = async (id) => {
        setLoading(true)
        try {
            const update = await updateConsultationByID(id)
            if (update.status === 400 || update.status === 404) {
                return toast.error('No se pudo actualizar la consulta, verifique que los datos sean correctos')
            }
            toast.success('Consulta actualizada correctamente')
            setConsultations(consultations.map(consultation => consultation._id === id ? update.data.playload : consultation))
        } catch (error) {
            toast.error('No se pudo actualizar la consulta')
            toast.error(error.response.data.msg)
        }
        finally {
            setLoading(false)
        }
    }

    const removeConsultation = async (id) => {
        setLoading(true)
        try {
            const remove = await removeConsultationByID(id);
            if (remove.status === 400 || remove.status === 404) {
                return toast.error('No se pudo eliminar la consulta')
            }
            toast.success('Consulta borrada correctamente')
            setConsultations(consultations.filter(consultation => consultation._id !== id))
        } catch (error) {
            toast.error('No se pudo eliminar la consulta')
            toast.error(error.response.data.msg)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <CalendarContext.Provider value={{
            calendar,
            getCalendar,
            createNewCalendar,
            removeCalendar,
            availableTime,
            doctorAvailability,
            getDoctorAvalability,
            getAvailableTimeByRangeDate,
            createDoctorAvailability,
            updateAvailableTime,
            modifyAvailableTimesForSpecificDate,
            removeAvailableTime,
            consultations,
            getConsultation,
            getConsultationByDoctor,
            getConsultationByPatient,
            createNewConsultation,
            updateConsultation,
            removeConsultation,
            loading
        }}>
            {children}
        </CalendarContext.Provider>
    )
}
