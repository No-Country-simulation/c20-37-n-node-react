import {
  Card,
  Table,
  Badge,
  Button
} from 'flowbite-react';
import { VideoCall } from '../VideoCall/VideoCall'

export const DoctorDashboard = () => {
  // Datos de ejemplo para las citas
  const citas = [
    { id: 1, paciente: 'María García', fecha: '2023-06-15 10:00', tipo: 'Videollamada' },
    { id: 2, paciente: 'Juan Pérez', fecha: '2023-06-15 11:30', tipo: 'Presencial' },
    { id: 3, paciente: 'Ana Martínez', fecha: '2023-06-15 14:00', tipo: 'Videollamada' },
  ];

  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-4">
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            15
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Citas Pendientes
          </p>
        </Card>
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            45
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Pacientes Atendidos
          </p>
        </Card>
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            4.8
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Calificación Promedio
          </p>
        </Card>
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            $5,230
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Ingresos del Mes
          </p>
        </Card>
      </div>

      <Card className="mt-4">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Próximas Citas
        </h5>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Paciente</Table.HeadCell>
            <Table.HeadCell>Fecha y Hora</Table.HeadCell>
            <Table.HeadCell>Tipo</Table.HeadCell>
            <Table.HeadCell>Acciones</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {citas.map((cita) => (
              <Table.Row key={cita.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {cita.paciente}
                </Table.Cell>
                <Table.Cell>{cita.fecha}</Table.Cell>
                <Table.Cell>
                  <Badge color={cita.tipo === 'Videollamada' ? 'info' : 'success'}>
                    {cita.tipo}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Button size="xs">Ver Detalles</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <VideoCall />
    </div>
  );
}