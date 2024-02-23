'use client';
import VerificationFailed from '@/components/modal/verification-status/VerificationFailed';
import VerificationLoading from '@/components/modal/verification-status/VerificationLoading';
import VerificationSuccess from '@/components/modal/verification-status/VerificationSuccess';
import { trpc } from '@/trpc/client';
import { useRouter } from 'next/navigation';

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
    setTimeout(() => {
      router.push('/login');
    }, 5000);
  }
  if (isError) {
    setTimeout(() => {
      router.push('/register');
    }, 5000);
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
