const PaymentSuccess = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div className='success-container'>
          <div className='success-checkmark'>
            <div className='check-icon'>
              <span className='icon-line line-tip'></span>
              <span className='icon-line line-long'></span>
              <div className='icon-circle'></div>
              <div className='icon-fix'></div>
            </div>
          </div>
          <h3 style={{ fontSize: '18px', color: '#333' }}>
            Your payment was successful.
          </h3>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
