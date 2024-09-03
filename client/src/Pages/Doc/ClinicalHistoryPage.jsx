import { ClinicalForm } from '../../components/DoctorForm/ClinicalForm'
import { ClinicalList } from '../../components/DoctorForm/ClinicalList'

export const ClinicalHistoryPage = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <ClinicalList />
            <ClinicalForm />

        </div>
    )
}
