/* eslint-disable react/prop-types */
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiUserGroup, HiUsers, HiCalendar, HiArrowSmLeft, HiArrowSmRight, HiVideoCamera } from "react-icons/hi";

export const AdminSidebar = ({ isSidebarCollapsed,
  setActiveMenu,
  activeMenu,
  toggleSidebar
}) => {

  return (
    <div className={`${isSidebarCollapsed ? 'w-16' : 'w-44'} transition-all duration-300 ease-in-out`}>
      <Sidebar collapsed={isSidebarCollapsed}>

        <div className={`cursor-pointer flex ${isSidebarCollapsed ? 'justify-center' : null}`}>
          {isSidebarCollapsed ?
            <HiArrowSmRight onClick={toggleSidebar} className="size-8" /> :
            <HiArrowSmLeft onClick={toggleSidebar} className="size-8" />}
        </div>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              icon={HiChartPie}
              onClick={() => setActiveMenu('dashboard')}
              active={activeMenu === 'dashboard'}
            >
              {!isSidebarCollapsed && <span>Tablero</span>}
              {isSidebarCollapsed && <span>Tablero</span>}
            </Sidebar.Item>
            <Sidebar.Item
              className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              icon={HiUserGroup}
              onClick={() => setActiveMenu('doctors')}
              active={activeMenu === 'doctors'}
            >
              {!isSidebarCollapsed && <span>Médicos</span>}
              {isSidebarCollapsed && <span>Médicos</span>}
            </Sidebar.Item>
            <Sidebar.Item
              className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              icon={HiUsers}
              onClick={() => setActiveMenu('patients')}
              active={activeMenu === 'patients'}
            >
              {!isSidebarCollapsed && <span>Pacientes</span>}
              {isSidebarCollapsed && <span>Pacientes</span>}
            </Sidebar.Item>
            <Sidebar.Item
              className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              icon={HiCalendar}
              onClick={() => setActiveMenu('agendas')}
              active={activeMenu === 'agendas'}
            >
              {!isSidebarCollapsed && <span>Agendas</span>}
              {isSidebarCollapsed && <span>Agendas</span>}
            </Sidebar.Item>
            <Sidebar.Item
              className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 "
              icon={HiVideoCamera}
              onClick={() => setActiveMenu('videocall')}
              active={activeMenu === 'videocall'}
            >
              {!isSidebarCollapsed && <span>Videollamada</span>}
              {isSidebarCollapsed && <span>Videollamada</span>}
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}