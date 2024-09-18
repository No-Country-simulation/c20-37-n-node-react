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

const updateCalendarByConsultation = async (ownerId, consultationId) => {
    
    const ownerCalendar = await Calendar.findOne({ owner: ownerId });

    const updateCalendar = async (calendar) => {
        if (!calendar.consultations.includes(consultationId)) {
            calendar.consultations.push(consultationId);
        }
        await calendar.save();
    };

    await updateCalendar(ownerCalendar)

    return { success: true, message: 'Calendar updated successfully' };
};

export default { getByOwner, create, removeByOwner, updateCalendarByConsultation }