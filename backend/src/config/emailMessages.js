

export const emailTemplate = {
    welcome: (userName, link) => `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50;">¡Bienvenido a SaludNet!</h1>
        <p>Estimado/a <strong>${userName}</strong>,</p>
        <p>Gracias por registrarte en <strong>SaludNet</strong>. Estamos emocionados de que te unas a nuestra plataforma, donde podrás gestionar tus citas médicas, acceder a tu historial médico y mucho más.</p>
        <p>Para empezar, inicia sesión en tu cuenta usando el siguiente enlace:</p>
        <p style="text-align: center;">
            <a href="${link}" 
               style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
               Iniciar Sesión 
            </a>
        </p>
        <p>Si tienes alguna pregunta, no dudes en contactar con nosotros a través de nuestro soporte.</p>
        <p>Gracias por confiar en <strong>SaludNet</strong>.</p>
        <p>Saludos cordiales,<br>El equipo de SaludNet</p>
        <hr style="border: none; border-top: 1px solid #ccc;" />
        <p style="font-size: 12px; color: #777;">
            Este es un correo automático, por favor no responda. Si necesita ayuda, visite nuestra web <a href="${link}" style="color: #4CAF50;">Centro de Ayuda</a>.
        </p>
    </div>
`,
    patientMessage:(consultation)=>`
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50;">Recordatorio de Consulta Médica</h1>
        <p>Hola <strong>${consultation.patient.firstName}</strong>,</p>
        <p>Este es un recordatorio de que tienes una consulta médica programada para el <strong>${consultation.startTime}</strong>.</p>
        <p><strong>Razón:</strong> ${consultation.reason}</p>
        <p>Por favor, asegúrate de estar disponible a la hora programada.</p>
        <p>Si tienes alguna pregunta o necesitas reprogramar, no dudes en contactarnos.</p>
        <p>Saludos cordiales,<br>El equipo de SaludNet</p>
        <hr style="border: none; border-top: 1px solid #ccc;" />
        <p style="font-size: 12px; color: #777;">
            Este es un correo automático, por favor no responda. Si necesitas ayuda, visita nuestro <a href="{{enlaceSoporte}}" style="color: #4CAF50;">Centro de Ayuda</a>.
        </p>
    </div>
`,
    doctorMessageHtml:(consultation)=> `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50;">Recordatorio de Consulta Médica</h1>
        <p>Hola Dr. <strong>${consultation.doctor.firstName}</strong>,</p>
        <p>Este es un recordatorio de que tienes una consulta médica programada con <strong>${consultation.patient.firstName} ${consultation.patient.lastName}</strong> para el <strong>${consultation.startTime}</strong>.</p>
        <p><strong>Razón:</strong> ${consultation.reason}</p>
        <p>Por favor, asegúrate de estar disponible a la hora programada.</p>
        <p>Saludos cordiales,<br>El equipo de SaludNet</p>
        <hr style="border: none; border-top: 1px solid #ccc;" />
        <p style="font-size: 12px; color: #777;">
            Este es un correo automático, por favor no responda. Si necesitas ayuda, visita nuestro <a href="{{enlaceSoporte}}" style="color: #4CAF50;">Centro de Ayuda</a>.
        </p>
    </div>
`,
    consultationCreatedHtml:(patient, doctor, consultation)=> `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50;">Consulta Médica Creada con Éxito</h1>
        <p>Hola <strong>${patient.firstName}</strong>,</p>
        <p>Te informamos que tu consulta médica ha sido creada con éxito. Aquí tienes los detalles:</p>
        <ul style="list-style: none; padding: 0;">
            <li><strong>Doctor:</strong> Dr. ${doctor.firstName} ${doctor.lastName}</li>
            <li><strong>Fecha y Hora:</strong> ${consultation.startTime}</li>
            <li><strong>Razón de la consulta:</strong> ${consultation.reason}</li>
        </ul>
        <p>Por favor, asegúrate de estar disponible a la hora programada. Si necesitas cancelar o reprogramar la consulta, contáctanos con anticipación.</p>
        <p>Saludos cordiales,<br>El equipo de SaludNet</p>
        <hr style="border: none; border-top: 1px solid #ccc;" />
        <p style="font-size: 12px; color: #777;">
            Este es un correo automático, por favor no responda. Si necesitas ayuda, visita nuestro <a href="{{enlaceSoporte}}" style="color: #4CAF50;">Centro de Ayuda</a>.
        </p>
    </div>
`
    
}