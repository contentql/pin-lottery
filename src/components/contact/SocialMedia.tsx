import { FaEnvelope, FaFacebookF, FaTwitter, FaUsers } from 'react-icons/fa'

const SocialMedia = () => {
  return (
    <>
      <div className='col-lg-3 col-sm-6 mb-30'>
        <div className='social-card'>
          <div className='social-card__icon'>
            <FaFacebookF />
          </div>
          <div className='social-card__content'>
            <h3>130k</h3>
            <span>Followers</span>
          </div>
        </div>
      </div>
      <div className='col-lg-3 col-sm-6 mb-30'>
        <div className='social-card'>
          <div className='social-card__icon'>
            <FaUsers />
          </div>
          <div className='social-card__content'>
            <h3>35k</h3>
            <span>Members</span>
          </div>
        </div>
      </div>
      <div className='col-lg-3 col-sm-6 mb-30'>
        <div className='social-card'>
          <div className='social-card__icon'>
            <FaTwitter />
          </div>
          <div className='social-card__content'>
            <h3>47k</h3>
            <span>Followers</span>
          </div>
        </div>
      </div>
      <div className='col-lg-3 col-sm-6 mb-30'>
        <div className='social-card'>
          <div className='social-card__icon'>
            <FaEnvelope />
          </div>
          <div className='social-card__content'>
            <h3>29k</h3>
            <span>Subscribers</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SocialMedia
