import { Calendar } from "./calendar.model.js";

const getByOwner = async (ownerId) => {
    const calendar = await Calendar.findOne({
        owner: ownerId
    }).populate('consultations')
        .exec();

    return calendar;
}

const create = async (data) => {
    const calendar = await Calendar.create(data);

    return calendar;
}

const removeByOwner = async (ownerId) => {
    await Calendar.findOneAndDelete({
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

    const updateCalendar = async (calendar) => {
        if (!calendar.consultations.includes(consultationId)) {
            calendar.consultations.push(consultationId);
        }
        await calendar.save();
    };

    await Promise.all([
        updateCalendar(doctorCalendar),
        updateCalendar(patientCalendar)
    ]);

    return { success: true, message: 'Calendars updated successfully' };
};

export default { getByOwner, create, removeByOwner, updateCalendarByConsultation }