import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const consultationSchema = new Schema({
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: false
    },
    patientName: {
      type: String,
      required: false
    },
    patientDNI: {
      type: String,
      required: false
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
      default: 'scheduled'
    },
    reason: {
      type: String,
      required: true
    },
    type:{
      type: String,
      enum: ['in person', 'virtual'],
      default: 'virtual'
    },
    diagnosis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'diagnosis'
    }
}, {
  timestamps: true
},{ collection: 'consultations'});
export const Consultation = mongoose.model('Consultation', consultationSchema);

