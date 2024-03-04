
import { ContactFormValidator, TContactFormValidator } from '@/lib/validators/contact-form-validator';
import { trpc } from '@/trpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TContactFormValidator>({
    resolver: zodResolver(ContactFormValidator),
  });

  const { mutate:addNewContact } = trpc.contact.newContact.useMutation({
    onSuccess: () => console.log('Contact successfully updated'),
    onError:(error) => console.log('Contact failed to be updated'),
  })
  const onSubmit = ({name,email,message,subject}:TContactFormValidator) => {
    addNewContact({name,email,message,subject})
  }
  
  return (
    <div className='contact-form-wrapper'>
      <h3 className='title'>Drop us a message</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className='contact-form' action='/'>
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
          >
            send message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
