import { useEffect } from 'react';
import { LoginForm } from '../components/AuthForm/LoginForm';
import { RegisterForm } from '../components/AuthForm/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthContext';


export const Authentication = () => {
  const navigate = useNavigate()

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) return navigate('/dashboard')
  }, [isAuthenticated])

  return (
    <div>
      {window.location.pathname === '/register' ?
        <RegisterForm />
        : <LoginForm />}
    </div>

  )
}
