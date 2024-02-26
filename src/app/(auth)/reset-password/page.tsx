import ResetPasswordView from '@/views/auth/ResetPasswordView';
import { Metadata } from 'next';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export const metadata: Metadata = {
  title: 'Reset Password',
};

const Reset = ({ searchParams }: PageProps) => {
  return <ResetPasswordView searchParams={searchParams} />;
};
export default Reset;
