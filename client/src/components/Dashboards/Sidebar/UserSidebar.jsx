/* eslint-disable react/prop-types */
import { Sidebar } from "flowbite-react";
import { HiClipboardList, HiInformationCircle, HiCalendar, HiVideoCamera, HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";

export const UserSidebar = ({ isSidebarCollapsed,
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
                            icon={HiInformationCircle}
                            onClick={() => setActiveMenu('dashboard')}
                            active={activeMenu === 'dashboard'}
                        >
                            {!isSidebarCollapsed && <span>Tablero</span>}
                            {isSidebarCollapsed && <span>Tablero</span>}
                        </Sidebar.Item>
                        <Sidebar.Item
                            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                            icon={HiClipboardList}
                            onClick={() => setActiveMenu('historyForm')}
                            active={activeMenu === 'historyForm'}
                        >
                            {!isSidebarCollapsed && <span>Historia</span>}
                            {isSidebarCollapsed && <span>Historia</span>}

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