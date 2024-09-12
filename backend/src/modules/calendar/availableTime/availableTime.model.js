import mongoose, { Schema } from 'mongoose';

const availableTimeSchema = new Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  daysOfWeek: [{
    type: Number,
    required: true
  }],
  timeSlots: [{
    startTime: {
      type: String, //HH:mm
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  }],
  exceptions: [{
    date: {
      type: Date,
      required: true
    },
    timeSlots: [{
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      }
    }]
  }]
}, {
  timestamps: true
},{ collection: 'available-times'});

export const AvailableTime = mongoose.model('AvailableTime', availableTimeSchema);

