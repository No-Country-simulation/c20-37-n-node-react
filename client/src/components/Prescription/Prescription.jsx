import { useEffect, useState } from 'react'
import { useGeneralContext } from '../../hooks/useGeneralContext'
import { MdMedication, MdCalendarToday } from 'react-icons/md'
import { RecoverPassword } from '../RecoverPass/RecoverPassword'


export const Prescription = () => {
    const { logued } = useGeneralContext()
    const [openModal, setOpenModal] = useState(false)
    const [prescriptionsState, setPrescriptionsState] = useState(logued?.prescriptions?.length > 0 ? logued?.prescriptions : [])




    useEffect(() => {
        console.log(logued?.prescriptions)
        setPrescriptionsState(logued?.prescriptions)
    }, [logued.prescriptions])

    return (
        <div className="w-full h-full mx-auto flex-1 bg-gray-100 dark:bg-gray-800 rounded-none p-4 shadow-md">
            <h1 className="text-3xl font-bold mb-2 ">Mis Recetas</h1>
            <div className='mb-4'>
                <p>*Desde aqui, podes ver todas tus recetas definidas por el doctor</p>
                <p>*Recuerda borrar las recetas que ya hayan vencido.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {prescriptionsState?.map((prescription) => (
                    <div key={prescription._id} className="bg-white text-card-foreground rounded-lg shadow-md overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className='flex items-center'>
                                    <MdMedication className="mr-2 text-primary text-xl" />
                                    <h2 className="text-lg font-semibold">{prescription.medicationName.toUpperCase()}</h2>
                                </div>
                                <button
                                    onClick={() => setOpenModal(true)}
                                    className='bg-red-500 hover:bg-red-900 duration-300 rounded-full px-2 text-white'>x</button>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Dosís {prescription.dosage} mg</p>
                            <div className="inline-blocktext-secondary-foreground rounded-full py-1 text-sm font-semibold mb-2">
                                {prescription.frequency}
                            </div>
                            <div className="space-y-2">
                                <p className="flex items-center text-sm">
                                    <MdCalendarToday className="mr-2 text-primary text-lg" />
                                    <span className="font-semibold mr-1">Cantidad de días:</span>{prescription.duration}
                                </p>
                            </div>
                            <button onClick={() => setOpenModal(true)} className='border-black border-2 hover:bg-black hover:text-white duration-300 px-2 my-4'>Imprimir</button>
                        </div>
                    </div>
                ))}
            </div>
            {prescriptionsState.length === 0 && <div className="text-2xl text-center mt-8">No tienes recetas aún</div>}
            <RecoverPassword openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    )
}
