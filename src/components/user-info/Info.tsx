import { trpc } from '@/trpc/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'

import {
  TUserEmailValidator,
  TUserPasswordValidator,
  TUserPersonalDetailsValidator,
  UserEmailValidator,
  UserPasswordValidator,
  UserPersonalDetailsValidator,
} from '@/lib/validators/auth-router/user-details-validator'

const Info = () => {
  const [isEditMode, setIsEditMode] = useState({
    personalDetails: false,
    email: false,
    password: false,
  })

  const {
    register: registerPersonalDetails,
    setValue: setPersonalDetailsValue,
    handleSubmit: handlePersonalDetailsSubmit,
    formState: { errors: personalDetailsErrors },
  } = useForm<TUserPersonalDetailsValidator>({
    resolver: zodResolver(UserPersonalDetailsValidator),
  })

  const {
    register: registerEmail,
    setValue: setEmailValue,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<TUserEmailValidator>({
    resolver: zodResolver(UserEmailValidator),
  })

  const {
    register: registerPassword,
    setValue: setPasswordValue,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm<TUserPasswordValidator>({
    resolver: zodResolver(UserPasswordValidator),
  })

  const { mutate: userUpdate } =
    trpc.auth.updateUserPersonalDetails.useMutation({
      onSuccess: () => {
        handlePersonalDetailsCancel()
        toast.success(`Details updated successfully`)
      },
      onError: () => {
        toast.error(`Unable to update user details`)
      },
    })

  const onPersonalDetailsSubmit = ({
    user_name,
    dob,
    address,
    phone_number,
  }: TUserPersonalDetailsValidator) => {
    userUpdate({ user_name, dob, address, phone_number })
  }

  const onEmailSubmit = ({ email }: TUserEmailValidator) => {}

  const onPasswordSubmit = ({
    password,
    confirm_password,
  }: TUserPasswordValidator) => {}

  const handlePersonalDetailsCancel = () => {
    setIsEditMode(prev => ({ ...prev, personalDetails: false }))
    setPersonalDetailsValue('user_name', '')
    setPersonalDetailsValue('dob', undefined)
    setPersonalDetailsValue('address', '')
    setPersonalDetailsValue('phone_number', '')
  }

  const handleEmailCancel = () => {
    setIsEditMode(prev => ({ ...prev, email: false }))
    setEmailValue('email', '')
  }

  const handlePasswordCancel = () => {
    setIsEditMode(prev => ({ ...prev, password: false }))
    setPasswordValue('password', '')
    setPasswordValue('confirm_password', '')
  }

  return (
    <div className='col-lg-8 mt-lg-0 mt-5'>
      <div className='user-info-card'>
        <form
          onSubmit={handlePersonalDetailsSubmit(onPersonalDetailsSubmit)}
          noValidate>
          <div className='user-info-card__header'>
            <h3 className='user-info-card__title'>Personal Details</h3>
            {isEditMode.personalDetails ? (
              <div className='button-container'>
                <button
                  type='button'
                  className='cancel-button'
                  onClick={() => handlePersonalDetailsCancel()}>
                  Cancel
                </button>{' '}
                <button type='submit' className='save-button'>
                  Save
                </button>{' '}
              </div>
            ) : (
              <button
                type='button'
                className='d-flex align-items-start gap-1 transparent-button'
                onClick={() =>
                  setIsEditMode(prev => ({ ...prev, personalDetails: true }))
                }>
                <FaRegEdit className='fs-4' />
                Edit
              </button>
            )}
          </div>
          <ul className='user-info-card__list'>
            <li>
              <span className='caption'>Name</span>
              <span className='value'>
                {isEditMode.personalDetails ? (
                  <>
                    <input
                      {...registerPersonalDetails('user_name')}
                      type='text'
                      name='user_name'
                      id='user_name'
                      placeholder='Username'
                      required
                    />
                    {personalDetailsErrors?.user_name && (
                      <p className='form-errors'>
                        {personalDetailsErrors?.user_name?.message}
                      </p>
                    )}
                  </>
                ) : (
                  'Albert Owens'
                )}
              </span>
            </li>
            <li>
              <span className='caption'>Date of Birth</span>
              <span className='value'>
                {isEditMode.personalDetails ? (
                  <>
                    <input
                      {...registerPersonalDetails('dob')}
                      type='date'
                      name='dob'
                      id='dob'
                      placeholder='DOB'
                      required
                    />
                    {personalDetailsErrors?.dob && (
                      <p className='form-errors'>
                        {personalDetailsErrors?.dob?.message}
                      </p>
                    )}
                  </>
                ) : (
                  '15-03-1974'
                )}
              </span>
            </li>
            <li>
              <span className='caption'>Address</span>
              <span className='value'>
                {isEditMode.personalDetails ? (
                  <>
                    <input
                      {...registerPersonalDetails('address')}
                      type='text'
                      name='address'
                      id='address'
                      placeholder='Address'
                      required
                    />
                    {personalDetailsErrors?.address && (
                      <p className='form-errors'>
                        {personalDetailsErrors?.address?.message}
                      </p>
                    )}
                  </>
                ) : (
                  '8198 Fieldstone Dr.La Crosse, WI 54601'
                )}
              </span>
            </li>
            <li>
              <span className='caption'>Mobile</span>
              <span className='value'>
                {isEditMode.personalDetails ? (
                  <>
                    <input
                      {...registerPersonalDetails('phone_number')}
                      type='text'
                      name='mobile'
                      id='mobile'
                      placeholder='mobile'
                      required
                    />
                    {personalDetailsErrors?.phone_number && (
                      <p className='form-errors'>
                        {personalDetailsErrors?.phone_number?.message}
                      </p>
                    )}
                  </>
                ) : (
                  '+1 234-567-8925'
                )}
              </span>
            </li>
          </ul>
        </form>
      </div>
      <div className='user-info-card'>
        <form onSubmit={handleEmailSubmit(onEmailSubmit)} noValidate>
          <div className='user-info-card__header'>
            <h3 className='user-info-card__title'>Email Addresses</h3>
            {isEditMode.email ? (
              <div className='button-container'>
                <button
                  type='button'
                  className='cancel-button'
                  onClick={() => handleEmailCancel()}>
                  Cancel
                </button>{' '}
                <button type='submit' className='save-button'>
                  Save
                </button>{' '}
              </div>
            ) : (
              <button
                type='button'
                className='d-flex align-items-start gap-1 transparent-button'
                onClick={() =>
                  setIsEditMode(prev => ({ ...prev, email: true }))
                }>
                <FaRegEdit className='fs-4' />
                Edit
              </button>
            )}
          </div>
          <ul className='user-info-card__list'>
            <li>
              <span className='caption'>Email</span>
              <span className='value'>
                {isEditMode.email ? (
                  <>
                    <input
                      {...registerEmail('email')}
                      type='text'
                      name='email'
                      id='email'
                      placeholder='email'
                      required
                    />
                    {emailErrors?.email && (
                      <p className='form-errors'>
                        {emailErrors?.email?.message}
                      </p>
                    )}
                  </>
                ) : (
                  'albert349@gmail.com'
                )}
              </span>
            </li>
          </ul>
        </form>
      </div>
      <div className='user-info-card'>
        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} noValidate>
          <div className='user-info-card__header'>
            <h3 className='user-info-card__title'>Security</h3>
            {isEditMode.password ? (
              <div className='button-container'>
                <button
                  type='button'
                  className='cancel-button'
                  onClick={() => handlePasswordCancel()}>
                  Cancel
                </button>{' '}
                <button type='submit' className='save-button'>
                  Save
                </button>{' '}
              </div>
            ) : (
              <button
                type='button'
                className='d-flex align-items-start gap-1 transparent-button'
                onClick={() =>
                  setIsEditMode(prev => ({ ...prev, password: true }))
                }>
                <FaRegEdit className='fs-4' />
                Edit
              </button>
            )}
          </div>
          <ul className='user-info-card__list'>
            <li>
              <span className='caption'>Password</span>
              <span className='value user-password'>
                {isEditMode.password ? (
                  <>
                    <input
                      {...registerPassword('password')}
                      type='password'
                      name='password'
                      id='password'
                      placeholder='******'
                      required
                    />
                    {passwordErrors?.password && (
                      <p className='form-errors'>
                        {passwordErrors?.password?.message}
                      </p>
                    )}
                  </>
                ) : (
                  '***************'
                )}
              </span>
            </li>
            {isEditMode.password && (
              <li>
                <span className='caption'>Confirm Password</span>
                <span className='value user-password'>
                  <input
                    {...registerPassword('confirm_password')}
                    type='password'
                    name='confirm_password'
                    id='confirm_password'
                    placeholder='******'
                    required
                  />
                  {passwordErrors?.confirm_password && (
                    <p className='form-errors'>
                      {passwordErrors?.confirm_password?.message}
                    </p>
                  )}
                </span>
              </li>
            )}
          </ul>
        </form>
      </div>
    </div>
  )
}

export default Info
