import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './context/authContext';
import { LoadingPage } from './components/Loading/LoadingPage';

export const ProtectedRoute = () => {

    const { isAuthenticated, loading } = useAuth();

    console.log(isAuthenticated, loading)
    if (loading) return <LoadingPage />
    if (!isAuthenticated && !loading) return <Navigate to='/login' />
    return <Outlet />

}