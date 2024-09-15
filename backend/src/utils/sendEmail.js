import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { Consultation } from '../modules/calendar/consultation/consultation.model.js';
import {emailTemplate} from "../config/emailMessages.js";

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
        html: message,

    });
};

cron.schedule('0 21 * * *', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));


    const consultations = await Consultation.find({
        startTime: {
            $gte: startOfDay,
            $lt: endOfDay
        },
        status: 'scheduled'
    }).populate('patient doctor');

    consultations.forEach(consultation => {
        const patientEmail = consultation.patient.email;
        const patientSubject = 'Recordatorio de Consulta Médica';
        const patientMessage = emailTemplate.patientMessage(consultation);

        sendEmail(patientEmail, patientSubject, patientMessage);

        const doctorEmail = consultation.doctor.email;
        const doctorSubject = 'Recordatorio de Consulta Médica';
        const doctorMessage = emailTemplate.doctorMessageHtml(consultation);

        sendEmail(doctorEmail, doctorSubject, doctorMessage);
    });
});

