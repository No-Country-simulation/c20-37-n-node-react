import mongoose from 'mongoose';

const medicalHistorySessionCollection = "medicalHistory";

const medicalHistorySchema = new mongoose.Schema([{
    medications: [{
        type: String
    }],
    medicalHistory: [{
        type: String
    }],
    allergies:[ {
        type: String
    }],
    vaccines: [{
        type: String
    }],
    consultations:[ {
        type: String
    }],
    diagnoses: [{
        type: String
    }],
    attachedDocuments: [{
        type: String
    }],
}], {
    timestamps: true
});
export const medicalHistoryModel = mongoose.model(medicalHistorySessionCollection, medicalHistorySchema);

