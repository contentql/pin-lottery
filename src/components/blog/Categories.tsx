import Link from 'next/link'

const Categories = () => {
  return (
    <div className='widget'>
      <h3 className='widget__title'>Categories</h3>
      <ul className='category-list'>
        {[
          ['All', 50],
          ['Jackpot', 40],
          ['Winners', 55],
          ['Powerball', 36],
          ['Mega Millions', 26],
          ['Inspiration', 22],
          ['Bonus', 38],
        ].map(([category, itm]) => (
          <li key={category}>
            <Link href='#'>
              {category} <span>{itm}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
