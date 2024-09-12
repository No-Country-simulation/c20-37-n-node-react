import consultationServices from "../consultation/consultation.services";
import { AvailableTime } from "./availableTime.model";

const getByDoctor = async (doctorId, start, end) => {
  const availableTime = await AvailableTime.findOne(
  {
      doctor: doctorId,
  });

  return availableTime;
}

const getByDoctorAndRangeTime = async (doctorId, start, end) => {
    const availableTime = await AvailableTime.findOne(
    {
        doctor: doctorId,
    });

    const availableSlots = [];
    const startDate = new Date(start);
    const endDate = new Date(end);
   
    for (let currentDate = startDate; currentDate <= endDate; current.setDate(current.getDate() + 1)) {
      const weekDay = currentDate.getDay();

      const exception = availableTime.exceptions.find(
        exception => exception.date === currentDate
    );

      const timeSlots = exception ? exception.timeSlots : availableTime.timeSlots;

    if (!exception && !availableTime.daysOfWeek.includes(weekDay)) {
        // Si no es un día de la semana disponible y no hay excepción, saltar este día
        continue;
    }
  
        for (let slot of timeSlots) {

          const startTime = new Date(currentDate);
          const [startHour, startMinute] = slot.startTime.split(':');
          startTime.setHours(startHour, startMinute);

          const endTime = new Date(currentDate);
          const [endHour, endMinute] = slot.endTime.split(':');
          endTime.setHours(endHour, endMinute);
          
          const isBooked = await consultationServices.getByDoctorInSchedule(doctorId, startTime, endTime);
  
          if (!isBooked) {
            availableSlots.push({
              title: 'Disponible',
              start: startTime.toISOString(),
              end: endTime.toISOString(),
            });
          }
        }
    }

    return availableSlots;
}

const create = async (data) => {
    const availableTime = await AvailableTime.create(data);
    return availableTime;
}

const updateByDoctorAndDate = async (doctorId, date, newTimeSlots) => {
  
  const availableTime = await AvailableTime.findOne({ doctor: doctorId });

    const date = new Date(date);

    const existingException = availableTime.exceptions.find(
        exception => exception.date === date
    );

    if (existingException) {
        existingException.timeSlots = newTimeSlots;
    } else {
        availableTime.exceptions.push({
            date: date,
            timeSlots: newTimeSlots
        });
    }

    await availableTime.save();

    return availableTime;
};

const updateByDoctor = async (doctorId, data) => {
    const availableTime = await AvailableTime.updateOne(
        {
          doctor: doctorId
        },
        data,  
        { new: true}
      );

    return availableTime;
};

const removeByDoctorAndDate = async (doctorId, date) => {
  const availableTime = await AvailableTime.findOne({ doctor: doctorId });

    const date = new Date(date);

    const existingException = availableTime.exceptions.find(
        exception => exception.date === date
    );

    if (existingException) {
        existingException.timeSlots = availableTime.timeSlots;
    } else {
        availableTime.exceptions.push({
            date: date,
            timeSlots: availableTime.timeSlots
        });
    }

    await availableTime.save();

    return availableTime;
};

export default { getByDoctor,getByDoctorAndRangeTime, create, updateByDoctorAndDate, updateByDoctor, removeByDoctorAndDate}