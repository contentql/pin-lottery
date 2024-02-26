const VerificationFailed = () => {
  return (
    <div className='register-main'>
      <div className='register'>
        <div className='account-form-area'>
          <h3 className='title'>Error while verifying</h3>
          <div className='account-form-wrapper'>
            <div className='failed-description'>
              We apologize, but it seems there was an issue verifying your
              account. Please retry the verification process to access your
              account securely.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationFailed;
