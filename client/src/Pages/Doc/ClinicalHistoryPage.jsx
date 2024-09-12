import { ClinicalForm } from '../../components/DoctorForm/ClinicalForm'
import { MedicalHistory } from '../../components/MedicalHistory/MedicalHistory'

export const ClinicalHistoryPage = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
            <MedicalHistory />
            <ClinicalForm />
        </div>
    )
}
