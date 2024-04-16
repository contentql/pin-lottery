import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaRedditAlien,
  FaTwitter,
} from 'react-icons/fa'

import Social from '@/components/social/Social'

const RightSide = ({
  handleSearchByTag,
  handleSearchByTitle,
  blogFilters,
  setBlogFilters,
}: {
  handleSearchByTag: Function
  handleSearchByTitle: Function
  blogFilters: { filterByTag: string; filterByTitle: string }
  setBlogFilters: any
}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [searchContent, setSearchContent] = useState('')
  const Tags = ['Loot Tips', 'Mega Millions', 'Loot', 'Winners', 'Bonus']

  const clearFilters = () => {
    const params = new URLSearchParams()
    router.push(`${pathname}?${params.toString()}#blog`)
    setBlogFilters({
      filterByTag: 'all',
      filterByTitle: '',
      pageNumber: 1,
    })
  }
  return (
    <aside className='col-lg-4 '>
      <div className='sidebar card-sticky-pos'>
        {/* Latest Post Section here */}
        {/* <LatestPost blogData={blogData} /> */}
        <div className='widget'>
          <h3 className='widget__title'>Featured Tags</h3>
          <div className='tags'>
            {Tags?.map((tag, index) => (
              <button
                key={index}
                className={`${blogFilters.filterByTag === tag ? 'active' : ''}`}
                onClick={() => handleSearchByTag(tag)}>
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className='widget'>
          <h3 className='widget__title'>sidebar</h3>
          <div className='sidebar-search'>
            <input
              type='search'
              name='sidebar-search'
              id='sidebar-search'
              placeholder='Enter your Search Content'
              onChange={e => {
                setSearchContent(e.target.value)
              }}
            />
            <button
              type='button'
              onClick={() => handleSearchByTitle(searchContent)}>
              {/* <i className='fas fa-search'></i> search */} Search
            </button>
            <button
              type='button'
              className='ml-20'
              onClick={() => clearFilters()}>
              {/* <i className='fas fa-search'></i> search */} Clear
            </button>
          </div>
        </div>

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
        {/* <Categories /> */}
      </div>
    </aside>
  )
}

export default RightSide
