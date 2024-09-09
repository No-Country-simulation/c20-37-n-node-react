import { userSession } from "./session.model.js";


const getAll = async () => {
    const users = await userSession.find()
    return users;
}

const getById = async (id) => {
    const user = await userSession.findById(id);
    return user;
}
const getByDni = async (dni) => {
    const user = await userSession.findOne({ dni: dni }).populate('medicalHistory');
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
const update = async (id, data) => {
    try {
        const currentUser = await userSession.findById(id);
        if (!currentUser) {
            throw new Error('User not found');
        }
        const updateData = { ...data };
        const unsetFields = {};
        const errorMessages = [];
        if (data.role && currentUser.role !== data.role) {
            if (data.role !== 'doctor') {
                unsetFields.licenseNumber = "";
                unsetFields.yearsExperience = "";
                unsetFields.professionalInfo = "";
                unsetFields.specialty = "";
            }
        }
        if (data.role && data.role !== 'doctor') {
            if (data.licenseNumber || data.yearsExperience || data.professionalInfo || data.specialty) {
                errorMessages.push('Cannot add doctor-specific fields to a user who is not a doctor.');
            }
        }
        if (errorMessages.length > 0) {
            throw new Error(errorMessages.join(' '));
        }
        const updatedUser = await userSession.findByIdAndUpdate(
            id, 
            { $set: updateData, $unset: unsetFields }, 
            { new: true }
        );
        return updatedUser;
    } catch (error) {
        return { error: error.message };
    }
};

const deleteOne = async (id) => {
    const user = await userSession.findByIdAndUpdate(id, {status:false}, {new:true});
    return user;
}


export default { getAll, getById, getByEmail, create, update, deleteOne, getByDni }