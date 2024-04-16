import { Blog } from '@/payload-types'

import LeftSide from './LeftSide'
import RightSide from './RightSide'

const Blogs = ({
  blogData,
  handleSearchByTag,
  handleSearchByTitle,
  blogFilters,
  setBlogFilters,
}: {
  blogData: Blog[]
  handleSearchByTag: Function
  handleSearchByTitle: Function
  blogFilters: { filterByTag: string; filterByTitle: string }
  setBlogFilters: any
}) => {
  return (
    <div className='row mt-50'>
      {/* Left side section here */}
      <LeftSide blogData={blogData as Blog[]} />

      {/* Right side section here */}
      <RightSide
        handleSearchByTag={handleSearchByTag}
        blogFilters={blogFilters}
        handleSearchByTitle={handleSearchByTitle}
        setBlogFilters={setBlogFilters as any}
      />
    </div>
  )
}

export default Blogs
