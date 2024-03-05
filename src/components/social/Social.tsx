import Link from 'next/link'

const Social = ({ items }: any) => {
  return (
    <ul className='social-link-list'>
      {items?.map(([Item, url]: any, i: any) => (
        <li key={i}>
          <Link href={url}>
            <i>
              <Item />
            </i>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Social
