import medicalHistoryRepository from "./medicalHistory.repository.js";


const getAll = async () => {return await medicalHistoryRepository.getAll();};

const getByID = async (id) => {return await medicalHistoryRepository.getByID(id);};

const create = async (data) => {return await medicalHistoryRepository.create(data);};

const update = async (id,data) => {return await medicalHistoryRepository.update(id,data);};


export default { getAll, getByID, create, update };
