import { useAuth } from "../hooks/useAuthContext"
import { DashboardPage } from "./User/DashboardPage"
import { DoctorDashboardPage } from "./Doc/DoctorDashboardPage"
import { AdminDashboardPage } from "./Admin/AdminDashboardPage"

export const Dashboard = () => {

    const { logued } = useAuth();

    if (logued.role === 'user') return <DashboardPage />
    if (logued.role === 'admin') return <AdminDashboardPage />
    if (logued.role === 'doctor') return <DoctorDashboardPage />

}
