import { Calendar } from "../../components/Calendar/Calendar"
import { UserDashboard } from '../../components/Dashboards/UserDashboard'
import { useGeneralContext } from '../../hooks/useGeneralContext'
import { UserSidebar } from '../../components/Dashboards/Sidebar/UserSidebar'
import { MedicalHistory } from '../../components/MedicalHistory/MedicalHistory'
import { VideoCall } from '../../components/VideoCall/VideoCall'

export const UserDashboardPage = () => {
    const { activeMenu, setActiveMenu, isSidebarCollapsed, setIsSidebarCollapsed } = useGeneralContext()

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed)
    }

    const renderContent = () => {
        switch (activeMenu) {
            case 'dashboard':
                return <UserDashboard setActiveMenu={setActiveMenu} />
            case 'historyForm':
                return <MedicalHistory />
            case 'agendas':
                return <Calendar />
            case 'videocall':
                return <VideoCall />
        }
    }
    return (
        <div className="flex bg-gray-50 dark:bg-gray-900 overflow-x-auto">
            <UserSidebar
                isSidebarCollapsed={isSidebarCollapsed}
                setActiveMenu={setActiveMenu}
                activeMenu={activeMenu}
                toggleSidebar={toggleSidebar}
            />
            {renderContent()}
        </div>
    )
}