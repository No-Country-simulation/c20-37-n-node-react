import calendarRepository from "./calendar.repository.js";


const getByDoctor = async (doctorId) => { return await calendarRepository.getByDoctor(doctorId); };

const getByPatient = async (patientId) => { return await calendarRepository.getByPatient(patientId); };

const create = async (data) => { return await calendarRepository.create(data); };

const updateCalendarByConsultation = async (doctorId, patientId, consultationId) => { 
    return await calendarRepository.updateCalendarByConsultation(doctorId, patientId, consultationId); 
};

const removeByOwner = async (ownerId) => { return await calendarRepository.removeByOwner(ownerId); }

export default { getByDoctor, getByPatient, create, updateCalendarByConsultation, removeByOwner};
