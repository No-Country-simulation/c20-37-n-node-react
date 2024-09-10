import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuthContext';
import { LoadingPage } from './components/Loading/LoadingPage';
import { useGeneralContext } from './hooks/useGeneralContext';

export const ProtectedRoute = () => {

    const { loading } = useGeneralContext()
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate()

    if (loading) return <LoadingPage />
    if (!isAuthenticated && !loading) navigate('/login')

    return <Outlet />

}