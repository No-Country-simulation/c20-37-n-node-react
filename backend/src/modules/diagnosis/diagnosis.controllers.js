import diagnosisServices from "./diagnosis.services.js";
import { request, response } from "express";

const getById = async (req = request, res = response) => {
    try {
        const {id} = req.params
        const diagnosis = await diagnosisServices.getById(id)
        if (!diagnosis) return res.status(404).json({ status: "error", msg: "Diagnosis not found" })
        return res.status(200).json({ status: "ok", playload:diagnosis })
    } catch (error) {
        res.status(500).json ({status:"error", msg:"Internal server error"})
    }
}

const update = async (req = request, res = response) => {
    try {
        const {id} = req.params
        const body = req.body
        const diagnosis = await diagnosisServices.update(id, body)
        if (!diagnosis) return res.status(404).json({ status: "error", msg: "Diagnosis not found" })
        return res.status(200).json({ status: "ok", playload:diagnosis })
    } catch (error) {
        res.status(500).json({status:"error",msg:"Internal server error"});
    }
}

const create = async (req = request, res = response) => {
    try {
        const {body} = req
        const diagnosis = await diagnosisServices.create(body);
        return res.status(201).json({ status: "ok", msg: "Diagnosis created", playload: diagnosis })
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}

const remove = async (req = request, res = response) => {
    try {
        const {id} = req.params
        const diagnosis = await diagnosisServices.remove(id)
        if (!diagnosis) return res.status(404).json({ status: "error", msg: "Diagnosis not found" })
        return res.status(200).json({ status: "ok", playload:diagnosis })
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}
export default {getById, update, create, remove}