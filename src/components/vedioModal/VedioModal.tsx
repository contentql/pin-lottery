import { BsXLg } from 'react-icons/bs'

const VedioModal = ({ isOpen, setIsOpen, link }: any) => {
  return (
    <div
      className={`modal-video ${
        isOpen ? 'd-block' : 'd-none modal-video-effect-exit'
      }`}
    >
      <div className='modal-video-body'>
        <div className='modal-video-inner'>
          <div className='modal-video-movie-wrap'>
            <button
              className='modal-video-close-btn'
              onClick={() => setIsOpen(false)}
            >
              <BsXLg />
            </button>
            <iframe
              width='460'
              height='230'
              src={link}
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen={true}
              tabIndex={-1}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VedioModal
