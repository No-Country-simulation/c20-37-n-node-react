import { useAuth } from "../hooks/useAuthContext"
import { DoctorDashboardPage } from "./Doc/DoctorDashboardPage"
import { AdminDashboardPage } from "./Admin/AdminDashboardPage"
import { UserDashboardPage } from "./User/UserDashboardPage"

export const DashboardPage = () => {

    const { logued } = useAuth();

    if (logued.role === 'user') return <UserDashboardPage />
    if (logued.role === 'admin') return <AdminDashboardPage />
    if (logued.role === 'doctor') return <DoctorDashboardPage />

}
