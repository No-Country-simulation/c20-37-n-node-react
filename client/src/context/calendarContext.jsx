/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useGeneralContext } from "../hooks/useGeneralContext";
import { getCalendarByOwner, createCalendar, removeByOwner } from "../api/calendar/calendar";
import { createDoctorAvailableTime, getAvailableTimeByDoctor, getAvailableTimeByDoctorAndRangeDate, removeByDoctorAndDate, updateByDoctor, updateByDoctorAndDate } from "../api/calendar/availableTime";
import { createConsultation, getConsultationByDoctorAndRangeDate, getConsultationByID, getConsultationByPatientAndRangeDate, removeConsultationByID, updateConsultationByID } from "../api/calendar/consultation";
import toast from "react-hot-toast";


export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
    const { loading, setLoading, calendar, setCalendar, availableTime, setAvailableTime, doctorAvailability, setDoctorAvailability, consultations, setConsultations, consultation, setConsultation, logued } = useGeneralContext()
    const [especialidad, setEspecialidad] = useState('')
    const [doctor, setDoctor] = useState('')
    const [horarios, setHorarios] = useState([])

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

    const getDoctorAvalability = async (doctorId) => {
        try {
            setLoading(true);

            const response = await getAvailableTimeByDoctor(doctorId);

            // Verificar si la respuesta es válida
            if (!response || !response.data || !response.data.playload) {
                toast.error('No se pudo obtener los horarios disponibles');
                return null;
            }

            // Establecer los horarios disponibles
            setDoctorAvailability(response.data.playload);

            // Devolver los horarios disponibles
            return response.data.playload;

        } catch (error) {
            // Mostrar el mensaje de error
            toast.error('No se pudo obtener los horarios disponibles');
            return null; // Retornar null en caso de error

        } finally {
            setLoading(false); // Asegurarse de desactivar el loading
        }
    };
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
            setConsultation(response.data.playload);
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
            
            const response = await getConsultationByPatientAndRangeDate(patientId, startDate, endDate)
            console.log(response);
            
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
            console.log("RESPUESTA",response);
            
            if (response.status !== 201) {
                return toast.error('No se pudo crear la consulta')
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

    const updateConsultation = async (id, data) => {
        setLoading(true)
        try {
            const update = await updateConsultationByID(id, data)
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

    useEffect(() => {

        if (logued.role === 'doctor') {
            getDoctorAvalability(logued._id)
        }
    }, [logued.role])

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
            consultation,
            setConsultation,
            getConsultation,
            getConsultationByDoctor,
            getConsultationByPatient,
            createNewConsultation,
            updateConsultation,
            removeConsultation,
            loading,
            especialidad,
            setEspecialidad,
            doctor,
            setDoctor,
            horarios,
            setHorarios
        }}>
            {children}
        </CalendarContext.Provider>
    )
}
