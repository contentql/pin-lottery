const AboutUs = () => {
  return (
    <section className="mt-minus-150">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="about-wrapper pt-120">
              <div className="about-wrapper__header">
                <div className="about-wrapper__title-top">
                  A few words about us
                </div>
                <h2 className="about-wrapper__title">
                  We dream big so you can win big
                </h2>
              </div>
              <div className="about-wrapper__content">
                <p>
                  We&#39;re bold in our ambition: to be the world&#39;s biggest
                  and best online lottery platform. We&#39;re for every player
                  that&#39;s ever dreamed of hitting the jackpot, which is why
                  we bring you the biggest prizes from around the world and
                  offer you tons of ways to play. Our aim is to offer
                  unprecedented variety as well as quality.
                </p>
                <p>
                  Our team of creative programmers, marketing experts, and
                  members of the global lottery community have worked together
                  to build the ultimate lottery site, and every win and happy
                  customer reminds us how lucky we are to be doing what we love.
                </p>
              </div>
            </div>
            <div className="row counter-wrapper style--two justify-content-center">
              <div className="col-lg-4 col-sm-6 text-center">
                <div className="counter-item style--two">
                  <div className="counter-item__content">
                    <span>23</span>
                    <p>Winners For Last Month</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 text-center">
                <div className="counter-item style--two">
                  <div className="counter-item__content">
                    <span>2837K</span>
                    <p>Tickets Sold</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 text-center">
                <div className="counter-item style--two">
                  <div className="counter-item__content">
                    <span>28387K</span>
                    <p>Payouts to Winners</p>
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

export default AboutUs;
