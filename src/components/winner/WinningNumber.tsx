import Image from 'next/image'

import contest_1 from '/public/images/contest/1.png'
import contest_2 from '/public/images/contest/7.png'

const WinningNumber = () => {
  return (
    <section className='mt-minus-150'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='winner-details-wrapper bg_img'>
              <div className='left'>
                <Image src={contest_1} alt='contest 1' />
              </div>
              <div className='body'>
                <p className='contest-number'>Contest No: B2T</p>
                <p className='contest-date'>
                  <span>Draw took place on :</span> Saturday May 20, 2020
                </p>
                <div className='line'></div>
                <h4 className='title'>Latest bigest Winning Numbers:</h4>
                <ul className='numbers'>
                  <li>11</li>
                  <li>88</li>
                  <li>23</li>
                  <li>9</li>
                  <li>19</li>
                  <li>26</li>
                  <li>87</li>
                </ul>
                <div className='btn-grp'>
                  <a href='#0' className='btn-border'>
                    Alerts
                  </a>
                  <a href='#0' className='btn-border'>
                    How to Claim
                  </a>
                </div>
              </div>
              <div className='right'>
                <Image src={contest_2} alt='contest 2' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WinningNumber
