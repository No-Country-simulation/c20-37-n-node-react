import sessionRepository from "./session.repository.js";

const getAll = async () => {return await sessionRepository.getAll();};

const getById = async (id) => {return await sessionRepository.getById(id);};

const getByEmail = async (email) => {return await sessionRepository.getByEmail(email);};

const getByDni = async (dni) => {return await sessionRepository.getByDni(dni);};

const getUserByDni = async (dni) => {return await sessionRepository.getUserByDni(dni);}

const create = async (data) => {return await sessionRepository.create(data);};

const update = async (user,data) => {return await sessionRepository.update(user,data);};

const deleteOne = async (id) => {return await sessionRepository.deleteOne(id);};

const createPrescription = async (user,data) => {return await sessionRepository.createPrescription(user,data);}

const deletePrescription = async (user,index) => {return await sessionRepository.deletePrescription(user,index);}

export default { getAll, getById, getByEmail, create, update, deleteOne, getByDni, getUserByDni, createPrescription, deletePrescription };