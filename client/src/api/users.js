import axios from './axios.js'

export const getAllUsers = () => axios.get('/api/session/usersAll');

export const updateUser = (id, user) => axios.put('/api/session/update/' + id, user);