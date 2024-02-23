'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodError } from 'zod';

import { trpc } from '@/trpc/client';
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/auth-router/account-credentials-validator';

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: addUser } = trpc.auth.createUser.useMutation({
    onError: (err) => {
      if (err.data?.code === 'CONFLICT') {
        // in toast
        console.error('This email is already in use. Sign in instead?');

        return;
      }

      if (err instanceof ZodError) {
        // in toast
        console.error(err.issues[0].message);

        return;
      }

      console.error('Something went wrong. Please try again.');
    },
    onSuccess: ({ sentEmailTo }) => {
      // clear the form
      // redirect to email verification page
      // TODO: Integrate with Resend and Sendgrid
      console.log(
        'you will redirect to a page, where we ask the user to verify their email at' +
          ` ${sentEmailTo}`,
      );
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    addUser({ email, password });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor='email'>Email</label>
            <input {...register('email')} placeholder='you@example.com' />
            {errors?.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor='password'>Password</label>
            <input
              {...register('password')}
              type='password'
              placeholder='Password'
            />
            {errors?.password && <p>{errors.password.message}</p>}
          </div>

          <button>Sign up</button>
        </div>
      </form>
    </>
  );
}
