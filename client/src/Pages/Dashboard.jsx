import { useAuth } from "../hooks/useAuthContext"
import { UserDashboard } from "../components/Dashboards/UserDashboard"
import { AdminDashboard } from "../components/Dashboards/AdminDashboard"
import { DoctorDashboard } from "../components/Dashboards/DoctorDashboard"

export const Dashboard = () => {

    const { logued } = useAuth();

    if (logued.role === 'user') return <UserDashboard />
    if (logued.role === 'admin') return <AdminDashboard />
    if (logued.role === 'doctor') return <DoctorDashboard />

}
