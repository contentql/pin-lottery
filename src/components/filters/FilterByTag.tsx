'use client'
import { trpc } from '@/trpc/client'
import Image from 'next/image'

const FilterByTag = ({ filter, handleSearch }: any) => {
  const { data: tags } = trpc.public.getTags.useQuery()
  console.log('tags', tags)

  return (
    <ul className='nav nav-tabs winner-tab-nav' id='winnerTab' role='tablist'>
      {tags?.map((tag: any) => (
        <li key={tag?.id} className='nav-item' role='presentation'>
          <button
            disabled={tag.is_coming_soon}
            className={`nav-link ${filter === tag.tag ? 'active' : ''} tag-nav`}
            onClick={e => handleSearch(tag.tag)} //TODO: active can be added EX: className='nav-link active'
            id={tag.tag}
            data-bs-toggle='tab'
            data-bs-target='#dream'
            role='tab'
            aria-controls='dream'
            aria-selected='true'>
            <span className='icon-thumb'>
              <Image
                src={tag?.img?.url}
                alt='winner tab 1'
                width={100}
                height={100}
              />
            </span>
            <span>{tag?.tag}</span>
            {tag.is_coming_soon && (
              <p className='badge-coming-soon'>coming soon</p>
              // <div className='badge-coming-soon'>
              //   <a href='#'>
              //     <div className='badges'>
              //       <br />
              //       <p>
              //         <div className='firstLine'>Coming </div>
              //         <div className='secondLine'>soon </div>
              //         <br />
              //       </p>
              //     </div>
              //   </a>
              // </div>
            )}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default FilterByTag
