import { useEffect, useState } from 'react'
import { useGeneralContext } from '../../hooks/useGeneralContext'
import { useCalendar } from '../../hooks/useCalendarContext'
import { Card, Select, Button, Table } from 'flowbite-react'
import { doctorSpecialties } from '../../utils/specialities'

export const Schedule = () => {
    const { users } = useGeneralContext()
    const { doctorAvailability, getDoctorAvalability } = useCalendar()
    const [especialidad, setEspecialidad] = useState('')
    const [doctor, setDoctor] = useState('')
    const [horarios, setHorarios] = useState([])

    // Datos de ejemplo (en una aplicación real, estos vendrían de una API)
    const especialidades = doctorSpecialties
    const doctores = users?.filter(doct => doct.role === 'doctor')


    // {
    //     'Cardiología': [{ id: 1, nombre: 'Dr. Juan Pérez' }, { id: 2, nombre: 'Dra. Ana García' }],
    //         'Dermatología': [{ id: 3, nombre: 'Dra. María López' }],
    //             'Pediatría': [{ id: 4, nombre: 'Dr. Carlos Rodríguez' }, { id: 5, nombre: 'Dra. Laura Martínez' }],
    //                 'Oftalmología': [{ id: 6, nombre: 'Dr. Roberto Sánchez' }]
    // }

    const handleEspecialidadChange = (e) => {
        setEspecialidad(e.target.value)
        setDoctor('')
        setHorarios([])
    }

    const handleDoctorChange = (e) => {
        setDoctor(e.target.value)
        // Simular la obtención de horarios (en una app real, esto sería una llamada a la API)
        if (e.target.value === '') {
            setHorarios([])
        } else {
            setHorarios([
                { fecha: '2023-06-01', hora: '09:00' },
                { fecha: '2023-06-01', hora: '11:00' },
                { fecha: '2023-06-02', hora: '10:00' },
                { fecha: '2023-06-02', hora: '15:00' },
            ])
        }
    }
    useEffect(() => {
        const getDoctorAv = async () => {
            if (doctor) {
                const filteredDoc = doctores.find(doc => doc._id === doctor)
                const doctorAvalability = await getDoctorAvalability(filteredDoc._id)
                console.log(doctorAvalability)
            }
        }
        getDoctorAv()
    }, [doctor])
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Agendar Cita Médica</h1>

            <div className="mb-4">
                <Select onChange={handleEspecialidadChange} value={especialidad}>
                    <option value="">Seleccione una especialidad</option>
                    {especialidades?.map((esp) => (
                        <option key={esp} value={esp}>{esp}</option>
                    ))}
                </Select>
            </div>

            {especialidad && (
                <div className="mb-4">
                    <Select onChange={handleDoctorChange} value={doctor}>
                        <option value="">Seleccione un doctor</option>
                        {doctores.filter(doc => doc.specialty.toString() === especialidad.toString())
                            .map((doc) => (
                                <option key={doc._id} value={doc._id}>{doc.firstName}</option>
                            ))}
                    </Select>
                </div>
            )}

            {doctor && (
                <Card className="mb-4">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {/* {doctores[especialidad].find(d => d.id === parseInt(doctor)).nombre} */}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        Especialidad: {especialidad}
                    </p>
                </Card>
            )}

            {horarios.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Horarios Disponibles</h2>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Fecha</Table.HeadCell>
                            <Table.HeadCell>Hora</Table.HeadCell>
                            <Table.HeadCell>Acción</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {horarios.map((horario, index) => (
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {horario.fecha}
                                    </Table.Cell>
                                    <Table.Cell>{horario.hora}</Table.Cell>
                                    <Table.Cell>
                                        <Button size="sm">Agendar</Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            )}
        </div>
    )
}