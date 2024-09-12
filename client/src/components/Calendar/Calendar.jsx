import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export const Calendar = ({ tabsRef, setActiveTab }) => {

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Agendar consulta</h1>
      {/* <div className='w-screen min-h-screen my-24 flex justify-center'> */}
      <div className='w-10/12 mx-auto'>
        <FullCalendar
          headerToolbar={{
            end: 'prev,next today',
            center: 'title',
            start: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView='timeGridWeek'
          editable={true}
          selectable={true}
          events={[
            {
              title: 'Consulta virtual',
              start: '2024-09-06T09:00:00',
              end: '2024-09-06T10:00:00',
              extendedProps: {
                patient: 'John Doe'
              }
            }
          ]}
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
    // </div>
  )
}