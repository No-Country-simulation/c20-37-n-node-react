import { LoginForm } from '../components/AuthForm/LoginForm';
import { RegisterForm } from '../components/AuthForm/RegisterForm';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';


export const Authentication = () => {

  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to='/dashboard' />
  return (
    <div className="h-screen">
      {window.location.pathname === '/register' ?
        <RegisterForm />
        : <LoginForm />}
    </div>

  )
}
