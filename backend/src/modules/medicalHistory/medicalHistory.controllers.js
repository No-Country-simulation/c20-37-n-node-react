import { request, response } from "express";
import medicalHistoryServices from "./medicalHistory.services.js";

const medicalHistoryCreate = async (req=request, res=response) => {
    try {
        const body = req.body;
        const medicalHistory = await medicalHistoryServices.create(body)
        return res.status(201).json({ status: "ok", playload:medicalHistory })
    } catch (error) {
        console.log(error)
        res.status(500).json({status: "error", msg:"Internal server error"});
    }
}

export default {medicalHistoryCreate}