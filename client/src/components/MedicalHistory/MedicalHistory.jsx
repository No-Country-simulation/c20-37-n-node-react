import { Card, Badge, Table } from 'flowbite-react'


export const MedicalHistory = () => {

    const userMedicalInfo = {
        name: "Juan Pérez",
        age: "35",
        gender: "Masculino",
        bloodType: "A+",
        allergies: {
            food: true,
            medication: false,
            environmental: true,
            other: false
        },
        allergyDetails: "Alergia a los maníes y al polen",
        medicalHistory: "Apendicectomía en 2010",
        currentSymptoms: "Dolores de cabeza ocasionales",
        medications: "Aspirina según sea necesario",
        vaccines: "COVID-19 (2021), Vacuna contra la gripe (2022)",
        diagnosis: "Alergias estacionales"
    };
    const getAllergies = () => {
        const allergies = []
        if (userMedicalInfo.allergies.food) allergies.push('Alimentos')
        if (userMedicalInfo.allergies.medication) allergies.push('Medicamentos')
        if (userMedicalInfo.allergies.environmental) allergies.push('Ambientales')
        if (userMedicalInfo.allergies.other) allergies.push('Otros')
        return allergies.length > 0 ? allergies.join(', ') : 'Ninguna'
    }

    return (
        <Card className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Mi Información Médica</h2>

            <Table>
                <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Nombre</Table.Cell>
                        <Table.Cell>{userMedicalInfo.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Edad</Table.Cell>
                        <Table.Cell>{userMedicalInfo.age}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Género</Table.Cell>
                        <Table.Cell>{userMedicalInfo.gender}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Tipo de Sangre</Table.Cell>
                        <Table.Cell>{userMedicalInfo.bloodType}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Alergias</Table.Cell>
                        <Table.Cell>
                            <p>{getAllergies()}</p>
                            {userMedicalInfo.allergyDetails && (
                                <p className="mt-2 text-sm text-gray-600">{userMedicalInfo.allergyDetails}</p>
                            )}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Historial Médico</Table.Cell>
                        <Table.Cell>{userMedicalInfo.medicalHistory || 'No se registran condiciones médicas pasadas.'}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Síntomas Actuales</Table.Cell>
                        <Table.Cell>{userMedicalInfo.currentSymptoms || 'No se reportan síntomas actuales.'}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Medicamentos Actuales</Table.Cell>
                        <Table.Cell>{userMedicalInfo.medications || 'No se registran medicamentos actuales.'}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Historial de Vacunación</Table.Cell>
                        <Table.Cell>{userMedicalInfo.vaccines || 'No hay registros de vacunación disponibles.'}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Diagnóstico Actual</Table.Cell>
                        <Table.Cell>
                            {userMedicalInfo.diagnosis ? (
                                <Badge color="warning" size="lg">{userMedicalInfo.diagnosis}</Badge>
                            ) : (
                                'No hay diagnóstico actual.'
                            )}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Card>
    )
}