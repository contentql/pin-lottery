import { useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'

import VedioModal from '@/components/vedioModal/VedioModal'

const Vedio = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='pb-120 mt-minus-150'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='video-wrapper bg_img'>
              <button
                className='cmn-btn text-capitalize'
                onClick={() => setIsOpen(!isOpen)}
              >
                watch video
                <BsFillPlayFill className='fs-3' />
              </button>
              {/* vedio modal here  */}
              <VedioModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                link='https://www.youtube.com/embed/d6xn5uflUjg'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vedio
