import { useGeneralContext } from "../../hooks/useGeneralContext";
import { useCalendar } from "../../hooks/useCalendarContext";
import { Card, Select, Button, Table, Spinner } from "flowbite-react";
import { doctorSpecialties } from "../../utils/specialities";
import { Calendar } from "../Calendar/Doctor/CalendarSingle";

export const Schedule = () => {
  const { users } = useGeneralContext();
  const {
    getDoctorAvalability,
    especialidad,
    setEspecialidad,
    doctor,
    setDoctor,
    horarios,
    setHorarios,
    loading,
  } = useCalendar();

  const especialidades = doctorSpecialties;
  const doctores = users?.filter((doct) => doct.role === "doctor");

  const handleEspecialidadChange = (e) => {
    setEspecialidad(e.target.value);
    setDoctor(""); // Resetea el doctor al cambiar la especialidad
    //setHorarios([]) // Resetea los horarios al cambiar la especialidad
  };

  const handleDoctorChange = async (e) => {
    const selectedDoctorId = e.target.value;
    setDoctor(selectedDoctorId);
    if (selectedDoctorId === "") {
      setHorarios([]); // Si no se selecciona un doctor, resetea los horarios
    } else {
      // Llama al backend para obtener los horarios disponibles del doctor seleccionado
      const res = await getDoctorAvalability(selectedDoctorId);
      console.log(res);
      if (!res) {
        setHorarios([]);
        return; // Si no hay horarios, deja el array vacío
      }
      setHorarios(res.timeSlots); // Si no hay horarios, deja el array vacío
    }
  };
  return (
    <div className="w-full h-full mx-auto flex-1 bg-gray-100 dark:bg-gray-800 rounded-none p-4">
      <h1 className="text-3xl font-bold mb-2">Agendar Cita Médica</h1>
      <p className="text-base py-2">
        *Primero elegimos la especialidad, luego el medico que deseamos en caso
        de conocer uno.
      </p>
      <p className="text-base py-2">
        *Elegimos el horario deseado y agendamos la consulta.
      </p>
      {/* Selección de especialidad */}
      <div className="mb-4">
        <Select onChange={handleEspecialidadChange} value={especialidad}>
          <option value="">Seleccione una especialidad</option>
          {especialidades?.map((esp) => (
            <option key={esp} value={esp}>
              {esp}
            </option>
          ))}
        </Select>
      </div>

      {/* Selección de doctor */}
      {especialidad && (
        <div className="mb-4">
          <Select onChange={handleDoctorChange} value={doctor}>
            <option value="">Seleccione un doctor</option>
            {doctores
              ?.filter((doc) => doc.specialty === especialidad)
              ?.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.firstName} {doc.lastName}
                </option>
              ))}
          </Select>
        </div>
      )}

      {/* Información del doctor seleccionado */}
      {doctor && (
        <Card className="mb-4">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {/* Mostrar nombre del doctor seleccionado */}
            {doctores?.find((d) => d._id === doctor)?.firstName}{" "}
            {doctores.find((d) => d._id === doctor)?.lastName}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Especialidad: {especialidad}
          </p>
        </Card>
      )}

      {/* Mostrar los horarios disponibles o spinner de carga
            {loading ? (
                <div className="flex justify-center mb-4">
                    <Spinner aria-label="Cargando horarios disponibles" size="xl" />
                </div>
            ) : (
                doctor && horarios?.length > 0 && (
                    <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">Horarios Disponibles</h2>
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Desde</Table.HeadCell>
                                <Table.HeadCell>Hasta</Table.HeadCell>
                                <Table.HeadCell>Acción</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {horarios?.map((horario, index) => (
                                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {horario.startTime}
                                        </Table.Cell>
                                        <Table.Cell>{horario.endTime}</Table.Cell>
                                        <Table.Cell>
                                            <Button size="sm">Agendar</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                )
            )} */}

      {!loading && doctor && horarios.length === 0 && (
        <p>No hay horarios disponibles para este doctor.</p>
      )}
      {doctor && <Calendar doctorId={doctor} />}
    </div>
  );
};
