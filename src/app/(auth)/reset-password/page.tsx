import ResetPasswordView from '@/views/auth/ResetPasswordView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
};
const Reset = () => {
  return <ResetPasswordView />;
};
export default Reset;
