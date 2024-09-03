import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuthContext';
import { LoadingPage } from './components/Loading/LoadingPage';
import { useGeneralContext } from './hooks/useGeneralContext';

export const ProtectedRoute = () => {

    const { isAuthenticated } = useAuth();
    const { loading } = useGeneralContext()

    if (loading) return <LoadingPage />
    if (!isAuthenticated && !loading) return <Navigate to='/login' />
    return <Outlet />

}