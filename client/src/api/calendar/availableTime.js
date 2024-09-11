import axios from "axios";

export const getAvailableTimeByDoctor = (doctorId) => axios.get(`/api/calendar/availableTime/${doctorId}`);

export const getAvailableTimeByDoctorAndRangeDate = (doctorId, startDate, endDate) => axios.get(`/api/calendar/availableTime/${doctorId}/${startDate}/${endDate}`);

export const createDoctorAvailableTime = (data) => axios.post("/api/calendar/availableTime", data);

export const updateByDoctorAndDate = (doctorId, date, data) => axios.put(`/api/calendar/availableTime/${doctorId}/${date}`, data);

export const updateByDoctor = (doctorId, data) => axios.put(`/api/calendar/availableTime/${doctorId}`, data);

export const removeByDoctorAndDate = (doctorId, date) => axios.delete(`/api/calendar/availableTime/${doctorId}/${date}`);