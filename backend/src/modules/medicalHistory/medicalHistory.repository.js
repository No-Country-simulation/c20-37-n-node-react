import {medicalHistoryModel} from "./medicalHistory.model.js";

const getAll = async () => {
    const medicalHistories = await medicalHistoryModel.find();
    return medicalHistories;
}

const getByID = async (id) => {
    const medicalHistory = await medicalHistoryModel.findById(id);
    return medicalHistory;
}

const create = async () => {
    const medicalHistory = await medicalHistoryModel.create({});
    return medicalHistory;
}

const update = async (id, data) => {
    const medicalHistory = await medicalHistoryModel.findByIdAndUpdate(
        id,
        {
            $addToSet: data,  
        },
        { new: true, upsert: false }
    );
    return medicalHistory;
};

const removeSubdocumentById = async (id, element, position) => {
    try {
        const document = id;
        if (position >= 0 && position < document[element].length) {
            const removedElement = document[element].splice(position, 1)[0];
            await document.save();
            return removedElement; 
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
    }
};



export default {getAll, getByID, create, update, removeSubdocumentById}