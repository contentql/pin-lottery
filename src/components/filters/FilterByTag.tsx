'use client'
import { trpc } from '@/trpc/client'
import Image from 'next/image'

const FilterByTag = ({ filter, handleSearch }: any) => {
  const { data: tags } = trpc.public.getTags.useQuery()

  return (
    <ul className='nav nav-tabs winner-tab-nav' id='winnerTab' role='tablist'>
      {tags?.map((tag: any) => (
        <li key={tag?.id} className='nav-item' role='presentation'>
          <button
            className={`nav-link ${filter === tag.tag ? 'active' : ''}`}
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
          </button>
        </li>
      ))}
    </ul>
  )
}

export default FilterByTag
