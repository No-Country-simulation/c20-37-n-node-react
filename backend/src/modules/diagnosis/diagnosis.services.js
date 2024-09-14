import diagnosisRepository from "./diagnosis.repository.js";       


const getAll = async () => { return await diagnosisRepository.getAll(); };

const getById = async (id) => { return await diagnosisRepository.getById(id); };

const create = async (body) => { return await diagnosisRepository.create(body); };

const update = async (id,body) => { return await diagnosisRepository.update(id,body); };

const remove = async (id) => { return await diagnosisRepository.remove(id); };


export default {getAll, getById, create, update, remove}