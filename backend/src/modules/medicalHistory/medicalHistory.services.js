import medicalHistoryRepository from "./medicalHistory.repository.js";


const getAll = async () => {return await medicalHistoryRepository.getAll();};

const getByID = async (id) => {return await medicalHistoryRepository.getByID(id);};

const create = async () => {return await medicalHistoryRepository.create();};

const update = async (id,data) => {return await medicalHistoryRepository.update(id,data);};

const removeSubdocumentById= async(id, element , position) => {
    return await medicalHistoryRepository.removeSubdocumentById(id, element , position);
}

export default { getAll, getByID, create, update, removeSubdocumentById };
