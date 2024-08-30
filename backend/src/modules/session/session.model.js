import mongoose from 'mongoose';

const userSessionCollection= "user"

const sessionSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'doctor', 'admin'],
        default: 'user'
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true 
});


export const userSession = mongoose.model(userSessionCollection, sessionSchema);
