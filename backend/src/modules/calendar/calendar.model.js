import mongoose from 'mongoose';

const calendarSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  availability: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'AvailableTime',
    }],
  consultations: [
    {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Consultation',
    }
  ]
}, {
  timestamps: true
},{ collection: 'calendars'});
export const Calendar = mongoose.model('Calendar', calendarSchema);

