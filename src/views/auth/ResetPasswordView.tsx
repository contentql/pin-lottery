'use client';
interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
import ResetPassword from '@/components/modal/ResetPassword';
const ResetPasswordView = ({ searchParams }: PageProps) => {
  return <ResetPassword searchParams={searchParams} />;
};

export default ResetPasswordView;
