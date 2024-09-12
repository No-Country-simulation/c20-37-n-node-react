import consultationRepository from "./consultation.repository.js";

const getByID = async (id) => { return await consultationRepository.getByID(id); };

const getByDoctorAndRangeTime = async (doctorId, start, end) => { 
    return await consultationRepository.getByDoctorAndRangeTime(doctorId, start, end); 
};

const getByDoctorInSchedule = async (doctorId, startTime, endTime) => { 
    return await consultationRepository.getByDoctorInSchedule(doctorId, startTime, endTime); 
};

const getByPatientAndRangeTime = async (patientId, start, end) => { 
    return await consultationRepository.getByPatientAndRangeTime(patientId, start, end); 
};

const create = async (data) => { return await consultationRepository.create(data); };

const updateByID= async (id) => { 
    return await consultationRepository.updateByID(id); 
};

const removeByID = async (id) => { 
    return await consultationRepository.removeByID(id);
}

export default { getByID ,getByDoctorAndRangeTime, getByPatientAndRangeTime, getByDoctorInSchedule, create, updateByID, removeByID};
