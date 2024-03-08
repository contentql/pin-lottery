import Image from 'next/image'
import * as React from 'react'
function Logo() {
  return (
    <div className='logo'>
      <Image
        src='/images/client/3.png'
        width={200}
        height={20}
        alt='TRBL Design Logo'
      />
    </div>
  )
}
export default Logo
