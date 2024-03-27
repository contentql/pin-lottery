const IndividualContestSkeletone = () => {
  return (
    <>
      <header>
        <h1>Pure CSS Skeleton Loading Animation With Shimmer</h1>
        <p>
          Improve perceived performance with a fancy skeleton loading animation.{' '}
          <a href='https://markus.oberlehner.net/blog/skeleton-loading-animation-with-vue/'>
            Read more about how to use this technique with Vue.js.
          </a>
        </p>
      </header>

      <main>
        <ul className='o-vertical-spacing o-vertical-spacing--l'>
          <li className='blog-post o-media'>
            <div className='o-media__figure'>
              <span
                className='skeleton-box'
                style={{ width: '100px', height: '80px' }}></span>
            </div>
            <div className='o-media__body'>
              <div className='o-vertical-spacing'>
                <h3 className='blog-post__headline'>
                  <span
                    className='skeleton-box'
                    style={{ width: '55%' }}></span>
                </h3>
                <p>
                  <span
                    className='skeleton-box'
                    style={{ width: '80%' }}></span>
                  <span
                    className='skeleton-box'
                    style={{ width: '90%' }}></span>
                  <span
                    className='skeleton-box'
                    style={{ width: '83%' }}></span>
                  <span
                    className='skeleton-box'
                    style={{ width: '80%' }}></span>
                </p>
                <div className='blog-post__meta'>
                  <span
                    className='skeleton-box'
                    style={{ width: '70%' }}></span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </>
  )
}

export default IndividualContestSkeletone
