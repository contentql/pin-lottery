import EmailVerificationView from '@/views/auth/EmailVerificationView';
import { Metadata } from 'next';
interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export const metadata: Metadata = {
  title: 'Email verification',
};

const VerifyEmail = ({ searchParams }: PageProps) => {
  console.log('token in any', searchParams);
  return <EmailVerificationView searchParams={searchParams} />;
};

export default VerifyEmail;
