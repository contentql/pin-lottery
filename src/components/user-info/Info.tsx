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
    handleSubmit,
    formState: { errors },
  } = useForm<TUserDetailsValidator>({
    resolver: zodResolver(UserDetailsValidator),
  })

  const { mutate: userUpdate } = trpc.auth.updateUserDetails.useMutation({
    onSuccess: () => {
      toast.success(`Details updated successfully`)
    },
    onError: () => {
      toast.error(`Unable to update user details`)
    },
  })

  const onSubmit = ({
    username,
    dob,
    address,
    phone_number,
  }: TUserDetailsValidator) => {
    userUpdate({ username, dob, address, phone_number })
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
                  onClick={() => setIsEditMode(false)}>
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
                  <input
                    {...register('username')}
                    type='text'
                    name='username'
                    id='username'
                    placeholder='Username'
                    required
                  />
                ) : (
                  'Albert Owens'
                )}
              </span>
            </li>
            <li>
              <span className='caption'>Date of Birth</span>
              <span className='value'>
                {isEditMode ? (
                  <input
                    type='date'
                    name='dob'
                    id='dob'
                    placeholder='DOB'
                    required
                  />
                ) : (
                  '15-03-1974'
                )}
              </span>
            </li>
            <li>
              <span className='caption'>Address</span>
              <span className='value'>
                {isEditMode ? (
                  <input
                    type='text'
                    name='address'
                    id='address'
                    placeholder='Address'
                    required
                  />
                ) : (
                  '8198 Fieldstone Dr.La Crosse, WI 54601'
                )}
              </span>
            </li>
            <li>
              <span className='caption'>Mobile</span>
              <span className='value'>
                {isEditMode ? (
                  <input
                    type='text'
                    name='mobile'
                    id='mobile'
                    placeholder='mobile'
                    required
                  />
                ) : (
                  '+1 234-567-8925'
                )}
              </span>
            </li>
          </ul>
        </form>
      </div>
      {/* <div className='user-info-card'>
        <div className='user-info-card__header'>
          <h3 className='user-info-card__title'>Account Settings</h3>
          <button type='button' className='d-flex align-items-start gap-1 transparent-button'>
            <FaRegEdit className='fs-4' /> Edit
          </button>
        </div>
        <ul className='user-info-card__list'>
          <li>
            <span className='caption'>Language</span>
            <span className='value'>English (United States)</span>
          </li>
          <li>
            <span className='caption'>Time Zone</span>
            <span className='value'>(GMT-06:00) Central America</span>
          </li>
          <li>
            <span className='caption'>Status</span>
            <span className='value status-active'>Active</span>
          </li>
        </ul>
      </div>
      <div className='user-info-card'>
        <div className='user-info-card__header'>
          <h3 className='user-info-card__title'>Email Addresses</h3>
          <button type='button' className='d-flex align-items-start gap-1 transparent-button'>
            <FaRegEdit className='fs-4' /> Edit
          </button>
        </div>
        <ul className='user-info-card__list'></ul>
      </div>
      <div className='user-info-card'>
        <div className='user-info-card__header'>
          <h3 className='user-info-card__title'>Phone</h3>
          <button type='button' className='d-flex align-items-start gap-1 transparent-button'>
            <FaRegEdit className='fs-4' /> Edit
          </button>
        </div>
        <ul className='user-info-card__list'>
          <li>
            <span className='caption'>Mobile</span>
            <span className='value'>+1 234-567-8925</span>
          </li>
        </ul>
      </div> */}
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
