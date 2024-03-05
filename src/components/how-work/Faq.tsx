import Image from 'next/image'

import faq_el from '/public/images/elements/faq-el.png'

import SingleFaq from '@/components/singleFaq/SingleFaq'

import { trpc } from '@/trpc/client'

const Faq = () => {
  const { data: faqs } = trpc.public.getFaqs.useQuery()
  console.log('faqs', faqs)
  return (
    <section className='pb-120 position-relative'>
      <div className='faq-el'>
        <Image src={faq_el} alt='faq_el' />
      </div>
      <div className='container'>
        <div className='row justify-content-end'>
          <div className='col-lg-8 text-lg-start text-center'>
            <div className='section-header'>
              <span className='section-sub-title'>You Have Questions</span>
              <h2 className='section-title font-weight-bold'>
                WE HAVE ANSWERS
              </h2>
              <p>
                Do not hesitate to send us an email if you can&#39;t find what
                you&#39;re looking for.
              </p>
            </div>
            <div className='accordion cmn-accordion' id='accordionExample'>
              {faqs?.map((singleFaq, i) => (
                <SingleFaq key={singleFaq.id} singleFaq={singleFaq} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
