import { useEffect } from 'react';
import { LoginForm } from '../components/AuthForm/LoginForm';
import { RegisterForm } from '../components/AuthForm/RegisterForm';
import { useAuth } from '../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';


export const Authentication = () => {

  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) return <Navigate to='/dashboard' />
  }, [isAuthenticated])

  return (
    <div className="h-screen">
      {window.location.pathname === '/register' ?
        <RegisterForm />
        : <LoginForm />}
    </div>

  )
}
