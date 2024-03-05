import { FaRegEdit } from 'react-icons/fa'

const Info = () => {
  return (
    <div className='col-lg-8 mt-lg-0 mt-5'>
      <div className='user-info-card'>
        <div className='user-info-card__header'>
          <h3 className='user-info-card__title'>Personal Details</h3>
          <button type='button' className='d-flex align-items-start gap-1'>
            <FaRegEdit className='fs-4' />
            Edit
          </button>
        </div>
        <ul className='user-info-card__list'>
          <li>
            <span className='caption'>Name</span>
            <span className='value'>Albert Owens</span>
          </li>
          <li>
            <span className='caption'>Date of Birth</span>
            <span className='value'>15-03-1974</span>
          </li>
          <li>
            <span className='caption'>Address</span>
            <span className='value'>
              8198 Fieldstone Dr.La Crosse, WI 54601
            </span>
          </li>
          <li>
            <span className='caption'>Email</span>
            <span className='value'>albert349@gmail.com</span>
          </li>
          <li>
            <span className='caption'>Mobile</span>
            <span className='value'>+1 234-567-8925</span>
          </li>
        </ul>
      </div>
      {/* <div className='user-info-card'>
        <div className='user-info-card__header'>
          <h3 className='user-info-card__title'>Account Settings</h3>
          <button type='button' className='d-flex align-items-start gap-1'>
            <FaRegEdit className='fs-4' /> Edit
          </button>
        </div>
        <ul className='user-info-card__list'>
          <li>
            <span className='caption'>Language</span>
            <span className='value'>English (United States)</span>
          </li>
          <li>
            <span className='caption'>Time Zone</span>
            <span className='value'>(GMT-06:00) Central America</span>
          </li>
          <li>
            <span className='caption'>Status</span>
            <span className='value status-active'>Active</span>
          </li>
        </ul>
      </div>
      <div className='user-info-card'>
        <div className='user-info-card__header'>
          <h3 className='user-info-card__title'>Email Addresses</h3>
          <button type='button' className='d-flex align-items-start gap-1'>
            <FaRegEdit className='fs-4' /> Edit
          </button>
        </div>
        <ul className='user-info-card__list'></ul>
      </div>
      <div className='user-info-card'>
        <div className='user-info-card__header'>
          <h3 className='user-info-card__title'>Phone</h3>
          <button type='button' className='d-flex align-items-start gap-1'>
            <FaRegEdit className='fs-4' /> Edit
          </button>
        </div>
        <ul className='user-info-card__list'>
          <li>
            <span className='caption'>Mobile</span>
            <span className='value'>+1 234-567-8925</span>
          </li>
        </ul>
      </div> */}
      <div className='user-info-card'>
        <div className='user-info-card__header'>
          <h3 className='user-info-card__title'>Security</h3>
          <button type='button' className='d-flex align-items-start gap-1'>
            <FaRegEdit className='fs-4' /> Edit
          </button>
        </div>
        <ul className='user-info-card__list'>
          <li>
            <span className='caption'>Password</span>
            <span className='value user-password'>***************</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Info
