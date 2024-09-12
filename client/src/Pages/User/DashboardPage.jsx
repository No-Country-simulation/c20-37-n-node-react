
import { Tabs } from "flowbite-react";
import { HiClipboardList, HiInformationCircle, HiCalendar } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Dashboard } from "../Dashboard";
import { MedicalHistory } from "../../components/MedicalHistory/MedicalHistory";
import { Calendar } from "../../components/Calendar/Calendar";
import { useAuth } from "../../hooks/useAuthContext";

export const DashboardPage = () => {
    const { logued } = useAuth();

    return (
        <Tabs aria-label="Default tabs" className="w-full mx-10" variant="default">
            <Tabs.Item active title="Tablero" icon={MdDashboard}>
                <Dashboard />
            </Tabs.Item>
            <Tabs.Item title={logued.role=='user'? 'Mi Historia Medica' : 'Historias Medicas' } icon={HiInformationCircle}>
                <MedicalHistory />
            </Tabs.Item>
            <Tabs.Item className="w-full" title={logued.role=='user'? 'Agendarse' : 'Agenda' } icon={HiCalendar}>
                < Calendar />
            </Tabs.Item>
            <Tabs.Item title={logued.role=='user'? 'Especialistas' : 'Pacientes' } icon={HiClipboardList}>
                {logued.role=='user'? 'Especialistas' : 'Pacientes' }
            </Tabs.Item>
            <Tabs.Item disabled title="Disabled">
                Disabled content
            </Tabs.Item>
        </Tabs>
    );
}
