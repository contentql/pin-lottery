import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { ImSpinner } from 'react-icons/im'
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

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
    if (showConfirmPassword) {
      setShowConfirmPassword(false)
    }
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev)
    if (showPassword) {
      setShowPassword(false)
    }
  }

  const preventPaste = (event: any) => {
    event.preventDefault()
    return false
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const { mutate: addUser, isLoading: isRegisterPending } =
    trpc.auth.createUser.useMutation({
      onError: (err: any) => {
        toast.error(err.message)
        if (err instanceof ZodError) {
          toast.error(err.issues[0].message)
          return
        }
        console.error('Something went wrong. Please try again.')
      },
      onSuccess: ({ sentEmailTo }: any) => {
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
                  Password <sup>*</sup>
                </label>
                <div className='password-input-container'>
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    id='password'
                    placeholder='Password'
                    required
                  />
                  <button
                    type='button'
                    className='password-toggle-button'
                    onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors?.password && (
                  <p className='form-errors'>{errors.password.message}</p>
                )}
              </div>

              <div className='form-group'>
                <label>
                  Confirm Password <sup>*</sup>
                </label>
                <div className='password-input-container'>
                  <input
                    {...register('confirm_password')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirm_password'
                    id='confirm_password'
                    placeholder='Confirm Password'
                    onPaste={preventPaste}
                    required
                  />
                  <button
                    type='button'
                    className='password-toggle-button'
                    onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
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
                <a
                  href='#0'
                  className='link'
                  style={{ marginLeft: '3px', marginTop: '5px' }}>
                  Terms, Privacy Policy and Fees
                </a>
              </div>

              <div className='form-group text-center mt-5'>
                <button className='cmn-btn' disabled={isRegisterPending}>
                  {isRegisterPending ? (
                    <ImSpinner
                      size={22}
                      style={{
                        animation: 'rotateAnimation 2s linear infinite',
                      }}
                    />
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </div>
            </form>

            <p className='text-center mt-4'>
              Already have an account? <a href='/login'>Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
