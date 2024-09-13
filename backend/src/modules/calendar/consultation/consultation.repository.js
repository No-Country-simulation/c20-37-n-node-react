import { Consultation } from "./consultation.model.js";
import calendarServices from "../calendar.services.js";
import availableTimeServices from "../availableTime/availableTime.services.js";

const getByID = async (id) => {
    const consultation = await Consultation.findById(id);
    return consultation;
}

const getByDoctorAndRangeTime = async (doctorId, start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const consultations = await Consultation.find({
        doctor: doctorId,
        startTime: {
            $gte: startDate,
            $lt: endDate
        }
    }).populate('patient');

    let consultationsSlots = [];

    consultations.forEach(consultation => {
        consultationsSlots.push({
            _id: consultation._id,
            title: consultation.patient.firstName + ' ' + consultation.patient.lastName,
            start: consultation.startTime.toISOString(),
            end: consultation.endTime.toISOString(),
            type: 'consultation'
        });
    });

    return consultationsSlots;
};

const getByPatientAndRangeTime = async (patientId, start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const consultations = await Consultation.find(
        {
            patient: patientId,
            startTime: {
                $gte: startDate,
                $lt: endDate
            }
        });
    return consultations;
}

const getByDoctorInSchedule = async (doctorId, startTime) => {
    
    const consultation = await Consultation.findOne({
        doctor: doctorId,
        startTime: startTime,
    });
    
    return consultation;
}

const create = async (data) => {
    const consultation = await Consultation.create(data);
    console.log(consultation);
    
    await calendarServices.updateCalendarByConsultation(consultation.doctor, consultation.patient, consultation);

    return consultation;
}

const updateByID = async (id, data) => {
    console.log(data);
    
    const consultation = await Consultation.findByIdAndUpdate(id,
        data,
        { new: true }
    );
    return consultation;
};


const removeByID = async (id) => {
    await Consultation.findByIdAndDelete(id);

    return { success: true, message: 'Consultation deleted successfully' };
};

export default { getByID, getByDoctorAndRangeTime, getByPatientAndRangeTime, create, updateByID, removeByID, getByDoctorInSchedule }