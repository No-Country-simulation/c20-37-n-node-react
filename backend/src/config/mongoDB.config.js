import mongoose from 'mongoose';
import envs from '../config/envs.config.js';

export const connectMongoDB = async ()=>{
    try {
        console.log(envs.MONGO_URL)
        mongoose.connect(envs.MONGO_URL);
        console.log('MongoDB connected')
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}