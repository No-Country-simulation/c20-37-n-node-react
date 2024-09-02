import { userSession } from "./session.model.js";

const getAll = async () => {
    const users = await userSession.find()
    return users;
}

const getById = async (id) => {
    const user = await userSession.findById(id);
    return user;
}

const getByEmail = async (email) => {
    const user = await userSession.findOne({ email: email});
    return user;
}

const create = async (data) => {
    const user = await userSession.create(data);
    return user;
}

const update = async (id,data) => {
    const user = await userSession.findByIdAndUpdate(id,data,{new:true});
    return user;
}

const deleteOne = async (id) => {
    const user = await userSession.findByIdAndUpdate(id, {status:false}, {new:true});
    return user;
}

export default { getAll, getById, getByEmail, create, update, deleteOne }