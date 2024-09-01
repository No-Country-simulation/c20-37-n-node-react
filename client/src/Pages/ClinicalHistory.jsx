import { ClinicalForm } from '../components/DoctorForm/ClinicalForm'

export const ClinicalHistory = () => {
    return (
        <div className='grid lg:grid-cols-2'>
            <div className='w-full'>
                <h2 className=' text-3xl font-bold text-center'>Historial Clínico</h2>
            </div>
            <div className='w-full'>
                <ClinicalForm />

            </div>

        </div>
    )
}
