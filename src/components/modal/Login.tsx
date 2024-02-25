import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/auth-router/account-credentials-validator';
import { trpc } from '@/trpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ZodError } from 'zod';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });
  const router = useRouter();
  const { mutate: loginUser } = trpc.auth.signIn.useMutation({
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        console.error('invalid email or password');
      }
      if (err instanceof ZodError) {
        // in toast
        console.error(err.issues[0].message);

        return;
      }

      console.error(err);
    },
    onSuccess: () => {
      router.push('/user');
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    loginUser({ email, password });
  };
  return (
    <div className='register-main'>
      <div className='register'>
        <div className='account-form-area'>
          <h3 className='title'>Login</h3>
          <div className='account-form-wrapper'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='form-group'>
                <label>
                  Email <sup>*</sup>
                </label>
                <input
                  type='email'
                  id='signin_name'
                  placeholder='Enter your Email'
                  required
                  {...register('email')}
                />
                {errors?.email && <p>{errors.email.message}</p>}
              </div>
              <div className='form-group'>
                <label>
                  password <sup>*</sup>
                </label>
                <input
                  type='password'
                  id='signin-password'
                  placeholder='password'
                  required
                  {...register('password')}
                />
              </div>

              <div className='d-flex flex-wrap justify-content-between mt-2'>
                <div className='custom-checkbox'>
                  <input
                    type='checkbox'
                    name='id-1'
                    id='id-1'
                    defaultChecked
                    required
                  />
                  <label htmlFor='id-1'>Remember Password</label>
                  <span className='checkbox'></span>
                </div>
                <a href='/forgot-password' className='link'>
                  Forgot Password?
                </a>
                {errors?.password && <p>{errors.password.message}</p>}
              </div>

              <div className='form-group text-center mt-5'>
                <button className='cmn-btn' type='submit'>
                  login
                </button>
              </div>
            </form>
            <p className='text-center mt-4'>
              {' '}
              Don&apost have an account? <a href='/register'>Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
