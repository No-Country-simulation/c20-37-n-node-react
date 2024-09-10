import mongoose, { Schema } from 'mongoose';

const availableTimeSchema = new Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlots: [{
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    booked: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
},{ collection: 'available-times'});

export const AvailableTime = mongoose.model('AvailableTime', availableTimeSchema);

