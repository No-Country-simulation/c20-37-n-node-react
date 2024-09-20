import mongoose from 'mongoose';

const userSessionCollection = "user";

const sessionSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ["Male", "Female", "Other"],
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
    phone: {
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
    },
    birthdate: {
        type: Date,
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    dni: {
        type: String,
        unique: true,
        required: true
    },
    licenseNumber: { 
        type: String, 
        required: function() { return this.role === 'doctor'; }
    },
    yearsExperience: { 
        type: Number, 
        required: function() { return this.role === 'doctor'; }
    },
    professionalInfo: { 
        type: String, 
        required: function() { return this.role === 'doctor'; }
    },
    specialty:{
        type: String,
        required: function() { return this.role === 'doctor'; }
    },
    medicalHistory:{
        type: mongoose.Schema.Types.ObjectId, ref:"medicalHistory"},
    prescriptions: [{
            medicationName: {
                type: String,
            },
            dosage: {
                type: String,
            },
            frequency: {
                type: String,
            },
            duration: {
                type: String,
            }
        }]
}, {
    timestamps: true,
    default: []
});


export const userSession = mongoose.model(userSessionCollection, sessionSchema);
