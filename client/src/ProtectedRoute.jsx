import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './context/authContext';
import { Loading } from './components/Loading/Loading';

export const ProtectedRoute = () => {

    const { isAuthenticated, loading } = useAuth();
    if (loading) return <Loading />
    if (!isAuthenticated && !loading) return <Navigate to='/authenticate' />
    return <Outlet />

}