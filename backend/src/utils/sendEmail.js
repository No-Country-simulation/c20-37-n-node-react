import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { Consultation } from '../modules/calendar/consultation/consultation.model.js';

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

cron.schedule('0 18 * * *', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const consultations = await Consultation.find({
    startTime: {
        $gte: new Date(tomorrow.setHours(0, 0, 0, 0)),
        $lt: new Date(tomorrow.setHours(23, 59, 59, 999))
    },
    status: 'scheduled'
    }).populate('patient doctor');

 consultations.forEach(consultation => {
    const patientEmail = consultation.patient.email;
    const patientSubject = 'Recordatorio de Consulta Médica';
    const patientMessage = `Hola ${consultation.patient.firstName}, tienes una consulta médica programada para el ${consultation.startTime}. Razón: ${consultation.reason}`;

    sendEmail(patientEmail, patientSubject, patientMessage);

    const doctorEmail = consultation.doctor.email;
    const doctorSubject = 'Recordatorio de Consulta Médica';
    const doctorMessage = `Hola Dr. ${consultation.doctor.firstName}, tienes una consulta médica programada con ${consultation.patient.firstName} ${consultation.patient.lastName} para el ${consultation.startTime}. Razón: ${consultation.reason}`;

    sendEmail(doctorEmail, doctorSubject, doctorMessage);
});
});