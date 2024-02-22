import Image from "next/image";
import Link from "next/link";
import arrow from "/public/images/elements/arrow.png";
import winner_obj from "/public/images/elements/winner-obj.png";

const BuyTicket = () => {
  return (
    <section className="buy-ticket-section">
      <div className="winner-obj">
        <Image src={winner_obj} alt="winner obj" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-7 text-lg-start text-center">
            <div className="section-header">
              <span className="section-sub-title">Dream Big Play Small</span>
              <h2 className="section-title font-weight-bold">
                Will you be the next Winner?
              </h2>
              <p>
                Playing the lottery is something many of us do to bring a bit of
                excitement to our day-to-day routine.
              </p>
            </div>
            <div className="buy-btn-wrapper">
              <span>Don&#39;t miss out! Next draw</span>
              <Image src={arrow} alt="arrow" className="arrow" />
              <Link href="/contest" className="cmn-btn">
                buy ticket now!
              </Link>
            </div>
          </div>
        </div>
        <div className="row winner-stat-wrapper">
          <div className="col-lg-8 text-lg-start text-center">
            <h3 className="font-weight-normal winner-stat-wrapper__title">
              Let the Number Speak for Us
            </h3>
            <div className="row mb-none-30">
              <div className="col-sm-6 mb-30">
                <div className="counter-item style--three text-center">
                  <div className="counter-item__content">
                    <span>23</span>
                    <p>Last Month Winners</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 mb-30">
                <div className="counter-item style--three text-center">
                  <div className="counter-item__content">
                    <span>2837K</span>
                    <p>Tickets Sold</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyTicket;
