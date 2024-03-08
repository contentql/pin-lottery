import Image from 'next/image'
import * as React from 'react'
function Icon() {
  return (
    <div className='logo'>
      <Image src='/favicon.ico' width={24} height={24} alt='TRBL Design Logo' />
    </div>
  )
}
export default Icon
