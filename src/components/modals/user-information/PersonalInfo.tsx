'use client'
import { useState } from 'react';
import Modal from './Modal';

const PersonalInfo = () => {

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className='modal-button' onClick={openModal}>Update profile</button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className='main-modal'>
          <div className='register-main '>
            <div className='register'>
              <div className='account-form-area'>
                <h3 className='title'>Complete profile</h3>
                <div className='account-form-wrapper'>
                  <form>
                    <div className='form-group'>
                      <label htmlFor='address'>
                        Address <sup>*</sup>
                      </label>
                      <input
                        name='address'
                        id='address'
                        placeholder='Enter your address'
                        required
                      />
                    </div>

                    <div className='form-group'>
                      <label htmlFor='Phone number'>
                        Phone Number <sup>*</sup>
                      </label>
                      <input
                        name='phone_number'
                        id='phone_number'
                        type='number'
                        placeholder='Enter your phone number'
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label>
                        Date of Birth <sup>*</sup>
                      </label>
                      <input
                        type='date'
                        name='dob'
                        id='dob'
                        placeholder='Date of birth'
                        required
                      />
                    </div>

                    <div className='form-group text-center mt-5'>
                      <button className='cmn-btn'>save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='modal-close' onClick={() => closeModal()}>
              ×
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PersonalInfo;
