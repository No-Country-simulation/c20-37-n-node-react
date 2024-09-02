import nodemailer from 'nodemailer';

import envsConfig from "../config/envs.config.js";


export const sendEmail = async (email, subject, message) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: envsConfig.EMAIL_USER,
            pass: envsConfig.EMAIL_CODE,
        },
    });

    await transporter.sendMail({
        from: envsConfig.EMAIL_USER,
        to: email,
        subject: subject,
        text: message,

    });
};
