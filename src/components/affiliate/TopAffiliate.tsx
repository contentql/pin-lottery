import Image from "next/image";
import { top_affiliate } from "../../data/affiliate";

const TopAffiliate = () => {
  return (
    <section className="pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-header text-center">
              <span className="section-sub-title">Top-Earning Affiliate</span>
              <h2 className="section-title style--two">
                Ranking for Last Month !
              </h2>
              <p>Become a Rifa affiliate and start earning each month</p>
            </div>
          </div>
        </div>
        <div className="row mb-none-30 justify-content-center">
          {top_affiliate.map(({ id, name, earn, img }) => (
            <div key={id} className="col-lg-4 col-md-6 mb-30">
              <div className="top-affiliate-card">
                <div className="top-affiliate-card__thumb">
                  <div className="inner">
                    <Image src={img} alt={name} />
                  </div>
                </div>
                <div className="top-affiliate-card__content">
                  <h3 className="name">{name}</h3>
                  <span className="amount">${earn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopAffiliate;
