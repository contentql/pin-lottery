import { FaRegEdit } from 'react-icons/fa'

const UserDetailsSkeleton = () => {
  return (
    <div className='col-lg-8 mt-lg-0 mt-5'>
      <div className='user-info-card user-isloading'>
        <form>
          <div className='user-info-card__header'>
            <h3 className='user-info-card__title'>Personal Details</h3>
            <button
              type='button'
              className='d-flex align-items-start gap-1 transparent-button'>
              <FaRegEdit className='fs-4' />
              Edit
            </button>
          </div>
          <ul className='user-info-card__list'>
            <li>
              <span className='caption'>Name</span>
              <span className='loading-field'></span>
            </li>
            <li>
              <span className='caption'>Date of Birth</span>
              <span className='loading-field'></span>
            </li>
            <li>
              <span className='caption'>Address</span>
              <span className='loading-field'></span>
            </li>
            <li>
              <span className='caption'>Mobile</span>
              <span className='loading-field'></span>
            </li>
          </ul>
        </form>
      </div>
      <div className='user-info-card  user-isloading'>
        <form>
          <div className='user-info-card__header'>
            <h3 className='user-info-card__title'>Email Addresses</h3>

            <button
              type='button'
              className='d-flex align-items-start gap-1 transparent-button'>
              <FaRegEdit className='fs-4' />
              Edit
            </button>
          </div>
          <ul className='user-info-card__list'>
            <li>
              <span className='caption'>Email</span>
              <span className='loading-field'></span>
            </li>
          </ul>
        </form>
      </div>
      <div className='user-info-card  user-isloading'>
        <form>
          <div className='user-info-card__header'>
            <h3 className='user-info-card__title'>Security</h3>
            <button
              type='button'
              className='d-flex align-items-start gap-1 transparent-button'>
              <FaRegEdit className='fs-4' />
              Edit
            </button>
          </div>
          <ul className='user-info-card__list'>
            <li>
              <span className='caption'>Password:</span>
              <span className='loading-field'></span>
            </li>
          </ul>
        </form>
      </div>
    </div>
  )
}

export default UserDetailsSkeleton
