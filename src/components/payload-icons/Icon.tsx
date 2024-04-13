import Image from 'next/image'
import * as React from 'react'

function Icon() {
  return (
    <div className='logo'>
      <Image src='/favicon.ico' width={28} height={28} alt='TRBL Design Logo' />
    </div>
  )
}
export default Icon
