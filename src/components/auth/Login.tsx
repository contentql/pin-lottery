import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ImSpinner } from 'react-icons/im'
import { toast } from 'react-toastify'

import {
  LoginValidator,
  TLoginValidator,
} from '@/lib/validators/auth-router/login-validator'
import { useAuth } from '@/providers/Auth'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValidator>({
    resolver: zodResolver(LoginValidator),
  })

  const router = useRouter()

  const { login } = useAuth()

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { mutate: loginUser, isPending: isLoginPending } = useMutation({
    mutationFn: (args: { email: string; password: string }) => login(args),
    onError: (err: Error) => {
      toast.error(err.message)
      console.error(err)
    },
    onSuccess: () => {
      setValue('email', '')
      setValue('password', '')
      router.back()
    },
  })

  const onSubmit = ({ email, password }: TLoginValidator) => {
    loginUser({ email, password })
  }

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
                {errors?.email && (
                  <p className='form-errors'>{errors?.email.message}</p>
                )}
              </div>
              <div className='form-group'>
                <label>
                  password <sup>*</sup>
                </label>
                <div className='password-input-container'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='signin-password'
                    placeholder='password'
                    required
                    {...register('password')}
                  />
                  <button
                    type='button'
                    className='password-toggle-button'
                    onClick={() => {
                      setShowPassword(!showPassword)
                    }}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
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
              </div>

              <div className='form-group text-center mt-5'>
                <button
                  disabled={isLoginPending}
                  className='cmn-btn'
                  type='submit'>
                  {isLoginPending ? (
                    <ImSpinner
                      size={22}
                      style={{
                        animation: 'rotateAnimation 2s linear infinite',
                      }}
                    />
                  ) : (
                    'login'
                  )}
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
  )
}

export default Login
