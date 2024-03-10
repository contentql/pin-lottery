import { trpc } from '@/trpc/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'

import {
  TUserDetailsValidator,
  UserDetailsValidator,
} from '@/lib/validators/auth-router/user-details-validator'

const Info = () => {
  const [isEditMode, setIsEditMode] = useState(false)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserDetailsValidator>({
    resolver: zodResolver(UserDetailsValidator),
  })

  const { mutate: userUpdate } = trpc.auth.updateUserDetails.useMutation({
    onSuccess: () => {
      handleCancel()
      toast.success(`Details updated successfully`)
    },
    onError: () => {
      toast.error(`Unable to update user details`)
    },
  })

  const onSubmit = ({
    user_name,
    dob,
    address,
    phone_number,
  }: TUserDetailsValidator) => {
    userUpdate({ user_name, dob, address, phone_number })
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setValue('user_name', '')
    setValue('dob', undefined)
    setValue('address', '')
    setValue('phone_number', '')
  }

  return (
    <div className='col-lg-8 mt-lg-0 mt-5'>
      <div className='user-info-card'>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='user-info-card__header'>
            <h3 className='user-info-card__title'>Personal Details</h3>
            {isEditMode ? (
              <div className='button-container'>
                <button
                  type='button'
                  className='cancel-button'
                  onClick={() => handleCancel}>
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
                onClick={() => setIsEditMode(true)}>
                <FaRegEdit className='fs-4' />
                Edit
              </button>
            )}
          </div>
          <ul className='user-info-card__list'>
            <li>
              <span className='caption'>Name</span>
              <span className='value'>
                {isEditMode ? (
                  <>
                    <input
                      {...register('user_name')}
                      type='text'
                      name='user_name'
                      id='user_name'
                      placeholder='Username'
                      required
                    />
                    {errors?.user_name && (
                      <p className='form-errors'>
                        {errors?.user_name?.message}
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
                {isEditMode ? (
                  <>
                    <input
                      {...register('dob')}
                      type='date'
                      name='dob'
                      id='dob'
                      placeholder='DOB'
                      required
                    />
                    {errors?.dob && (
                      <p className='form-errors'>{errors?.dob?.message}</p>
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
                {isEditMode ? (
                  <>
                    <input
                      {...register('address')}
                      type='text'
                      name='address'
                      id='address'
                      placeholder='Address'
                      required
                    />
                    {errors?.address && (
                      <p className='form-errors'>{errors?.address?.message}</p>
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
                {isEditMode ? (
                  <>
                    <input
                      {...register('phone_number')}
                      type='text'
                      name='mobile'
                      id='mobile'
                      placeholder='mobile'
                      required
                    />
                    {errors?.phone_number && (
                      <p className='form-errors'>
                        {errors?.phone_number?.message}
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
        <div className='user-info-card__header'>
          <h3 className='user-info-card__title'>Email Addresses</h3>
          <button
            type='button'
            className='d-flex align-items-start gap-1 transparent-button'>
            <FaRegEdit className='fs-4' /> Edit
          </button>
        </div>
        <ul className='user-info-card__list'>
          <li>
            <span className='caption'>Email</span>
            <span className='value'>albert349@gmail.com</span>
          </li>
        </ul>
      </div>
      <div className='user-info-card'>
        <div className='user-info-card__header'>
          <h3 className='user-info-card__title'>Security</h3>
          <button
            type='button'
            className='d-flex align-items-start gap-1 transparent-button'>
            <FaRegEdit className='fs-4' /> Edit
          </button>
        </div>
        <ul className='user-info-card__list'>
          <li>
            <span className='caption'>Password</span>
            <span className='value user-password'>***************</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Info
