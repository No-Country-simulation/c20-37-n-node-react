import { useRef, useState } from "react";
import { Tabs } from "flowbite-react";
import { HiClipboardList, HiInformationCircle, HiCalendar } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { UserDashboard } from "../../components/Dashboards/UserDashboard";
import { MedicalHistory } from "../../components/MedicalHistory/MedicalHistory";
import { Calendar } from "../../components/Calendar/Calendar";
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop";

export const UserDashboardPage = () => {
    const tabsRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <Tabs
                ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}
                active={activeTab}
                aria-label="Default tabs" className="w-full" variant="default">
                <Tabs.Item active title="Tablero" icon={MdDashboard}>
                    <UserDashboard tabsRef={tabsRef} setActiveTab={setActiveTab} />
                </Tabs.Item>
                <Tabs.Item title="Historial médico" icon={HiInformationCircle}>
                    <MedicalHistory tabsRef={tabsRef} setActiveTab={setActiveTab} />
                </Tabs.Item>
                <Tabs.Item className="w-full" title="Agendarse" icon={HiCalendar}>
                    < Calendar tabsRef={tabsRef} setActiveTab={setActiveTab} />
                </Tabs.Item>
                <Tabs.Item title="Especialistas" icon={HiClipboardList}>
                    Especialistas
                </Tabs.Item>
                <Tabs.Item disabled title="Disabled">
                    Disabled content
                </Tabs.Item>
            </Tabs>
            <ScrollToTop />
        </>
    );
}
