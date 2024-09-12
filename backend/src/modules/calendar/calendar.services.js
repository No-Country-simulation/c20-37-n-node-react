import calendarRepository from "./calendar.repository.js";

const getByOwner = async (doctorId) => { return await calendarRepository.getByOwner(ownerId); };

const create = async (data) => { return await calendarRepository.create(data); };

const updateCalendarByConsultation = async (doctorId, patientId, consultationId) => {
    return await calendarRepository.updateCalendarByConsultation(doctorId, patientId, consultationId);
};

const removeByOwner = async (ownerId) => { return await calendarRepository.removeByOwner(ownerId); }

export default { getByOwner, create, updateCalendarByConsultation, removeByOwner };
// getByPatient
