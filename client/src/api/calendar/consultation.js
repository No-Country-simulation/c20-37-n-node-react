import axios from "../axios";

export const getConsultationByID = (id) => axios.get(`/api/calendar/consultation/${id}`);

export const getConsultationByDoctorAndRangeDate = (doctorId, startDate, endDate) => axios.get(`/api/calendar/consultation/doctor/${doctorId}/${startDate}/${endDate}`);

export const getConsultationByPatientAndRangeDate = (patientId, startDate, endDate) => axios.get(`/api/calendar/consultation/patient/${patientId}/${startDate}/${endDate}`);

export const createConsultation = (data) => axios.post("/api/calendar/consultation", data);

export const updateConsultationByID = (id, data) => axios.put(`/api/calendar/consultation/${id}`, data);

export const removeConsultationByID = (id) => axios.delete(`/api/calendar/consultation/${id}`);