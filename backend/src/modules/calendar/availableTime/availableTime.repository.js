import { AvailableTime } from "./availableTime.model";


const getByID = async (id) => {
    const availableTime = await AvailableTime.findById(id);
    return availableTime;
}

const getByDoctorAndRangeTime = async (doctorId, start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const availableTime = await AvailableTime.findOne(
        {
            doctor: doctorId,
            date: { 
                $gte: startDate, 
                $lte: endDate }
        });
    return availableTime;
}

const create = async (data) => {
    const availableTime = await AvailableTime.create(data);
    return availableTime;
}

const updateByDoctorAndDate = async (doctorId, date ,data) => {
    const date = new Date(date);
    const availableTime = await AvailableTime.findOneAndUpdate(
        {
            doctor: doctorId,
            date: date
        }, 
        data,  
        { new: true}
    );
    return availableTime;
};

const updateByDoctorAndDay = async (doctorId, dayOfWeek ,data) => {
    const today = Date.now();
    const availableTimes = await AvailableTime.updateMany(
        {
          doctor: doctorId,
          $expr: {
            $in: [
              { $dayOfWeek: "$date" },
              [dayOfWeek]
            ]
          },
          date: { 
            $gte: today
          }
        },
        data,  
        { new: true}
      );

    return availableTimes;
};

const updateByDoctorAndConsultation = async (doctorId, consultation) => {
    const availableTime = await AvailableTime.findOne({ 
        doctor: doctorId,
        date: consultation.date,
        timeSlots: {
            startTime: consultation.startTime,
            endTime: consultation.endTime
        }
    },{
        timeSlots: {
            booked: true
        }
    });

    return availableTime;
};

const removeByDoctorAndDate = async (doctorId, date) => {
    const date = new Date(date);
    await AvailableTime.findOneAndDelete(
        {
            doctor: doctorId,
            date: date
        }
    );

    return { success: true, message: 'Available Time deleted successfully' };
};

const removeByDoctorAndDay = async (doctorId, dayOfWeek) => {
    const today = Date.now();
    await AvailableTime.deleteMany(
        {
          doctor: doctorId,
          $expr: {
            $in: [
              { $dayOfWeek: "$date" },
              [dayOfWeek]
            ]
          },
          date: { 
            $gte: today
          }
        }
      );

    return { success: true, message: 'Available Times deleted successfully' };
};

export default {getByID, getByDoctorAndRangeTime, create, updateByDoctorAndDate, updateByDoctorAndDay, updateByDoctorAndConsultation ,removeByDoctorAndDate, removeByDoctorAndDay}