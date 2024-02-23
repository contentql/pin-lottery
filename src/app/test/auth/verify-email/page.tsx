'use client';

import { trpc } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import React from 'react';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VerifyEmail = ({ searchParams }: PageProps) => {
  const router = useRouter();

  const token = searchParams.token as string;
  const { isFetching, isError, isSuccess } = trpc.auth.verifyEmail.useQuery({
    token: token,
  });

  // Todo rewrite this entire thing in production
  isFetching ? <div>loading...</div> : null;
  isError ? <div>redirect to error page and unauthorized access</div> : null;
  isSuccess && router.push('/auth');

  return <div>verification done, login</div>;
};

export default VerifyEmail;
