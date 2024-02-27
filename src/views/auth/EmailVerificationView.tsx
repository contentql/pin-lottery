'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import VerificationFailed from '@/components/modal/verification-status/VerificationFailed';
import VerificationLoading from '@/components/modal/verification-status/VerificationLoading';
import VerificationSuccess from '@/components/modal/verification-status/VerificationSuccess';
import { trpc } from '@/trpc/client';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const EmailVerificationView = ({ searchParams }: PageProps) => {
  const router = useRouter();

  const token = searchParams.token as string;
  const { isLoading, isError, isSuccess } = trpc.auth.verifyEmail.useQuery({
    token: token,
  });

  if (isSuccess) {
    toast.success(`Your email successfully verified`);
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  }
  if (isError) {
    toast.error(`Failed to verify your email address`);
    setTimeout(() => {
      router.push('/register');
    }, 2000);
  }
  return (
    <div>
      {isLoading ? (
        <VerificationLoading />
      ) : isSuccess ? (
        <VerificationSuccess />
      ) : (
        <VerificationFailed />
      )}
    </div>
  );
};

export default EmailVerificationView;
