import mongoose from 'mongoose';

const diagnosisCollection = "diagnosis";

const diagnosisSchema = new mongoose.Schema({
    consulta_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consultation',
        required: true
    },
    medicoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaDiagnostico: {
        type: Date,
        required: true,
        default: Date.now
    },
    tratamientoRecomendado: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const diagnosisModel = mongoose.model(diagnosisCollection, diagnosisSchema)