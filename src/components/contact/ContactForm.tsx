import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ImSpinner } from 'react-icons/im'
import { toast } from 'react-toastify'

import {
  ContactFormValidator,
  TContactFormValidator,
} from '@/lib/validators/contact-form-validator'
import { trpc } from '@/trpc/client'

const ContactForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TContactFormValidator>({
    resolver: zodResolver(ContactFormValidator),
  })

  const {mutate:whatsappMutate}=trpc.message.contactWhatsappMessage.useMutation({
    onSuccess:()=>{
      console.log("success")
    }
  })

  const { mutate: addNewContact, isPending: isContactCompleted } =
    trpc.public.newContact.useMutation({
      onSuccess: () => {
        setValue('name', '')
        setValue('email', '')
        setValue('subject', '')
        setValue('message', '')
        setValue('phoneNumber', '')
        toast.success(`Thank you for contacting us`)
      },
      onError: error => toast.error(`error while submitting`),
    })
  const onSubmit = async({
    name,
    email,
    phoneNumber,
    message,
    subject,
  }: TContactFormValidator) => {
    whatsappMutate({email,message,name,phoneNumber,subject})
    addNewContact({ name, email, message, subject ,phoneNumber})

  }

  return (
    <div className='contact-form-wrapper'>
      <h3 className='title'>Drop us a message</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className='contact-form'
        action='/'
      >
        <div className='form-group'>
          <label>
            Name <sup>*</sup>
          </label>
          <input
            {...register('name')}
            type='text'
            name='name'
            id='name'
            placeholder='Enter Your FullName'
            required
          />
          {errors?.name && <p>{errors?.name.message}</p>}
        </div>
        <div className='form-group'>
          <label>
            Email <sup>*</sup>
          </label>
          <input
            {...register('email')}
            type='email'
            name='email'
            id='email'
            placeholder='Enter Your Email'
            required
          />
          {errors?.email && <p>{errors?.email.message}</p>}
        </div>
        <div className='form-group'>
          <label>
            Phone Number <sup>*</sup>
          </label>
          <input
            {...register('phoneNumber')}
            type='number'
            name='phoneNumber'
            id='phoneNumber'
            placeholder='Enter Your Phone Number'
            required
          />
          {errors?.phoneNumber && <p>{errors?.phoneNumber.message}</p>}
        </div>
        <div className='form-group'>
          <label>
            Subject <sup>*</sup>
          </label>
          <input
            {...register('subject')}
            type='text'
            name='subject'
            id='subject'
            placeholder='Enter Your Subject'
            required
          />
          {errors?.subject && <p>{errors?.subject.message}</p>}
        </div>
        <div className='form-group'>
          <label>
            Message <sup>*</sup>
          </label>
          <textarea
            {...register('message')}
            name='message'
            id='message'
            placeholder='Write Your Message'
            required
          ></textarea>
          {errors?.message && <p>{errors?.message.message}</p>}
        </div>
        <div className='form-group'>
          <button
            type='submit'
            className='cmn-btn justify-content-center w-100'
            disabled={isContactCompleted}
          >
            {isContactCompleted ? (
              <ImSpinner
                size={22}
                style={{
                  animation: 'rotateAnimation 2s linear infinite',
                }}
              />
            ) : (
              'send message'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
