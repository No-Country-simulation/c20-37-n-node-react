import {medicalHistoryModel} from "./medicalHistory.model.js";

const getAll = async () => {
    const medicalHistories = await medicalHistoryModel.find();
    return medicalHistories;
}

const getByID = async (id) => {
    const medicalHistory = await medicalHistoryModel.findById(id);
    return medicalHistory;
}

const create = async (data) => {
    const medicalHistory = await medicalHistoryModel.create(data);
    return medicalHistory;
}

const update = async (id,data) => {
    const medicalHistory = await medicalHistoryModel.findByIdAndUpdate(id,data,{new:true});
    return medicalHistory;
}


export default {getAll, getByID, create, update}