import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './hooks/useAuthContext';
import { LoadingPage } from './components/Loading/LoadingPage';
import { useGeneralContext } from './hooks/useGeneralContext';

export const ProtectedRoute = () => {

    const { loading } = useGeneralContext()
    const { isAuthenticated } = useAuth();

    if (loading) return <LoadingPage />
    if (!isAuthenticated && !loading) return <Navigate to='/login' replace />

    return <Outlet />

}