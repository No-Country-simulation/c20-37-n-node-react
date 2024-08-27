import express from 'express';
import router from './routes/index.routes.js';
import envs from './config/envs.config.js';
import { connectMongoDB } from './config/mongoDB.config.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.use('/api', router);

app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
})