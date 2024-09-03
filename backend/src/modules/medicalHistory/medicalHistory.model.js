import mongoose from 'mongoose';

const medicalHistorySessionCollection = "medicalHistory";

const medicalHistorySchema = new mongoose.Schema({
    medications: {
        type: [{
            name: String,
            dosage: String,
            startDate: Date,
            endDate: Date
        }],
        default: []
    },
    medicalHistory: {
        type: [{
            condition: String,
            diagnosisDate: Date,
            treatment: String
        }],
        default: []
    },
    allergies: {
        type: [{
            allergen: String,
            reaction: String,
            severity: String
        }],
        default: []
    },
    vaccines: {
        type: [{
            name: String,
            administrationDate: Date,
            dosage: String
        }],
        default: []
    },
    consultations: {
        type: [{
            consultationDate: Date,
            doctor: String,
            notes: String
        }],
        default: []
    },
    diagnoses: {
        type: [{
            diagnosis: String,
            date: Date,
            treatment: String
        }],
        default: []
    },
    attachedDocuments: {
        type: [{
            name: String,
            url: String,
            uploadDate: Date
        }],
        default: []
    }
}, {
    timestamps: true
});
export const medicalHistoryModel = mongoose.model(medicalHistorySessionCollection, medicalHistorySchema);

