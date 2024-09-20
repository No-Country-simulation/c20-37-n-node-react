import { useState } from 'react'
import { MdMedication, MdCalendarToday } from 'react-icons/md'

const samplePrescriptions = [
    {
        id: "1",
        medicationName: "Paracetamol",
        dosage: "500mg",
        frequency: "Cada 8 horas",
        duration: "7",
    },
    {
        id: "2",
        medicationName: "Amoxicilina",
        dosage: "250mg",
        frequency: "Cada 12 horas",
        duration: "5",
    },
    // Puedes agregar más recetas aquí
]

export const Prescription = () => {
    const [prescriptions, setPrescriptions] = useState(samplePrescriptions)

    return (
        <div className="w-full h-full mx-auto flex-1 bg-gray-100 dark:bg-gray-800 rounded-none p-4 shadow-md">
            <h1 className="text-3xl font-bold mb-2 ">Mis Recetas</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {prescriptions?.map((prescription) => (
                    <div key={prescription.id} className="bg-white text-card-foreground rounded-lg shadow-md overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-center mb-2">
                                <MdMedication className="mr-2 text-primary text-xl" />
                                <h2 className="text-lg font-semibold">{prescription.medicationName}</h2>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Dosís {prescription.dosage}</p>
                            <div className="inline-blocktext-secondary-foreground rounded-full py-1 text-sm font-semibold mb-2">
                                {prescription.frequency}
                            </div>
                            <div className="space-y-2">
                                <p className="flex items-center text-sm">
                                    <MdCalendarToday className="mr-2 text-primary text-lg" />
                                    <span className="font-semibold mr-1">Cantidad de días:</span>{prescription.duration}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
