import { Media, Tag } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

function ContestCategories({ allTags }: { allTags: Tag[] }) {
  return (
    <section className='position-relative z-index-two pt-120 pb-120 overflow-hidden'>
      <div className='container'>
        <div className='row mb-none-30 justify-content-xl-start justify-content-center'>
          {allTags?.map(tag => (
            <div key={tag?.id} className='col-xl-3 col-lg-4 col-sm-6 mb-30'>
              <div className='relative-pos'>
                <div className='play-card play-card--one'>
                  <div className='play-card__icon'>
                    {tag?.is_coming_soon ? (
                      <Image
                        src={(tag?.img as Media)?.url || ''}
                        width={100}
                        height={100}
                        alt='image-icon'
                      />
                    ) : (
                      <Link
                        href={{
                          pathname: '/contest',
                          query: { tag: tag?.tag },
                        }}>
                        <Image
                          src={(tag?.img as Media)?.url || ''}
                          width={100}
                          height={100}
                          alt='image-icon'
                        />
                      </Link>
                    )}
                  </div>
                  <div className='play-card__content'>
                    <span>
                      {' '}
                      <h3 className='play-card__title'>{tag?.tag}</h3>
                    </span>
                  </div>
                </div>
                {tag?.is_coming_soon && (
                  // <p className='badge-coming-soon'>Coming soon</p>
                  <div className='badge-coming-soon-category'>
                    <a href='#'>
                      <div className='badges'>
                        <br />
                        <p>
                          <p className='firstLine'>Coming </p>
                          <p className='secondLine'>soon </p>
                          <br />
                        </p>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContestCategories
