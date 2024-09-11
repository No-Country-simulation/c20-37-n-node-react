import axios from "axios";

export const getCalendarByOwner = (ownerId) => axios.get(`/api/calendar/${ownerId}`);

export const createCalendar = (data) => axios.post("/api/calendar", data);

export const removeByOwner = (ownerId) => axios.delete(`/api/calendar/${ownerId}`);