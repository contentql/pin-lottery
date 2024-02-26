import ForgotPasswordView from '@/views/auth/ForgotPasswordView';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Forgot Password',
};

const Forgot = () => {
  return <ForgotPasswordView />;
};
export default Forgot;
