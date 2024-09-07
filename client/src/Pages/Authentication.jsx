import { useEffect } from 'react';
import { LoginForm } from '../components/AuthForm/LoginForm';
import { RegisterForm } from '../components/AuthForm/RegisterForm';
import { useAuth } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';


export const Authentication = () => {
  const navigate = useNavigate()

  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    console.log('esta autenticado?',isAuthenticated)
    if (isAuthenticated) return navigate('/dashboard')
  }, [isAuthenticated])

  return (
    <div className="h-screen">
      {window.location.pathname === '/register' ?
        <RegisterForm />
        : <LoginForm />}
    </div>

  )
}
