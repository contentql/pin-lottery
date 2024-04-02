'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { useDebounceCallback } from 'usehooks-ts'

const WinnerPagination = ({
  pageNumber,
  setPageNumber,
  totalContests,
}: any) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePrevious = () => {
    if (pageNumber == 1) {
    } else {
      setPageNumber((prev: number) => prev - 1)
    }
  }
  const handleNext = () => {
    if (totalContests >= pageNumber * 5) {
      setPageNumber((next: number) => next + 1)
    }
  }

  const updatedPrev = useDebounceCallback(handlePrevious, 200)
  const updatedNext = useDebounceCallback(handleNext, 200)

  return (
    <div className='mbp_pagination text-center'>
      <ul className='page_navigation'>
        <li className='page-item'>
          <span className='page-link arrow' onClick={updatedPrev}>
            <span>
              <FaAngleLeft size={24} color='black' />
            </span>
          </span>
        </li>
        <li className={pageNumber ? 'active page-item' : 'page-item'}>
          <span className='page-link '>{pageNumber}</span>
        </li>

        {/* <li
          onClick={() => setPageNumber(1)}
          className={pageNumber == 1 ? 'active page-item' : 'page-item'}>
          <span className='page-link pointer'>1</span>
        </li>
        {data.length > pageCapacity ? (
          <li
            onClick={() => setPageNumber(2)}
            className={pageNumber == 2 ? 'active page-item' : 'page-item'}>
            <span className='page-link pointer'>2</span>
          </li>
        ) : (
          ''
        )}
        {data.length > pageCapacity * 2 ? (
          <li
            onClick={() => setPageNumber(3)}
            className={pageNumber == 3 ? 'active page-item' : 'page-item'}>
            <span className='page-link pointer'>3</span>
          </li>
        ) : (
          ''
        )}

        {data.length > pageCapacity * 4 && pageNumber != 4 && <span>...</span>}
        {pageNumber > 3 &&
        Math.ceil(data.length / pageCapacity) != pageNumber ? (
          <li
            className={'active page-item'}
            onClick={() =>
              setPageNumber(Math.ceil(data.length / pageCapacity))
            }>
            <span className='page-link pointer'>{pageNumber}</span>
          </li>
        ) : (
          ''
        )}
        {data.length > pageCapacity * 4 ? (
          <li
            className={
              pageNumber == Math.ceil(data.length / pageCapacity)
                ? 'active page-item'
                : 'page-item'
            }
            onClick={() =>
              setPageNumber(Math.ceil(data.length / pageCapacity))
            }>
            <span className='page-link pointer'>
              {Math.ceil(data.length / pageCapacity)}
            </span>
          </li>
        ) : (
          ''
        )} */}

        <li className='page-item'>
          <span className='page-link' onClick={updatedNext}>
            <span>
              <FaAngleRight size={24} color='black' />
            </span>
          </span>
        </li>
      </ul>
      <p className='mt10 pagination_page_count text-center'>
        {(pageNumber - 1) * 5 + 1}-
        {pageNumber * 5 > totalContests ? totalContests : pageNumber * 5} of{' '}
        {totalContests} available
      </p>
    </div>
  )
}

export default WinnerPagination
