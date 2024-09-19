import { ClinicalForm } from '../../components/DoctorForm/ClinicalForm'
import { MedicalHistory } from '../../components/MedicalHistory/MedicalHistory'

export const ClinicalHistoryPage = () => {
    return (
        <div className="flex-1 overflow-x-hidden  bg-gray-100 dark:bg-gray-800 p-4">
            <div className='mb-6'>
                <h1 className="text-3xl font-bold mb-2">
                    Ficha de Historia Clínica
                </h1>
                <p className="text-normal">
                    En esta sección podrás visualizar y editar la historia clínica de tu paciente.
                </p>
                <p className="text-normal">Primero, realiza la busqueda del historial, con el dni del paciente, luego con el ID de su historia medica, podras editarla.</p>

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MedicalHistory />
                <ClinicalForm />
            </div>
        </div>
    )
}
