import { ClinicalForm } from '../../components/DoctorForm/ClinicalForm'
import { MedicalHistory } from '../../components/MedicalHistory/MedicalHistory'

export const ClinicalHistoryPage = () => {
    return (
        <div className="flex-1 overflow-x-hidden  bg-gray-100 dark:bg-gray-800 p-4">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Formulario de Historia Clínica
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MedicalHistory />
                <ClinicalForm />
            </div>
        </div>
    )
}
