import availableTimeRepository from "./availableTime.repository";

const getByDoctorAndRangeTime = async (doctorId, start, end) => { 
    return await availableTimeRepository.getByDoctorAndRangeTime(doctorId, start, end); 
};

const create = async (data) => { return await availableTimeRepository.create(data); };

const updateByDoctorAndDate = async (doctorId, date, data) => { 
    return await availableTimeRepository.updateByDoctorAndDate(doctorId, date, data); 
};

const updateByDoctor = async (doctorId, data) => { 
    return await availableTimeRepository.updateByDoctor(doctorId, data); 
};

const removeByDoctorAndDate = async (doctorId, date) => { 
    return await availableTimeRepository.removeByDoctorAndDate(doctorId, date);
}

export default { getByDoctorAndRangeTime, create, updateByDoctorAndDate, updateByDoctor, removeByDoctorAndDate};
