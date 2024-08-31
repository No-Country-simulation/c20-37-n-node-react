import { LoginForm } from '../components/AuthForm/LoginForm';
import { RegisterForm } from '../components/AuthForm/RegisterForm';
export const Authentication = () => {
  return (
    <div className="h-screen">
      {window.location.pathname === '/register' ?
        <RegisterForm />
        : <LoginForm />}
    </div>

  )
}
