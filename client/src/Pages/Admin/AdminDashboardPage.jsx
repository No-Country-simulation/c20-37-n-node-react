import { useState } from 'react'
import { Users } from "../../components/Dashboards/Menu/Users"
import { Doctors } from '../../components/Dashboards/Menu/Doctors'
import { AdminSidebar } from '../../components/Dashboards/Sidebar/AdminSidebar'
import { Info } from '../../components/Dashboards/Menu/Info'
import { Calendar } from '../../components/Calendar/Calendar'
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
        return <Calendar />
    }
  }
  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900">
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