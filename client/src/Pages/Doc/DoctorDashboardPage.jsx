import { useState } from 'react'
import { Users } from "../../components/Dashboards/Menu/Users"
import { ClinicalHistoryPage } from './ClinicalHistoryPage'
import { DoctorDashboard } from '../../components/Dashboards/DoctorDashboard'
import { Calendar } from '../../components/Calendar/Calendar'
import { DoctorSidebar } from '../../components/Dashboards/Sidebar/DoctorSidebar'
import { useGeneralContext } from '../../hooks/useGeneralContext'
import { FormAvailability } from '../../components/Calendar/FormAvailability'
import { DoctorPrescription } from '../../components/Prescription/DoctorPrescription'

export const DoctorDashboardPage = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
    const { activeMenu, setActiveMenu } = useGeneralContext()

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed)
    }

    const renderContent = () => {
        switch (activeMenu) {
            case 'dashboard':
                return <DoctorDashboard />
            case 'historyForm':
                return <ClinicalHistoryPage />
            case 'patients':
                return <Users />
            case 'agendas':
                return <Calendar />
            case 'availability':
                return <FormAvailability />
            case 'prescription':
                return <DoctorPrescription />
        }
    }
    return (
        <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-x-auto">
            <DoctorSidebar
                isSidebarCollapsed={isSidebarCollapsed}
                setActiveMenu={setActiveMenu}
                activeMenu={activeMenu}
                toggleSidebar={toggleSidebar}
            />
            {renderContent()}
        </div>
    )
}