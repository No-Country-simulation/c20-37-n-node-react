import { useState } from 'react'
import { Users } from "../../components/Dashboards/Menu/Users"
import { Doctors } from '../../components/Dashboards/Menu/Doctors'
import { AdminSidebar } from '../../components/Dashboards/Sidebar/AdminSidebar'
import { Info } from '../../components/Dashboards/Menu/Info'
import { Schedule } from '../../components/Schedule/Schedule'
import { useGeneralContext } from '../../hooks/useGeneralContext'

export const AdminDashboardPage = () => {
  const { activeMenu, setActiveMenu } = useGeneralContext()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Info />
      case 'doctors':
        return <Doctors />
      case 'patients':
        return <Users />
      case 'agendas':
        return <Schedule />
    }
  }
  return (
    <div className="flex w-full min-h-screen bg-gray-50 dark:bg-gray-90 overflow-x-auto">
      <AdminSidebar
        isSidebarCollapsed={isSidebarCollapsed}
        setActiveMenu={setActiveMenu}
        activeMenu={activeMenu}
        toggleSidebar={toggleSidebar}
      />
      {renderContent()}
    </div>
  )
}