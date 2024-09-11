import calendarServices from "./calendar.services.js";

const getCalendarByOwner= async (req, res) => {
    try {
        const {ownerId} = req.params;
        const calendar = await calendarServices.getByDoctor(ownerId);
        return res.status(200).json({ status: "ok", playload:calendar })
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}

const create = async (req, res) => {
    try {
        const body = req.body;
        const calendar = await calendarServices.create(body);
        return res.status(201).json({ status: "ok", msg: "Calendar created", playload: calendar });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const removeByOwner = async (req , res) => {
    try {
        const {ownerId}  = req.params;
        const response = await calendarServices.removeByOwner(ownerId);
        return res.status(200).json({ status: "ok", msg: response.message })
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}


export default {getCalendarByOwner, create ,removeByOwner}