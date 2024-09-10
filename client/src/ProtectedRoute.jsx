import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuthContext';
import { LoadingPage } from './components/Loading/LoadingPage';
import { useGeneralContext } from './hooks/useGeneralContext';
import { useEffect } from 'react';

export const ProtectedRoute = () => {

    const { loading } = useGeneralContext()
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated && !loading) navigate('/login')
    }, [isAuthenticated])

    useEffect(() => {
        if (loading) return <LoadingPage />
    }, [loading])

    return <Outlet />

}