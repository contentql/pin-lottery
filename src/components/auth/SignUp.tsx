import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ZodError } from 'zod'

import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/auth-router/account-credentials-validator'
import { trpc } from '@/trpc/client'

const SignUp = () => {
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [sentEmail, setSentEmail] = useState('')

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const { mutate: addUser } = trpc.auth.createUser.useMutation({
    onError: err => {
      if (err.data?.code === 'CONFLICT') {
        toast.error(`This email already exists. Please sign in instead.`, {
          autoClose: 3000,
          onClose: () => {
            toast.info('Redirecting to login page...', {
              autoClose: 2000,
              onClose: () => router.push('/login'),
            })
          },
        })

        return
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message)

        return
      }

      console.error('Something went wrong. Please try again.')
    },
    onSuccess: ({ sentEmailTo }) => {
      setValue('user_name', '')
      setValue('email', '')
      setValue('password', '')
      setValue('confirm_password', '')

      setIsEmailSent(true)
      setSentEmail(sentEmailTo)
    },
  })

  const onSubmit = ({
    user_name,
    email,
    password,
    confirm_password,
  }: TAuthCredentialsValidator) => {
    addUser({ user_name, email, password, confirm_password })
  }

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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='form-group'>
                <label htmlFor='user_name'>
                  Username <sup>*</sup>
                </label>
                <input
                  {...register('user_name')}
                  name='user_name'
                  id='user_name'
                  placeholder='Enter your Username'
                  required
                />
                {errors?.user_name && (
                  <p className='form-errors'>{errors.user_name.message}</p>
                )}
              </div>

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

              <div className='form-group'>
                <label htmlFor='confirm_password'>
                  confirm password <sup>*</sup>
                </label>
                <input
                  {...register('confirm_password')}
                  type='password'
                  name='confirm_password'
                  id='confirm_password'
                  placeholder='Confirm Password'
                  required
                />
                {errors?.confirm_password && (
                  <p className='form-errors'>
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>

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
  )
}

export default SignUp
