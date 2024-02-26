import {
  ResetPasswordValidator,
  TResetPasswordValidator,
} from '@/lib/validators/auth-router/reset-password-validator';
import { trpc } from '@/trpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const ResetPassword = ({ searchParams }: PageProps) => {
  const token = searchParams?.token as string;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TResetPasswordValidator>({
    defaultValues: {
      token: token,
    },
    resolver: zodResolver(ResetPasswordValidator),
  });

  const { mutate: resetPassword } = trpc.auth.resetPassword.useMutation({
    onSuccess: () => {
      console.log('reset password successful');
      router.push('/user');
    },
    onError: (err: any) => {
      console.log('reset password failed');
    },
  });

  const onSubmit = ({
    password,
    token,
    confirmPassword,
  }: TResetPasswordValidator) => {
    resetPassword({
      password,
      token: token,
      confirmPassword,
    });
  };

  return (
    <div className='register-main'>
      <div className='register'>
        <div className='account-form-area'>
          <h3 className='title'>Reset password</h3>
          <div className='account-form-wrapper'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='form-group'>
                <label>
                  password <sup>*</sup>
                </label>
                <input
                  {...register('password')}
                  type='password'
                  name='password'
                  id='password'
                  placeholder='password'
                  required
                />
                {errors?.password && <p>{errors.password.message}</p>}
              </div>

              <div className='form-group'>
                <label>
                  confirm password <sup>*</sup>
                </label>
                <input
                  {...register('confirmPassword')}
                  type='password'
                  name='confirmPassword'
                  id='confirmPassword'
                  placeholder='Confirm Password'
                />
                {errors?.confirmPassword && (
                  <p>{errors.confirmPassword.message}</p>
                )}
              </div>
              <div className='form-group text-center mt-5'>
                <button className='cmn-btn' type='submit'>
                  reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
