/* eslint-disable react/prop-types */
//import { useCalendar } from "../../../hooks/useCalendarContext";
import { useState } from "react";
import { useGeneralContext } from "../../../hooks/useGeneralContext"
import { useEffect } from "react";
import { useCalendar } from "../../../hooks/useCalendarContext";
import { Modal } from "flowbite-react";
import { useAuth } from "../../../hooks/useAuthContext";

export const ModalConsulation = ({ show, handleClose, doctorId }) => {

    const { logued } = useAuth();
    const { slot } = useGeneralContext();
    const { createNewConsultation} = useCalendar();
    const [newConsultation, setNewConsultation] = useState({});
    const [status, setStatus] = useState('scheduled');
    const [type, setType] = useState('virtual');

    useEffect(() => {
        setSelectedDate(slot._instance?.range.start.toISOString().split('T')[0]);
        setTimeStart(slot._instance?.range.start.toISOString().split('T')[1].split('.')[0].substring(0, 5));
        setTimeEnd(slot._instance?.range.end.toISOString().split('T')[1].split('.')[0].substring(0, 5));
    }, [slot])

    const [selectedDate, setSelectedDate] = useState(slot._instance?.range.start.toISOString().split('T')[0]);
    const [timeStart, setTimeStart] = useState(slot._instance?.range.start.toISOString().split('T')[1].split('.')[0].substring(0, 5));
    const [timeEnd, setTimeEnd] = useState(slot._instance?.range.end.toISOString().split('T')[1].split('.')[0].substring(0, 5));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewConsultation(prevConsultation => ({ ...prevConsultation, [name]: value }));
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const setNewConsultationValues = () => {
        setNewConsultation(prevConsultation => ({
            ...prevConsultation,
            startTime: slot._instance?.range.start.toISOString(),
            endTime: slot._instance?.range.end.toISOString(),
            doctor: doctorId,
            patient: logued._id,
            type: type,
            status: status
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newConsultationData = {
            startTime: slot._instance?.range.start.toISOString(),
            endTime: slot._instance?.range.end.toISOString(),
            doctor: doctorId,
            patient: logued._id,
            type: type,
            status: status,
            reason: newConsultation.reason
        };
        setNewConsultationValues();

        createNewConsultation(newConsultationData);
    }

    return (
        <Modal show={show} handleClose={handleClose} title='Agendar consulta'>
            <div id="crud-modal" tabIndex="-1" aria-hidden="true" className='flex align-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Agendar consulta
                            </h3>
                            <button type="button" onClick={handleClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
                                    <input type="date" name="date" id="date" value={selectedDate} disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                                    <select id="status" name="status" value={status} onChange={handleStatusChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ">
                                        <option value="scheduled" >Programada</option>
                                        <option value="completed"  >Completada</option>
                                        <option value="cancelled" >Cancelada</option>
                                        <option value="rescheduled" >Reprogramada</option>
                                    </select>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="timeStart" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hora de Inicio</label>
                                    <input type="timeStart" name="timeStart" id="time" value={timeStart} disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="timeEnd" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hora de Finalización</label>
                                    <input type="timeEnd" name="timeEnd" id="time" value={timeEnd} disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                                    <select id="type"  value={type} onChange={handleTypeChange} name="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 ">
                                        <option value="virtual">Virtual</option>
                                        <option value="in person">Presencial</option>
                                    </select>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Motivo</label>
                                    <textarea id="description"  name="reason" rows="4" onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escribe el motivo de la consulta"></textarea>
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                               Agendar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    )
}