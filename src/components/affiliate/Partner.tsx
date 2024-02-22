import Image from "next/image";
import { affiliate_partner } from "../../data/affiliate";
import affiliate_bg from "/public/images/elements/affiliate-bg.jpg";

const Partner = () => {
  return (
    <section className="pt-120 pb-120 position-relative">
      <div className="bg-el">
        <Image src={affiliate_bg} alt="affiliate bg" />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-header text-center">
              <span className="section-sub-title">What you&#39;ll get as</span>
              <h2 className="section-title style--two"> Affiliate Partner</h2>
              <p>
                Earn Unlimited Commissions with rifa affiliate program. Our
                partner program can increase your income by receing percentage.
              </p>
            </div>
          </div>
        </div>
        <div className="row mb-none-30">
          {affiliate_partner.map(({ id, title, desc, icon }) => (
            <div key={id} className="col-xl-3 col-sm-6 mb-30">
              <div className="affiliate-card">
                <div className="affiliate-card__icon">
                  <Image src={icon} alt={title} />
                </div>
                <div className="affiliate-card__content">
                  <h3 className="affiliate-card__title">{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partner;
