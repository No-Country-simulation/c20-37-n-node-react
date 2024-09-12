import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es'
import { useAuth } from "../../hooks/useAuthContext";
import { useCalendar } from "../../hooks/useCalendarContext";
import { useGeneralContext } from '../../hooks/useGeneralContext';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

export const Calendar = () => {

  const { logued } = useAuth();
  //const { , availableTime, setAvailableTime} = useGeneralContext();
  const { availableTime, consultations} = useGeneralContext();
  //const { getConsultation, , getAvailableTimeByRangeDate,  createNewConsultation, updateConsultation, deleteConsultation} = useCalendar();
  const { getAvailableTimeByRangeDate, getConsultationByDoctor} = useCalendar();
  const [events, setEvents] = useState([]);

  const calendarRef = useRef(null);

  /* useEffect(() => {
    const calendarApi = calendarRef.current.getApi();
    const start = calendarApi.view.activeStart.toISOString();
    const end = calendarApi.view.activeEnd.toISOString();

    // LLAMADAS A TUS FUNCIONES DE CONTEXTO
    getAvailableTimeByRangeDate(logued._id, start, end);
    getConsultationByDoctor(logued._id, start, end);
  }, [logued._id, getAvailableTimeByRangeDate, getConsultationByDoctor]);

  // ESTE useEffect REACCIONA CUANDO SE ACTUALIZAN availableTime Y consultations
  useEffect(() => {
    // COMBINA LOS EVENTOS DISPONIBLES Y LAS CONSULTAS EN EL ESTADO events
    setEvents([...availableTime, ...consultations]);
  }, [availableTime, consultations]); */

  useEffect(() => {
    const fetchData = async () => {
      const calendarApi = calendarRef.current.getApi();
      const start = calendarApi.view.activeStart.toISOString();
      const end = calendarApi.view.activeEnd.toISOString();

      // Llamada para obtener los horarios disponibles y las consultas una vez
      getAvailableTimeByRangeDate(logued._id, start, end);
      getConsultationByDoctor(logued._id, start, end);

      // Actualizamos el estado con los datos combinados
      setEvents([...availableTime, ...consultations]);
    };

    fetchData();
  }, []);

  const handleDateClick = (info) => {
    console.log("Fecha seleccionada: ", info.dateStr);
  };

  const handleEventClick = (eventInfo) => {
    console.log("Evento seleccionado: ", eventInfo.event.title);
  };

  const renderEventContent = (eventInfo) => {
    console.log(eventInfo);

    return (
      <div className="p-2 flex flex-col">
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    );
  }

  return (
    <div className='w-full flex justify-center'>
      <div className='w-10/12'>
        <FullCalendar
          ref={calendarRef}
          headerToolbar={{
            end: 'prev,next today',
            center: 'title',
            start: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          locale={esLocale}
          timeZone='UTC'
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView='timeGridWeek'
          editable={true}
          selectable={true}
          events={events}
          eventContent={renderEventContent}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          select={(info) => {
            console.log("Seleccionado de ", info.startStr, " hasta ", info.endStr);
          }}
          customButtons={{
            addAvailability: {
              text: 'Agendar Disponibilidad',
              click: () => alert('Formulario de agendar cita')
            }
          }}
        />
      </div>
    </div>
  )
}