import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import envsConfig from "../config/envs.config.js";


const oAuth2Client = new google.auth.OAuth2(envsConfig.ID_CLIENTE, envsConfig.ID_SECRECT_CODE, envsConfig.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: envsConfig.REFRESH_CODE});


async function sendEmail(email, subject, message) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: envsConfig.EMAIL_USER,
                clientId: envsConfig.ID_CLIENTE,
                clientSecret: envsConfig.ID_SECRECT_CODE,
                refreshToken: envsConfig.REFRESH_CODE,
                accessToken: envsConfig.ACCESS_TOKEN,
            },
        });

        const mailOptions = {
            from: envsConfig.EMAIL_USER,
            to: email,
            subject: subject,
            text: message,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent:', result);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default sendEmail;
