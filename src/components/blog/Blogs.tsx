import LeftSide from './LeftSide'
import RightSide from './RightSide'

const Blogs = ({ blogData }: any) => {
  return (
    <div className='row mt-50'>
      {/* Left side section here */}
      <LeftSide blogData={blogData} />

      {/* Right side section here */}
      <RightSide />
    </div>
  )
}

export default Blogs
