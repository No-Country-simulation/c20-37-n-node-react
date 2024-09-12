import availableTimeServices from "./availableTime.services";

const getAvailableTimeByDoctor= async (req, res) => {
    try {
        const {doctorId} = req.params;
        const availableTime = await availableTimeServices.getByDoctor(doctorId);
        return res.status(200).json({ status: "ok", playload:availableTime })
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}

const getAvailableTimeByDoctorAndRangeTime = async (req, res) => {
    try {
        const {doctorId, start, end} = req.params;
        const availableTime = await availableTimeServices.getByDoctorAndRangeTime(doctorId, start, end);
        return res.status(200).json({ status: "ok", playload:availableTime })
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}

const create = async (req, res) => {
    try {
        const body = req.body;
        const timeSlotsByHour = [];

        for (let timeSlot of body.timeSlots) {
            const startTime = new Date();
            const [startHour, startMinute] = timeSlot.startTime.split(':');
            startTime.setHours(startHour, startMinute);

            const endTime = new Date();
            const [endHour, endMinute] = timeSlot.endTime.split(':');
            endTime.setHours(endHour, endMinute);


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
        const {doctorId, date} = req.params;
        const body = req.body;
        const availableTime = await availableTimeServices.updateByDoctorAndDate(doctorId, date, body);
        return res.status(201).json({ status: "ok", msg: "available time updated", playload: availableTime });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const updateByDoctor = async (req, res) => {
    try {
        const {doctorId} = req.params;
        const body = req.body;
        const availableTime = await availableTimeServices.updateByDoctor(doctorId, body);
        return res.status(201).json({ status: "ok", msg: "available time updated", playload: availableTime });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const removeByDoctorAndDate = async (req , res) => {
    try {
        const {doctorId, date} = req.params;
        const availableTime= await availableTimeServices.removeByDoctorAndDate(doctorId, date);
        return res.status(200).json({ status: "ok", msg: "available times specific deleted", playload: availableTime})
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}



export default {getAvailableTimeByDoctor, getAvailableTimeByDoctorAndRangeTime, create, updateByDoctorAndDate, updateByDoctor, removeByDoctorAndDate}