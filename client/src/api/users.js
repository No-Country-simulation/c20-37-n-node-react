import axios from './axios.js'

export const getAllUsers = () => axios.get('/api/session/usersAll');
