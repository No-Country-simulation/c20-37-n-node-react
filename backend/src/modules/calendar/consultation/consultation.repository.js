import { Consultation } from "./consultation.model";
import calendarServices from "../calendar.services";
import availableTimeServices from "../availableTime/availableTime.services";

const getByID = async (id) => {
    const consultation = await Consultation.findById(id);
    return consultation;
}

const getByDoctorAndRangeTime = async (doctorId, start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const consultation = await Consultation.findOne(
        {
            doctor: doctorId,
            date: { 
                $gte: startDate, 
                $lte: endDate }
        });
    return consultation;
}

const getByPatientAndRangeTime = async (patientId, start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const consultation = await Consultation.findOne(
        {
            patient: patientId,
            date: { 
                $gte: startDate, 
                $lte: endDate }
        });
    return consultation;
}

const create = async (data, doctorId, patientId) => {
    const consultation = await Consultation.create(data);

    await availableTimeServices.updateByDoctorAndConsultation(doctorId, consultation);

    await calendarServices.updateCalendarByConsultation(doctorId, patientId, consultation._id);

    return consultation;
}

const updateByID = async (id ,data) => {
    const consultation = await Consultation.findByIdAndUpdate(id , 
        data,  
        { new: true}
    );
    return consultation;
};


const removeByID = async (id) => {
    await Consultation.findByIdAndDelete(id);

    return { success: true, message: 'Consultation deleted successfully' };
};

export default {getByID, getByDoctorAndRangeTime, getByPatientAndRangeTime, create, updateByID, removeByID}