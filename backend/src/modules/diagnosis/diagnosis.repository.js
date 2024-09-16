import {diagnosisModel} from "./diagnosis.model.js";


const getAll = async () => {
    const diagnosis = await diagnosisModel.find();
    return diagnosis;
}

const getById = async (id) => {
    const diagnosis = await diagnosisModel.findById(id);
    return diagnosis;
}

const create = async (data) => {
    const diagnosis = await diagnosisModel.create(data);
    return diagnosis;
}

const update = async (id,data) => {
    const diagnosis = await diagnosisModel.findByIdAndUpdate(id,data, {new:true});
    return diagnosis;
}

const remove = async (id) => {
    const diagnosis = await diagnosisModel.findByIdAndDelete(id);
    return diagnosis;
}


export default {getAll, getById, create, update, remove}