import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ZodError } from 'zod';

import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/auth-router/account-credentials-validator';
import { trpc } from '@/trpc/client';

const SignUp = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
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
      setValue('email', '');
      setValue('password', '');

      // Store the sent email
      setIsEmailSent(true);
      setSentEmail(sentEmailTo);

      // redirect to email verification page
      // TODO: Integrate with Resend and Sendgrid
      // console.log(
      //   'you will redirect to a page, where we ask the user to verify their email at' +
      //     ` ${sentEmailTo}`
      // );
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    addUser({ email, password });
  };

  return isEmailSent ? (
    <div className='email-container'>
      <div className='email-inner-container'>
        <div className='account-form-area'>
          <h2 className='email-sent-title'>Email Sent Successfully</h2>
          <div className='email-sent-content'>
            <p className='email-sent-text'>
              An email has been sent to <strong>{sentEmail}</strong>. Please
              check your inbox and follow the instructions to verify your email.
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className='register-main'>
      <div className='register'>
        <div className='account-form-area'>
          <h3 className='title'>Create Account</h3>
          <div className='account-form-wrapper'>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                {errors?.password && (
                  <p className='form-errors'>{errors.password.message}</p>
                )}
              </div>

              {/* <div className='form-group'>
                <label>
                  confirm password <sup>*</sup>
                </label>
                <input
                  type='password'
                  name='signup_re-pass'
                  id='signup_re-pass'
                  placeholder='Confirm Password'
                  required
                />
              </div> */}

              <div className='d-flex flex-wrap mt-2'>
                <div className='custom-checkbox'>
                  <input type='checkbox' name='id-2' id='id-2' defaultChecked />
                  <label htmlFor='id-2'>I agree to the</label>
                  <span className='checkbox'></span>
                </div>
                <a href='#0' className='link ml-1'>
                  Terms, Privacy Policy and Fees
                </a>
              </div>

              <div className='form-group text-center mt-5'>
                <button className='cmn-btn'>sign up</button>
              </div>
            </form>

            <p className='text-center mt-4'>
              {' '}
              Already have an account? <a href='/login'>Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
