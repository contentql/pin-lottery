const IndividualContestSkeletone = () => {
  return (
    <>
      <section className='pb-120 mt-minus-300 main-page'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-12'>
              <div className='contest-cart'>
                <div className='card-skeleton is-loading-skeleton'>
                  <div className='contest-cart__left'>
                    <div className='image-skeleton'></div>
                  </div>
                  <div className='contest-cart__right'>
                    <div className='content-skeleton'>
                      <h2 className='h2-skeleton'></h2>
                      <p className='h4-skeleton'></p>
                      <p className='h6-skeleton'></p>
                      <p className='p-skeleton'></p>
                      <p className='p-skeleton'></p>
                      <div className='button-skeleton-group'>
                        <button className='button-skeleton'></button>
                        <button className='button-skeleton'></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default IndividualContestSkeletone
