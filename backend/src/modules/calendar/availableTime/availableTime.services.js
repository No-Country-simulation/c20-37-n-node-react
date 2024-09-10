import availableTimeRepository from "./availableTime.repository";

const getByID = async (id) => { return await availableTimeRepository.getByID(id); };

const getByDoctorAndRangeTime = async (doctorId, start, end) => { 
    return await availableTimeRepository.getByDoctorAndRangeTime(doctorId, start, end); 
};

const create = async (data) => { return await availableTimeRepository.create(data); };

const updateByDoctorAndDate = async (doctorId, date, data) => { 
    return await availableTimeRepository.updateByDoctorAndDate(doctorId, date, data); 
};

const updateByDoctorAndDay = async (doctorId, dayOfWeek, data) => { 
    return await availableTimeRepository.updateByDoctorAndDay(doctorId, dayOfWeek, data); 
};

const updateByDoctorAndConsultation = async (doctorId, consultation) => { 
    return await availableTimeRepository.updateByDoctorAndConsultation(doctorId, consultation); 
};

const removeByDoctorAndDate = async (doctorId, date) => { 
    return await availableTimeRepository.removeByDoctorAndDate(doctorId, date);
}

const removeByDoctorAndDay = async (doctorId, dayOfWeek) => { 
    return await availableTimeRepository.removeByDoctorAndDay(doctorId, dayOfWeek); 
};

export default { getByID ,getByDoctorAndRangeTime, create, updateByDoctorAndDate, updateByDoctorAndDay, updateByDoctorAndConsultation, removeByDoctorAndDate, removeByDoctorAndDay};
