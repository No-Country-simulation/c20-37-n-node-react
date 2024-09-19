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
import { ModalConsulation } from './Doctor/modalConsultation';

export const Calendar = () => {

  const { logued } = useAuth();
  const { setSlot } = useGeneralContext();
  //const { getConsultation, , getAvailableTimeByRangeDate,  createNewConsultation, updateConsultation, deleteConsultation} = useCalendar();
  const { getAvailableTimeByRangeDate, getConsultationByDoctor, availableTime, consultations } = useCalendar();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const calendarRef = useRef(null);

  const fetchData = (start, end) => {

    getAvailableTimeByRangeDate(logued._id, start, end);
    getConsultationByDoctor(logued._id, start, end);

    setEvents([...availableTime, ...consultations]);
  };

  const handleDatesSet = (dateInfo) => {
    const viewType = dateInfo.view.type;
    let start = new Date(dateInfo.startStr);
    let end = new Date(dateInfo.end);

    if (viewType === 'timeGridDay') {
      //end.setHours(23, 59, 59, 999); // Set end of the day
      start = start.toISOString();
      end = end.toISOString();
    } else if (viewType === 'dayGridMonth') {
      start = new Date(start.getUTCFullYear(), start.getUTCMonth() + 1);
      start.setUTCDate(1);
      start.setUTCHours(0, 0, 0, 0);
      end = new Date(end.getUTCFullYear(), end.getUTCMonth(), 0);
      end.setUTCHours(0, 0, 0, 0);
      start = start.toISOString();
      end = end.toISOString();
    } else {
      start = start.toISOString();
      end = new Date(end.setDate(end.getDate() - 1)).toISOString();
    }
    // console.log("CAMBIO DE FECHAAAAS", start, end)

    // fetchData(start, end); 
  };

  const handleEventClick = (eventInfo) => {
    // console.log("Evento seleccionado: ", eventInfo);
    setSlot(eventInfo.event);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <button onClick={handleOpenModal} data-modal-target="crud-modal" data-modal-toggle="crud-modal" className={`w-full h-full flex flex-col text-white ${eventInfo.event._def.extendedProps.type == 'consultation' ? 'bg-primary border-primary hover:bg-blue-900' : 'bg-secondary border-secondary hover:bg-teal-500'} rounded-sm text-sm px-5 py-1 text-center `} type="button">
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </button>
    );
  }

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();
    const start = calendarApi.view.activeStart.toISOString();
    const endDate = new Date(calendarApi.view.activeEnd);
    endDate.setDate(endDate.getUTCDate() - 1);
    const end = endDate.toISOString();
    fetchData(start, end);
  }, []);

  return (
    <div className="w-full mx-auto flex-1 bg-gray-100 dark:bg-gray-800 p-4 shadow-md">
      <h1 className="text-3xl font-bold mb-2">Agendar consulta</h1>
      {/* <div className='w-screen min-h-screen my-24 flex justify-center'> */}
      <div className='w-10/12 mx-auto max-h-lvh'>
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
          eventClick={handleEventClick}
          datesSet={handleDatesSet}
          customButtons={{
            addAvailability: {
              text: 'Agendar Disponibilidad',
              click: () => alert('Formulario de agendar cita')
            }
          }}
        />
      </div>
      <ModalConsulation show={showModal} handleClose={handleCloseModal} />
    </div>
    // </div>
  )
}