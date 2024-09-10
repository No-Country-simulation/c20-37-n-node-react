import { Schema } from 'mongoose';

const consultationSchema = new Schema({
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
      enum: ['scheduled', 'completed', 'cancelled', 'rescheduled','cancellation requested', 'rescheduling requested'],
      default: 'scheduled'
    },
    reason: {
      type: String,
      required: true
    }
}, {
  timestamps: true
},{ collection: 'consultations'});
export const Consultation = mongoose.model('Consultation', consultationSchema);

