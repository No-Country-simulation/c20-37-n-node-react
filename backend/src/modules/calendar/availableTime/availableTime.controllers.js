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
        let availableTime = await availableTimeServices.getByDoctorAndRangeTime(doctorId, start, end);

        return res.status(200).json({ status: "ok", playload: availableTime })
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const create = async (req, res) => {
    try {
        const body = req.body;

        const availableTime = await availableTimeServices.create(body);
        return res.status(201).json({ status: "ok", msg: "available time created", playload: availableTime });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const updateByDoctorAndDate = async (req, res) => {
    try {
        const { doctorId, date } = req.params;
        const body = req.body;
        
        const availableTime = await availableTimeServices.updateByDoctorAndDate(doctorId, date, body);
        return res.status(201).json({ status: "ok", msg: "available time updated", playload: availableTime });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const updateByDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const body = req.body;
        
        const availableTime = await availableTimeServices.updateByDoctor(doctorId, body);
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