import { useAuth } from "../hooks/useAuthContext"
import { UserDashboard } from "../components/Dashboards/UserDashboard"
import { DoctorDashboard } from "../components/Dashboards/DoctorDashboard"
import { AdminDashboardPage } from "./Admin/AdminDashboardPage"

export const Dashboard = () => {

    const { logued } = useAuth();

    if (logued.role === 'user') return <UserDashboard />
    if (logued.role === 'admin') return <AdminDashboardPage />
    if (logued.role === 'doctor') return <DoctorDashboard />

}
