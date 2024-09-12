import availableTimeServices from "./availableTime.services.js";

const getAvailableTimeByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const availableTime = await availableTimeServices.getByDoctor(doctorId);
        return res.status(200).json({ status: "ok", playload: availableTime })
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const getAvailableTimeByDoctorAndRangeTime = async (req, res) => {
    try {
        const { doctorId, start, end } = req.params;        
        const availableTime = await availableTimeServices.getByDoctorAndRangeTime(doctorId, start, end);
        return res.status(200).json({ status: "ok", playload: availableTime })
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

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

const create = async (req, res) => {
    try {
        const body = req.body;

        const timeSlotsByHour = getTimeSlots(body.timeSlots);
        
        const newBody = {
            ...body,
            timeSlots: timeSlotsByHour
        };

        const availableTime = await availableTimeServices.create(newBody);
        return res.status(201).json({ status: "ok", msg: "available time created", playload: availableTime });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const updateByDoctorAndDate = async (req, res) => {
    try {
        const { doctorId, date } = req.params;
        const body = req.body;
        const timeSlotsByHour = getTimeSlots(body.timeSlots);
        
        const newBody = {
            ...body,
            timeSlots: timeSlotsByHour
        };
        const availableTime = await availableTimeServices.updateByDoctorAndDate(doctorId, date, newBody);
        return res.status(201).json({ status: "ok", msg: "available time updated", playload: availableTime });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const updateByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const body = req.body;
        const timeSlotsByHour = getTimeSlots(body.timeSlots);
        
        const newBody = {
            ...body,
            timeSlots: timeSlotsByHour
        };
        const availableTime = await availableTimeServices.updateByDoctor(doctorId, newBody);
        return res.status(201).json({ status: "ok", msg: "available time updated", playload: availableTime });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const removeByDoctorAndDate = async (req, res) => {
    try {
        const { doctorId, date } = req.params;
        const availableTime = await availableTimeServices.removeByDoctorAndDate(doctorId, date);
        return res.status(200).json({ status: "ok", msg: "available times specific deleted", playload: availableTime })
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}



export default { getAvailableTimeByDoctor, getAvailableTimeByDoctorAndRangeTime, create, updateByDoctorAndDate, updateByDoctor, removeByDoctorAndDate }