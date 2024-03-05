import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ZodError } from 'zod'

import {
  LoginValidator,
  TLoginValidator,
} from '@/lib/validators/auth-router/login-validator'
import { useAuth } from '@/providers/Auth'
import { useMutation } from '@tanstack/react-query'

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

  const { mutate: loginUser } = useMutation({
    mutationFn: (args: { email: string; password: string }) => login(args),
    onError: (err: Error) => {
      if (err.message === 'Invalid login') {
        toast.error(`Invalid email or password.`)
      }

      if (err instanceof ZodError) {
        toast.error(`Please provide correct information.`)
        return
      }
      console.error(err)
    },
    onSuccess: () => {
      setValue('email', '')
      setValue('password', '')
      router.push('/user')
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
  )
}

export default Login
