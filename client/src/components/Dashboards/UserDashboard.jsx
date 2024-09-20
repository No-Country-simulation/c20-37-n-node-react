/* eslint-disable react/prop-types */
import { useGeneralContext } from '../../hooks/useGeneralContext'
import { Card, Button } from 'flowbite-react'
import { FaCalendarAlt, FaFileAlt, FaClock, FaUserMd, FaHospital, FaFilePrescription } from 'react-icons/fa'

export const UserDashboard = ({ setActiveMenu }) => {

  const { logued } = useGeneralContext()
  // Estos datos normalmente vendrían de una API o estado global
  const nextAppointment = {
    date: '2023-06-14',
    time: '14:30 a 15:30',
    doctor: 'Dra. María García',
    specialty: 'Cardiología'
  }

  return (
    <div className="w-full h-full mx-auto flex-1 bg-gray-100 dark:bg-gray-800 p-4 shadow-md">
      <h1 className="text-3xl font-bold mb-2">Panel de Usuario</h1>
      <h2>Bienvenido/a {logued.firstName} {logued.lastName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start align-top justify-start">
        <Card className=''>
          <h2 className="text-xl font-semibold mb-4">Próxima Consulta</h2>
          <div className="space-y-2">
            <p className="flex items-center">
              <FaCalendarAlt className="mr-2 h-5 w-5" />
              Fecha: {nextAppointment.date}
            </p>
            <p className="flex items-center">
              <FaClock className="mr-2 h-5 w-5" />
              Hora: {nextAppointment.time}
            </p>
            <p className="flex items-center">
              <FaUserMd className="mr-2 h-5 w-5" />
              Doctor: {nextAppointment.doctor}
            </p>
            <p className="flex items-center">
              <FaHospital className="mr-2 h-5 w-5" />
              Especialidad: {nextAppointment.specialty}
            </p>
          </div>
          <div className="flex gap-x-2 justify-between mt-4">
            <Button className="bg-gray-200 hover:bg-gray-400 dura tion-200 transition-colors" color="primary" >
              Ver detalles de la consulta
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-400 duration-200 transition-colors" color="primary" >
              Ver consultas anteriores
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
          <div className="space-y-2">
            <Button onClick={() => setActiveMenu('agendas')} className="bg-gray-200 hover:bg-gray-300 duration-200 transition-colors" color="primary">
              <FaCalendarAlt className="mr-2 h-5 w-5" />
              Agendar Consulta
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 duration-200 transition-colors"
              onClick={() => setActiveMenu('historyForm')}
              color="primary">
              <FaFileAlt className="mr-2 h-5 w-5" />
              Ver Ficha Médica
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 duration-200 transition-colors"
              onClick={() => setActiveMenu('prescription')}
              color="primary">
              <FaFilePrescription className="mr-2 h-5 w-5" />
              Ver Recetas
            </Button>
          </div>
        </Card>
      </div>
    </div >
  )
}