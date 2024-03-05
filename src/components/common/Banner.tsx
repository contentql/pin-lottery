import Link from 'next/link'

const Banner = ({ breadcrumb }: any) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-12'>
          <ul className='page-list'>
            {breadcrumb?.map(([itm, link]: any, i: any, arr: any) => (
              <li key={itm}>
                {i !== arr.length - 1 ? <Link href={link}>{itm}</Link> : itm}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Banner
