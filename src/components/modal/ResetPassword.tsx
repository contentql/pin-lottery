const ResetPassword = () => {
  return (
    <div className='register-main'>
      <div className='register'>
        <div className='account-form-area'>
          <h3 className='title'>Reset password</h3>
          <div className='account-form-wrapper'>
            <form noValidate>
              <div className='form-group'>
                <label>
                  password <sup>*</sup>
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='password'
                  required
                />
              </div>

              <div className='form-group'>
                <label>
                  confirm password <sup>*</sup>
                </label>
                <input
                  type='password'
                  name='signup_re-pass'
                  id='conform_re-pass'
                  placeholder='Confirm Password'
                  required
                />
              </div>

              {/* <div className='d-flex flex-wrap mt-2'>
                <div className='custom-checkbox'>
                  <input type='checkbox' name='id-2' id='id-2' defaultChecked />
                  <label htmlFor='id-2'>I agree to the</label>
                  <span className='checkbox'></span>
                </div>
                <a href='#0' className='link ml-1'>
                  Terms, Privacy Policy and Fees
                </a>
              </div> */}

              <div className='form-group text-center mt-5'>
                <button className='cmn-btn' type='submit'>
                  reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
