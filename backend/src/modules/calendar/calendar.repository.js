import { Calendar } from "./calendar.model";

const getByDoctor = async (doctorId) => {
    const calendar = await Calendar.findById({
        owner: doctorId
    }).populate('consultations')
    .populate({
        path: 'availability',
        match: { 'timeSlots.booked': false }
    })
    .exec();
  
    return calendar;
}

const getByPatient = async (patientId) => {
    const calendar = await Calendar.findById({
        owner: patientId
    }).populate('consultations')
    .exec();
  
    return calendar;
}

const create = async (data) => {
    const calendar = await Calendar.create(data);

    return calendar;
}

const removeByOwner = async (ownerId) => {
    await Calendar.findByIdAndDelete({
        owner: ownerId
    })
    return { success: true, message: 'Calendar deleted successfully' };
};

const updateCalendarByConsultation = async (doctorId, patientId, consultationId) => {
        const doctorCalendar = await Calendar.findOne({ owner: doctorId });
        const patientCalendar = await Calendar.findOne({ owner: patientId });

        if (!doctorCalendar || !patientCalendar) {
            throw new Error("Calendars not found");
        }

        doctorCalendar.consultations = [...new Set([...doctorCalendar.consultations, consultationId])];
        patientCalendar.consultations = [...new Set([...patientCalendar.consultations, consultationId])];

        await Promise.all([doctorCalendar.save(), patientCalendar.save()]);

        return { success: true, message: 'Calendars updated successfully' };
};

export default {getByDoctor, getByPatient, create, removeByOwner, updateCalendarByConsultation}