import axios from './axios.js'

export const registerRequest = user => axios.post('/api/session/register', user);

export const loginRequest = user => axios.post('/api/session/login', user)

export const logoutRequest = () => axios.post('/api/session/logout')

export const verifyTokenRequest = () => axios.get('/api/verifytoken')
