const ContestSkeletons = () => {
  return (
    <div className='contest-card'>
      <div className='movie--isloading'>
        <div className='loading-image'></div>
        <div className='loading-content'>
          <div className='loading-text-container'>
            <div className='loading-main-text'></div>
            <div className='loading-sub-text'></div>
          </div>
          <div className='loading-btn'></div>
        </div>
        <div className='border-bottom-skeleton'></div>
        <div className='loading-content'>
          <div className='loading-main-text'></div>
        </div>
      </div>
    </div>
  )
}

export default ContestSkeletons
