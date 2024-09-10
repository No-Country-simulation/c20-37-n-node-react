import express from 'express';
import router from './routes/index.routes.js';
import __dirname from './utils.js';
import envs from './config/envs.config.js';
import session from "express-session"
import { connectMongoDB } from './config/mongoDB.config.js';
import { initializePassport } from "./config/passport.config.js";
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();

connectMongoDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session(
    {
        secret: envs.SECRET_CODE,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        },
        name: 'connect.sid'
    }
));
app.use(cors({
    origin: envs.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);

app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
})