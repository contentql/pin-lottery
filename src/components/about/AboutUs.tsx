import { trpc } from '@/trpc/client'
import ConvertToHtml from '@/utils/convertToHtml'

const AboutUs = ({ aboutInfo }: any) => {
  const { data: aboutData = aboutInfo } = trpc.public.getAbout.useQuery()
  return (
    <section className='mt-minus-150'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='about-wrapper pt-120'>
              <div className='about-wrapper__header'>
                <div className='about-wrapper__title-top'>
                  A few words about us
                </div>
                <h2 className='about-wrapper__title'>{aboutData?.title}</h2>
              </div>
              <div className='about-wrapper__content'>
                <ConvertToHtml htmlContent={aboutData?.description_html!} />
              </div>
            </div>
            <div className='row counter-wrapper style--two justify-content-center'>
              <div className='col-lg-4 col-sm-6 text-center'>
                <div className='counter-item style--two'>
                  <div className='counter-item__content'>
                    <span>23</span>
                    <p>Winners For Last Month</p>
                  </div>
                </div>
              </div>
              <div className='col-lg-4 col-sm-6 text-center'>
                <div className='counter-item style--two'>
                  <div className='counter-item__content'>
                    <span>2837K</span>
                    <p>Tickets Sold</p>
                  </div>
                </div>
              </div>
              <div className='col-lg-4 col-sm-6 text-center'>
                <div className='counter-item style--two'>
                  <div className='counter-item__content'>
                    <span>28387K</span>
                    <p>Payouts to Winners</p>
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

export default AboutUs
