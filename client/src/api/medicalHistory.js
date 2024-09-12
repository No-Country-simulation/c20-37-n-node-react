import axios from './axios.js'

export const getMedicalHistory = (id) => axios.get('/api/session/medicalHistory/' + id);

export const updateMedicalHistory = (id, data) => axios.put('/api/medicalHistory/' + id, data);