import { useState } from 'react'
// import { Button } from 'flowbite-react'
// import { HiMenuAlt1 } from 'react-icons/hi'
import {Users} from "../../components/Dashboards/Menu/Users"
import { Doctors } from '../../components/Dashboards/Menu/Doctors'
import { AdminSidebar } from '../../components/Dashboards/Sidebar/AdminSidebar'
import { Info } from '../../components/Dashboards/Menu/Info'
import { Agenda } from '../../components/Dashboards/Menu/Agenda'

export const AdminDashboardPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [activeMenu, setActiveMenu] = useState('dashboard')

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
        return <Agenda />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar
      isSidebarCollapsed={isSidebarCollapsed}
      setActiveMenu={setActiveMenu}
      activeMenu={activeMenu}
      toggleSidebar={toggleSidebar}
      />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-4">
          <div className="container mx-auto px-4">
            {renderContent()}
          </div>
        </main>
    </div>
  )
}