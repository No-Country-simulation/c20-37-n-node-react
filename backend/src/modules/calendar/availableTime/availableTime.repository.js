import consultationServices from "../consultation/consultation.services.js";
import { AvailableTime } from "./availableTime.model.js";

const getByDoctor = async (doctorId) => {
  const availableTime = await AvailableTime.findOne(
    {
      doctor: doctorId,
    });

  return availableTime;
};

const getByDoctorAndRangeTime = async (doctorId, start, end) => {
    let availableTime = await AvailableTime.findOne({
      doctor: doctorId,
    }).lean();;

    const timeSlotsByHour = getTimeSlots(availableTime.timeSlots);
    

    const exceptionsByHour = availableTime.exceptions.map(exception => {
      const timeSlotsByHour = getTimeSlots(exception.timeSlots);
      return {
        ...exception,
        timeSlots: timeSlotsByHour
      }
    })

    availableTime = {
      ...availableTime,
      timeSlots: timeSlotsByHour,
      exceptions: exceptionsByHour
    };


    const availableSlots = [];
    const startDate = new Date(start);
    const endDate = new Date(end);
  
    for (let d= startDate; d <= endDate; d.setUTCDate(d.getUTCDate() + 1)) {
      const currentDate = new Date(d);
      const weekDay = currentDate.getUTCDay();

      const exception = availableTime.exceptions.find(
        exception => new Date(exception.date).getTime() === currentDate.getTime()
      );
  
      const timeSlots = exception ? exception.timeSlots : availableTime.timeSlots;


      if (!exception && !availableTime.daysOfWeek.includes(weekDay)) {
        continue;
      }
  
      for (let slot of timeSlots) {
        const startTime = new Date(currentDate);
        const [startHour, startMinute] = slot.startTime.split(':');
        startTime.setUTCHours(startHour, startMinute);
  
        const endTime = new Date(currentDate);
        const [endHour, endMinute] = slot.endTime.split(':');
        endTime.setUTCHours(endHour, endMinute);

        const isBooked = await consultationServices.getByDoctorInSchedule(doctorId, startTime);

        if (!isBooked) {
          availableSlots.push({
            title: 'Disponible',
            start: startTime.toISOString(),
            end: endTime.toISOString(),
            type: 'available'
          });
        }
      }
    }
  
    return availableSlots;
};

const getTimeSlots = (timeSlots) => {
  const timeSlotsByHour = [];

  for (let timeSlot of timeSlots) {
      const [startHour, startMinute] = timeSlot.startTime.split(':');
      const [endHour, endMinute] = timeSlot.endTime.split(':');

      let startTime = new Date();
      startTime.setHours(startHour, startMinute, 0, 0);
      let endTime = new Date();
      endTime.setHours(endHour, endMinute, 0, 0); 

      while (startTime < endTime) {
          let nextHour = new Date(startTime);
          nextHour.setHours(startTime.getHours() + 1);

          timeSlotsByHour.push({
              startTime: `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`,
              endTime: `${nextHour.getHours().toString().padStart(2, '0')}:${nextHour.getMinutes().toString().padStart(2, '0')}`
          });

          startTime = nextHour;
      }
  }

  return timeSlotsByHour;
}

const create = async (data) => {
  const availableTime = await AvailableTime.create(data);
  return availableTime;
}

const updateByDoctorAndDate = async (doctorId, date, data) => {

  const newTimeSlots = data.timeSlots;

  const availableTime = await AvailableTime.findOne({ doctor: doctorId });

  const newDate = new Date(date);
  

  const existingException = availableTime.exceptions.find(
    exception => new Date(exception.date).getTime() === newDate.getTime()
  );
  

  if (existingException) {
    existingException.timeSlots = newTimeSlots;
  } else {
    availableTime.exceptions.push({
      date: newDate,
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
    { new: true }
  );

  return availableTime;
};

const removeByDoctorAndDate = async (doctorId, date) => {
  const availableTime = await AvailableTime.findOne({ doctor: doctorId });
  const newDate = new Date(date);

  const existingException = availableTime.exceptions.find(
    exception => new Date(exception.date).getTime() === newDate.getTime()
  );

  if (existingException) {
    existingException.timeSlots = [];
  } else {
    availableTime.exceptions.push({
      date: newDate,
      timeSlots: []
    });
  }

  await availableTime.save();

  return availableTime;
};

export default { getByDoctor, getByDoctorAndRangeTime, create, updateByDoctorAndDate, updateByDoctor, removeByDoctorAndDate }