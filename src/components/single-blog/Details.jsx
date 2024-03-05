import Image from 'next/image'
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaRedditAlien,
  FaTwitter,
} from 'react-icons/fa'

import Social from '@/components/social/Social'

const Details = ({ blogDetails }) => {
  const blog = blogDetails?.at(0)
  return (
    <section className='mt-minus-270 pb-120'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='blog-single'>
              <div className='blog-single__header'>
                <h3 className='blog-single__title'>{blog?.title}</h3>
                <div className='blog-single__meta'>
                  <div className='left'>
                    <span className='post-date'>{blog?.createdAt}</span>
                    {/* <div className='post-author'>
                      <Image src={author} alt='author' />
                      <span className='name'>Alvin Mcdaniel</span>
                    </div> */}
                  </div>
                  <div className='right'>
                    <span>Share : </span>

                    {/* social links here */}
                    <Social
                      items={[
                        [FaFacebookF, '/'],
                        [FaTwitter, '/'],
                        [FaInstagram, '/'],
                        [FaPinterestP, '/'],
                        [FaRedditAlien, '/'],
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className='blog-single__body'>
                {/* <h4 className='title'>Lottery mistakes made by players</h4> */}
                <Image src={blog?.img?.url} width={100} height={100} alt='b2' />
                {/* <p>{blogDetails?.content}</p> */}
                {blog?.content?.map((content, index) => (
                  <div key={index}>
                    {content?.type ? (
                      <>
                        <content.type>{content.children[0].text}</content.type>{' '}
                      </>
                    ) : content.children[0].text === '' ? (
                      <p>{`\n`}</p>
                    ) : (
                      <>
                        <p>{content.children[0].text}</p>{' '}
                      </>
                    )}
                  </div>
                ))}

                {/* <h4 className='title'>Lottery winners mistakes</h4>
                <p>
                  Lottery winners are lucky people, but they can also make a lot
                  of lottery mistakes. Probably they can make more mistakes than
                  the players because when they won, euphoria and joy can hinder
                  logical thinking. Which lottery winners mistakes are the most
                  common? Which situations you have to avoid? Let’s talk about
                  the biggest lottery mistakes made by the winners of games of
                  chance.
                </p>
                <Image src={blog_b1} alt='b1' />
                <h4 className='title'>Biggest lottery mistakes in history</h4>
                <p>
                  Do you want to know more about the biggest lottery mistakes?
                  One of them is trying to double the winning by gambling. We
                  heard about many lottery winners, who wanted to multiply the
                  money. Their method was very dangerous because it was not an
                  investment. They went to the casino or used the bookmaker and
                  they… lost all the money.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Details
