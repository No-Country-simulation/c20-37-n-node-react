
import { Tabs } from "flowbite-react";
import { HiClipboardList, HiInformationCircle, HiCalendar } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { UserDashboard } from "../../components/Dashboards/UserDashboard";
import { MedicalHistory } from "../../components/MedicalHistory/MedicalHistory";
import { Calendar } from "../../components/Calendar/Calendar";

export const DashboardPage = () => {
    return (
        <Tabs aria-label="Default tabs" className="w-full" variant="default">
            <Tabs.Item active title="Tablero" icon={MdDashboard}>
                <UserDashboard />
            </Tabs.Item>
            <Tabs.Item title="Historial médico" icon={HiInformationCircle}>
                <MedicalHistory />
            </Tabs.Item>
            <Tabs.Item className="w-full" title="Agendarse" icon={HiCalendar}>
                < Calendar />
            </Tabs.Item>
            <Tabs.Item title="Especialistas" icon={HiClipboardList}>
                Especialistas
            </Tabs.Item>
            <Tabs.Item disabled title="Disabled">
                Disabled content
            </Tabs.Item>
        </Tabs>
    );
}
