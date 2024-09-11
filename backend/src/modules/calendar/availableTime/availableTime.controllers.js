import availableTimeServices from "./availableTime.services";

const getAvailableTimeByID = async (req, res) => {
    try {
        const {id} = req.params;
        const availableTime = await availableTimeServices.getByID(id);
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
        const availableTime = await availableTimeServices.create(body);
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

const updateByDoctorAndDay = async (req, res) => {
    try {
        const {doctorId, dayOfWeek} = req.params;
        const body = req.body;
        const availableTime = await availableTimeServices.updateByDoctorAndDay(doctorId, dayOfWeek, body);
        return res.status(201).json({ status: "ok", msg: "available time updated", playload: availableTime });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const removeByDoctorAndDate = async (req , res) => {
    try {
        const {doctorId, date} = req.params;
        const response = await availableTimeServices.removeByDoctorAndDate(doctorId, date);
        return res.status(200).json({ status: "ok", msg: response.message })
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}

const removeByDoctorAndDay = async (req , res) => {
    try {
        const {doctorId, dayOfWeek} = req.params;
        const response = await availableTimeServices.removeByDoctorAndDay(doctorId, dayOfWeek);
        return res.status(200).json({ status: "ok", msg: response.message })
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}


export default {getAvailableTimeByID, getAvailableTimeByDoctorAndRangeTime, create, updateByDoctorAndDate, updateByDoctorAndDay, removeByDoctorAndDate, removeByDoctorAndDay}