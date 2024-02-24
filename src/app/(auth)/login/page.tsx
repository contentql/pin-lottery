import LoginView from '@/views/auth/LoginView';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Login',
};
const Login = () => {
  return <LoginView />;
};

export default Login;
