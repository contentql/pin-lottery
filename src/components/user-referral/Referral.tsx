import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

const Referral = () => {
  const [copyValue, setCopyValue] = useState({
    value: 'https://rifa.com/?ref=albert24',
    copied: false,
  })

  return (
    <div className='referral-link-wrapper'>
      <h3 className='title'>Partners</h3>
      <div className='copy-link'>
        <span className='copy-link-icon'>
          <i className='las la-link'></i>
        </span>
        <span className='label'>Referral Link :</span>
        <div className='copy-link-inner'>
          <form data-copy={true}>
            <input
              type='text'
              onChange={e =>
                setCopyValue({ value: e.target.value, copied: false })
              }
              value={copyValue.value}
              data-click-select-all
            />
            <CopyToClipboard text={copyValue.value}>
              <input
                type='button'
                value='Copy Link'
                onCopy={() =>
                  setCopyValue((prev: any) => ({
                    ...prev,
                    copied: true,
                  }))
                }
              />
            </CopyToClipboard>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Referral
