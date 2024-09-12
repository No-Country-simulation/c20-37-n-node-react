'use client'

import { useState, useEffect, useRef } from 'react'
import { Modal, Button, Label, TextInput } from 'flowbite-react'

export const NewCalendar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const [appointmentDetails, setAppointmentDetails] = useState({ name: '', reason: '' })
    const calendarRef = useRef(null)
    const calendarInstanceRef = useRef(null)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (isClient && calendarRef.current) {
            const initCalendar = async () => {
                const { Calendar } = await import('@fullcalendar/core')
                const dayGridPlugin = await import('@fullcalendar/daygrid')
                const timeGridPlugin = await import('@fullcalendar/timegrid')
                const interactionPlugin = await import('@fullcalendar/interaction')

                const calendarInstance = new Calendar(calendarRef.current, {
                    plugins: [dayGridPlugin.default, timeGridPlugin.default, interactionPlugin.default],
                    initialView: 'dayGridMonth',
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    },
                    height: 'auto',
                    dateClick: handleDateClick,
                    events: [],
                    locale: 'es',
                    buttonText: {
                        today: 'Hoy',
                        month: 'Mes',
                        week: 'Semana',
                        day: 'Día'
                    },
                    allDayText: 'Todo el día',
                    noEventsText: 'No hay eventos para mostrar'
                })

                calendarInstance.render()
                calendarInstanceRef.current = calendarInstance
            }

            initCalendar()

            return () => {
                if (calendarInstanceRef.current) {
                    calendarInstanceRef.current.destroy()
                }
            }
        }
    }, [isClient])

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr)
        setIsModalOpen(true)
    }

    const handleAppointmentSubmit = () => {
        console.log('Cita agendada:', { date: selectedDate, ...appointmentDetails })
        setIsModalOpen(false)
        setAppointmentDetails({ name: '', reason: '' })

        if (calendarInstanceRef.current) {
            calendarInstanceRef.current.addEvent({
                title: appointmentDetails.name,
                start: selectedDate,
                allDay: true
            })
        }
    }

    if (!isClient) {
        return <div className="p-4 text-center">Cargando calendario...</div>
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Agenda tu Cita Médica</h1>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div ref={calendarRef} className="fc fc-media-screen fc-direction-ltr fc-theme-standard">
                    <div className="fc-header-toolbar fc-toolbar ">
                        <div className="fc-toolbar-chunk">
                            <div className="fc-button-group">
                                <button type="button" title="Mes anterior" aria-pressed="false" className="fc-prev-button fc-button fc-button-primary">
                                    <span className="fc-icon fc-icon-chevron-left"></span>
                                </button>
                                <button type="button" title="Siguiente mes" aria-pressed="false" className="fc-next-button fc-button fc-button-primary">
                                    <span className="fc-icon fc-icon-chevron-right"></span>
                                </button>
                            </div>
                            <button type="button" title="Hoy" aria-pressed="false" className="fc-today-button fc-button fc-button-primary">Hoy</button>
                        </div>
                        <div className="fc-toolbar-chunk">
                            <h2 className="fc-toolbar-title" id="fc-dom-1">Agosto 2023</h2>
                        </div>
                        <div className="fc-toolbar-chunk">
                            <div className="fc-button-group">
                                <button type="button" title="Mes" aria-pressed="true" className="fc-dayGridMonth-button fc-button fc-button-primary fc-button-active">Mes</button>
                                <button type="button" title="Semana" aria-pressed="false" className="fc-timeGridWeek-button fc-button fc-button-primary">Semana</button>
                                <button type="button" title="Día" aria-pressed="false" className="fc-timeGridDay-button fc-button fc-button-primary">Día</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header>Agendar Cita para {selectedDate}</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Por favor, ingresa los detalles de tu cita
                        </h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Nombre" />
                            </div>
                            <TextInput
                                id="name"
                                value={appointmentDetails.name}
                                onChange={(e) => setAppointmentDetails({ ...appointmentDetails, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="reason" value="Motivo de la consulta" />
                            </div>
                            <TextInput
                                id="reason"
                                value={appointmentDetails.reason}
                                onChange={(e) => setAppointmentDetails({ ...appointmentDetails, reason: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleAppointmentSubmit}>Agendar Cita</Button>
                    <Button color="gray" onClick={() => setIsModalOpen(false)}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}