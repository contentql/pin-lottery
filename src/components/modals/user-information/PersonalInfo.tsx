'use client'

import { trpc } from '@/trpc/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import {
  TUserDetailsValidator,
  UserDetailsValidator,
} from '@/lib/validators/auth-router/user-details-validator'
import Modal from './Modal'

const PersonalInfo = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

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
    first_name,
    last_name,
    address,
    phone_number,
  }: TUserDetailsValidator) => {
    userUpdate({ first_name, last_name, address, phone_number })
  }

  return (
    <div>
      <button className='modal-button' onClick={openModal}>
        Update profile
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className='main-modal'>
          <div className='register-main '>
            <div className='register'>
              <div className='account-form-area'>
                <h3 className='title'>Complete profile</h3>
                <div className='account-form-wrapper'>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className='form-group'>
                      <label>
                        First Name <sup>*</sup>
                      </label>
                      <input
                        {...register('first_name')}
                        type='text'
                        name='first_name'
                        id='first_name'
                        placeholder='First Name'
                        required
                      />
                      {errors.first_name && (
                        <p className='form-errors'>
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>
                    <div className='form-group'>
                      <label>
                        Last Name <sup>*</sup>
                      </label>
                      <input
                        {...register('last_name')}
                        type='text'
                        name='last_name'
                        id='last_name'
                        placeholder='Last name'
                        required
                      />
                      {errors.last_name && (
                        <p className='form-errors'>
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                    <div className='form-group'>
                      <label htmlFor='address'>
                        Address <sup>*</sup>
                      </label>
                      <input
                        {...register('address')}
                        name='address'
                        id='address'
                        placeholder='Enter your address'
                        required
                      />
                      {errors.address && (
                        <p className='form-errors'>{errors.address.message}</p>
                      )}
                    </div>

                    <div className='form-group'>
                      <label htmlFor='Phone number'>
                        Phone Number <sup>*</sup>
                      </label>
                      <input
                        {...register('phone_number')}
                        name='phone_number'
                        id='phone_number'
                        type='number'
                        placeholder='Phone number'
                      />
                      {errors.phone_number && (
                        <p className='form-errors'>
                          {errors.phone_number.message}
                        </p>
                      )}
                    </div>
                    <div className='form-group text-center mt-5'>
                      <button className='cmn-btn'>save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='modal-close' onClick={() => closeModal()}>
              ×
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PersonalInfo
