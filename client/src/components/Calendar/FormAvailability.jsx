import { Modal, Button} from 'flowbite-react';
import { useCalendar } from '../../hooks/useCalendarContext';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuthContext';
import { useState } from 'react';

const daysOfWeek = [
    { value: 0, label: 'Domingo' },
    { value: 1, label: 'Lunes' },
    { value: 2, label: 'Martes' },
    { value: 3, label: 'Miércoles' },
    { value: 4, label: 'Jueves' },
    { value: 5, label: 'Viernes' },
    { value: 6, label: 'Sabado' },
  ];

export const FormAvailability = () => {

    const {getDoctorAvalability, doctorAvailability, updateAvailableTime, createDoctorAvailability} = useCalendar();
    const [update, setUpdate] = useState(false);
    const {logued} = useAuth();
    const [selectedDays, setSelectedDays] = useState(doctorAvailability ? doctorAvailability.daysOfWeek : []);
    const [schedules, setSchedules] = useState(doctorAvailability ? doctorAvailability.timeSlots : [{ startTime: '', endTime: '' }]);
    const [exceptions, setExceptions] = useState(doctorAvailability ? doctorAvailability.exceptions : []);
    const [newException, setNewException] = useState({ date: '', timeSlots: [] });
    const [editingException, setEditingException] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getDoctorAvalability(logued._id);
        console.log(doctorAvailability);
    },[update])

    const handleDayChange = (day) => {
        setSelectedDays((prevSelectedDays) =>
          prevSelectedDays.includes(day)
            ? prevSelectedDays.filter((d) => d !== day) // Desmarcar si ya está seleccionado
            : [...prevSelectedDays, day] // Marcar si no está seleccionado
        );
    };

    const handleTimeChange = (index, field, value) => {
        const updatedSchedules = schedules.map((schedule, i) =>
          i === index ? { ...schedule, [field]: value } : schedule
        );
        setSchedules(updatedSchedules);
      };

      const addSchedule = () => {
        setSchedules([...schedules, { startTime: '', endTime: '' }]);
      };
    
      const removeSchedule = (index) => {
        setSchedules(schedules.filter((_, i) => i !== index));
      };

      const validateSchedules = () => {
        const newErrors = {};
    
        if (selectedDays.length === 0) {
          newErrors.days = 'Debes seleccionar al menos un día.';
        }

         // Validar que los horarios sean coherentes
  for (let i = 0; i < schedules.length; i++) {
    const { startTime: startTimeI, endTime: endTimeI } = schedules[i];
    if (startTimeI >= endTimeI) {
      newErrors[`schedule-${i}`] = 'La hora de inicio debe ser menor que la hora de finalización.';
    }
    for (let j = i+1; j < schedules.length; j++) {

      const { startTime: startTimeJ, endTime: endTimeJ } = schedules[j];

      const startI = convertToNumber(startTimeI);
      const endI = convertToNumber(endTimeI);
      const startJ = convertToNumber(startTimeJ);
      const endJ = convertToNumber(endTimeJ);

      if (isOverlapping(startI, endI, startJ, endJ)) {
        newErrors[`schedule-${i}-${j}`] = 'Los horarios se superponen. Por favor, ajusta los horarios.';
      }
    }
  }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const convertToNumber = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours
      };
    
      const isOverlapping = (startI, endI, startJ, endJ) => {
        console.log(!(endI <= startJ || startI >= endJ));
        
        return !(endI <= startJ || startI >= endJ);
      };
    
      const saveException = () => {
        if (!newException.date) {
          setErrors(prev => ({ ...prev, exceptionDate: 'Debes seleccionar una fecha para la excepción.' }));
          return;
        }
        const updatedExceptions = exceptions.map(ex =>
          ex.date === newException.date ? { ...ex, timeSlots: newException.timeSlots } : ex
        );
        if (!exceptions.some(ex => ex.date === newException.date)) {
          updatedExceptions.push(newException);
        }
        setExceptions(updatedExceptions);
        setNewException({ date: '', timeSlots: [] });
        setEditingException(null);
      };
    
      const removeException = (index) => {
        setExceptions(exceptions.filter((_, i) => i !== index));
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateSchedules()) {

            console.log('Días seleccionados:', selectedDays);
            console.log('Horarios:', schedules);
            console.log('Excepciones:', exceptions);
            let data = {
                "daysOfWeek": selectedDays,
                "timeSlots": schedules,
                "exceptions": exceptions
            }

            if(doctorAvailability){
                updateAvailableTime(logued._id, data);
            }
            else{
                data= {
                    ...data,
                    "doctor": logued._id
                }
                createDoctorAvailability(data)
            }
            setUpdate(true);
          }
    };

    return (      
        <div className='w-full font-poppins p-10 bg-gray-100'> 
        <h1 className="text-3xl font-bold mb-5">Disponibilidad Horaria</h1>
        <form onSubmit={handleSubmit} className="m-10 flex flex-col font-poppins">
                <div className="flex flex-wrap">
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex ">
                        {daysOfWeek.map((day) => (
                        <li key={day.value} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r p-3">
                        <div>
                            <label className="flex items-center ps-3">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:text-primary focus:ring-2"
                                checked={selectedDays.includes(day.value)}
                                onChange={() => handleDayChange(day.value)}
                            />
                            <span className="ms-2 text-sm font-medium font-poppins text-gray-900">{day.label}</span>
                            </label>
                        </div>
                        </li>
                        ))}
                    </ul>
                    {errors.days && <p className="text-red-500 text-sm mt-2">{errors.days}</p>}
                    </div>

                    <div className="mt-4">
                    <h3 className="mb-4 font-semibold text-gray-900 ">Horarios</h3>
                        {schedules.map((schedule, index) => (
                        <div key={index} className="flex flex-col lg:flex-row lg:space-x-4 mb-2">
                            <div>
                            <label className="block text-sm font-medium">Inicio</label>
                            <input
                                type="time"
                                step={3600}
                                value={schedule.startTime}
                                onChange={(e) =>
                                handleTimeChange(index, 'startTime', e.target.value)
                                }
                                className="form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            </div>
                            <div>
                            <label className="block text-sm font-medium">Finalización</label>
                            <input
                                type="time"
                                step={3600}
                                value={schedule.endTime}
                                onChange={(e) =>
                                handleTimeChange(index, 'endTime', e.target.value)
                                }
                                className="form-input mt-1 block w-full rounded-lg text-text border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            </div>
                            {schedules.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeSchedule(index)}
                                className="text-red-500 hover:underline text-sm self-end"
                            >
                                Eliminar
                            </button>
                            )}
                            {errors[`schedule-${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`schedule-${index}`]}</p>}
                        </div>
                        ))}
                        <button
                        type="button"
                        onClick={addSchedule}
                        className="text-blue-600 hover:underline text-sm mb-10"
                        >
                        + Agregar horario
                        </button>
                    <h3 className="mb-4 font-semibold text-gray-900">Excepciones</h3>
                    <div className="mt-4">
                        <div className="flex flex-col space-y-2">
                        <input
                            type="date"
                            value={newException.date}
                            onChange={(e) => setNewException({ ...newException, date: e.target.value })}
                            className="form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {newException.date && (
                            <>
                            <div className="flex space-x-4">
                                <button
                                type="button"
                                onClick={() => setNewException({ ...newException, timeSlots: [{ startTime: '00:00', endTime: '00:00' }] })}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                                >
                                Sin Horarios
                                </button>
                                <button
                                type="button"
                                onClick={() => setEditingException(newException.date)}
                                className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-semibold py-2 px-4 rounded-lg"
                                >
                                Modificar Horarios
                                </button>
                            </div>
                            {editingException && (
                                <div className="mt-4">
                                {newException.timeSlots.map((slot, idx) => (
                                    <div key={idx} className="flex flex-col lg:flex-row lg:space-x-4 mb-2">
                                    <div>
                                        <label className="block text-sm font-medium">Inicio</label>
                                        <input
                                        type="time"
                                        step={3600}
                                        value={slot.startTime}
                                        onChange={(e) => {
                                            const updatedSlots = [...newException.timeSlots];
                                            updatedSlots[idx] = { ...slot, startTime: e.target.value };
                                            setNewException({ ...newException, timeSlots: updatedSlots });
                                        }}
                                        className="form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Finalización</label>
                                        <input
                                        type="time"
                                        step={3600}
                                        value={slot.endTime}
                                        onChange={(e) => {
                                            const updatedSlots = [...newException.timeSlots];
                                            updatedSlots[idx] = { ...slot, endTime: e.target.value };
                                            setNewException({ ...newException, timeSlots: updatedSlots });
                                        }}
                                        className="form-input mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setNewException({
                                    ...newException,
                                    timeSlots: [...newException.timeSlots, { startTime: '', endTime: '' }]
                                    })}
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    + Agregar horario
                                </button>
                                <button
                                    type="button"
                                    onClick={saveException}
                                    className="bg-primary hover:bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                                >
                                    Guardar Excepción
                                </button>
                                </div>
                            )}
                            </>
                        )}
                        </div>
                    </div>

                    {exceptions.length > 0 && (
                        <ul className="mt-10 space-y-2">
                        {exceptions.map((ex, index) => (
                            <li key={index} className="flex flex-col items-start lg:justify-between lg:flex-row lg:items-center">
                            <span>
                                {ex.date.split('T')[0]} - {ex.timeSlots.length > 0 && ex.timeSlots[0].startTime === '00:00' ? 'Sin atender' : `${ex.timeSlots[0].startTime} - ${ex.timeSlots[0].endTime}`}
                            </span>
                            <button
                                type="button"
                                onClick={() => removeException(index)}
                                className="text-red-500 hover:underline text-sm"
                            >
                                Eliminar
                            </button>
                            </li>
                        ))}
                        </ul>
                    )}
                    </div>
                    <div className='w:12/12 lg:w-5/12 flex justify-between mt-10'>
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800"
                    >
                        {doctorAvailability == null? 'Guardar' : 'Modificar'}
                    </button>
                    <button
                        type="submit"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                    </div>
                </form>
                </div>
    );
}