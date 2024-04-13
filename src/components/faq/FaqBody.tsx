import SingleFaq from '../singleFaq/SingleFaq'
import { useState } from 'react'

import { Faq } from '@/payload-types'

const FaqBody = ({ faqsData }: { faqsData: Faq }) => {
  const [faqData, setFaqData] = useState({
    faqType: faqsData?.faqs?.at(0)?.faq_type,
    faqIndex: 0,
  })
  const [isCollapsed, setIsCollapsed] = useState(true)

  const handleFaqType = (faqType: string, index: number) => {
    setFaqData({ faqIndex: index, faqType: faqType })
  }
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }
  return (
    <section className='pb-120 mt-minus-150'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='faq-top-wrapper pt-120'>
              <div className='section-header text-center'>
                <span className='section-sub-title'>You Have Questions</span>
                <h2 className='section-title'>{faqsData?.title}</h2>
                <p>{faqsData?.description}</p>
              </div>
              <ul
                className='nav nav-tabs cmn-tabs justify-content-center'
                id='myTab'
                role='tablist'
              >
                {faqsData?.faqs?.map((faqsType, index) => (
                  <li key={index} className='nav-item' role='presentation'>
                    <button
                      className={`nav-link ${faqsType?.faq_type === faqData?.faqType ? 'active' : ''}`}
                      id='ticket-tab'
                      data-bs-toggle='tab'
                      data-bs-target='#ticket'
                      role='tab'
                      aria-controls='ticket'
                      aria-selected='false'
                      onClick={() => handleFaqType(faqsType?.faq_type!, index)}
                    >
                      {faqsType?.faq_type}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-lg-10'>
            <div className='faq-body-wrapper'>
              <div className='tab-content' id='myTabContent'>
                <div
                  className='tab-pane fade show active'
                  id='ticket'
                  role='tabpanel'
                  aria-labelledby='ticket-tab'
                >
                  {/* Tickets here */}
                  <div className='accordion cmn-accordion' id='faqAcc-one'>
                    {faqsData?.faqs
                      ?.at(faqData?.faqIndex)
                      ?.faq?.map((faq, index) => (
                        <SingleFaq key={faq.id} singleFaq={faq} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaqBody
