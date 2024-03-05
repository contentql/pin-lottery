import Link from 'next/link'
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaRedditAlien,
  FaTwitter,
} from 'react-icons/fa'

import Social from '@/components/social/Social'

import { blogData } from '@/data/blogData'

import Categories from './Categories'
import LatestPost from './LatestPost'

const RightSide = () => {
  return (
    <aside className='col-lg-4'>
      <div className='sidebar'>
        <div className='widget'>
          <h3 className='widget__title'>sidebar</h3>
          <form className='sidebar-search'>
            <input
              type='search'
              name='sidebar-search'
              id='sidebar-search'
              placeholder='Enter your Search Content'
            />
            <button type='submit'>
              <i className='fas fa-search'></i> search
            </button>
          </form>
        </div>

        {/* Latest Post Section here */}
        <LatestPost blogData={blogData} />

        <div className='widget'>
          <h3 className='widget__title'>Follow Us</h3>
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

        {/* Categories Post Section here */}
        <Categories />

        <div className='widget'>
          <h3 className='widget__title'>Featured Tags</h3>
          <div className='tags'>
            <Link href='/#'>Loot tips</Link>
            <Link href='/#'>Mega Millions </Link>
            <Link href='/#'>Lotto</Link>
            <Link href='/#'>Winners</Link>
            <Link href='/#'>Bonus</Link>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default RightSide
