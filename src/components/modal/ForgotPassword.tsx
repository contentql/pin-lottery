import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ZodError } from 'zod';

import { trpc } from '@/trpc/client';
import {
  ForgotPasswordValidator,
  TForgotPasswordValidator,
} from '../../lib/validators/auth-router/forgot-password-validator';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TForgotPasswordValidator>({
    resolver: zodResolver(ForgotPasswordValidator),
  });

  const { mutate: forgotPassword } = trpc.auth.forgotPassword.useMutation({
    onError: (err) => {
      if (err.data?.code === 'CONFLICT') {
        // in toast
        console.error('email does not exist');

        return;
      }

      if (err instanceof ZodError) {
        // in toast
        console.error(err.issues[0].message);

        return;
      }

      console.error('Something went wrong. Please try again.');
    },
    onSuccess: () => {},
  });

  const onSubmit = ({ email }: TForgotPasswordValidator) => {
    forgotPassword({ email });
  };

  return (
    <div className='register-main'>
      <div className='register'>
        <div className='account-form-area'>
          <h3 className='title'>Forgot password</h3>
          <div className='account-form-wrapper'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='form-group'>
                <label htmlFor='email'>
                  Email <sup>*</sup>
                </label>
                <input
                  {...register('email')}
                  name='email'
                  id='email'
                  placeholder='Enter your Email'
                  required
                />
                {errors?.email && (
                  <p className='form-errors'>{errors.email.message}</p>
                )}
              </div>
              {/* <div className='d-flex flex-wrap mt-2'>
                <div className='custom-checkbox'>
                  <input type='checkbox' name='id-2' id='id-2' defaultChecked />
                  <label htmlFor='id-2'>I agree to the</label>
                  <span className='checkbox'></span>
                </div>
                <a href='#0' className='link ml-1'>
                  Terms, Privacy Policy and Fees
                </a>
              </div> */}

              <div className='form-group text-center mt-5'>
                <button className='cmn-btn'>send link</button>
              </div>
            </form>

            <p className='text-center mt-4'>
              {' '}
              Have your password? <a href='/login'>Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
