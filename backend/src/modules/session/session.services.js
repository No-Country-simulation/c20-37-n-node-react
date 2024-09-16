import sessionRepository from "./session.repository.js";

const getAll = async () => {return await sessionRepository.getAll();};

const getById = async (id) => {return await sessionRepository.getById(id);};

const getByEmail = async (email) => {return await sessionRepository.getByEmail(email);};

const getByDni = async (dni) => {return await sessionRepository.getByDni(dni);};

const getUserByDni = async (dni) => {return await sessionRepository.getUserByDni(dni);}

const create = async (data) => {return await sessionRepository.create(data);};

const update = async (id,data) => {return await sessionRepository.update(id,data);};

const deleteOne = async (id) => {return await sessionRepository.deleteOne(id);};

export default { getAll, getById, getByEmail, create, update, deleteOne, getByDni, getUserByDni };