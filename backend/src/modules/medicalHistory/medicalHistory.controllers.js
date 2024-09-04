import { request, response } from "express";
import medicalHistoryServices from "./medicalHistory.services.js";

const medicalHistoryUpdate = async (req=request, res=response) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const medicalHistory = await medicalHistoryServices.update(id, body)
        return res.status(200).json({ status: "ok", playload:medicalHistory })
    } catch (error) {
        res.status(500).json({status: "error", msg:"Internal server error"});
    }
}

const getMedicalHistory = async (req=request, res=response) => {
    try {
        const {id} = req.params;
        const medicalHistory = await medicalHistoryServices.getByID(id);
        return res.status(200).json({ status: "ok", playload:medicalHistory })
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}

const removeSubdocumentById = async (req = request, res=response) => {
    try {
        const {id}  = req.params;
        const {element , position} = req.body;
        const medicalHistoryId = await medicalHistoryServices.getByID(id);
        if (!medicalHistoryId) {return res.status(404).json({ status: "error", msg: "Medical history not found" })}
        const medicalHistory = await medicalHistoryServices.removeSubdocumentById(medicalHistoryId,element,position);
        if (medicalHistory == false){return res.status(404).json({ status: "error", msg: "Element not found" })}
        return res.status(200).json({ status: "ok", playload:medicalHistoryId, msg: `Element successfully removed from array: ${medicalHistory}` })
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}


export default {medicalHistoryUpdate, getMedicalHistory, removeSubdocumentById}