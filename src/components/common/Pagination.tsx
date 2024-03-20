'use client'

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

const PaginationTwo = ({ filters, setFilters, totalContests }: any) => {
  const handlePrevious = () => {
    if (filters.pageNumber == 1) {
    } else {
      setFilters({ ...filters, pageNumber: filters.pageNumber - 1 })
    }
  }
  const handleNext = () => {
    setFilters({ ...filters, pageNumber: filters.pageNumber + 1 })
  }

  return (
    <div className='mbp_pagination text-center'>
      <ul className='page_navigation'>
        <li className='page-item'>
          <span className='page-link arrow' onClick={handlePrevious}>
            <span>
              <FaAngleLeft size={24} color='black' />
            </span>
          </span>
        </li>
        <li className={filters.pageNumber ? 'active page-item' : 'page-item'}>
          <span className='page-link '>{filters.pageNumber}</span>
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
          <span className='page-link' onClick={handleNext}>
            <span>
              <FaAngleRight size={24} color='black' />
            </span>
          </span>
        </li>
      </ul>
      <p className='mt10 pagination_page_count text-center'>
        {(filters.pageNumber - 1) * 9 + 1}-
        {filters.pageNumber * 9 > totalContests
          ? totalContests
          : filters.pageNumber * 9}{' '}
        of {totalContests}+ contests available
      </p>
    </div>
  )
}

export default PaginationTwo
