import Image from "next/image";
import { how_it_work } from "../../data/affiliate";

const Getting = () => {
  return (
    <section className=" pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-header text-center">
              <span className="section-sub-title">
                Getting started? It’s simple
              </span>
              <h2 className="section-title style--two">How it works</h2>
              <p>
                The affiliate program is our special feature for
                Customers.Invite users and earn 40% commission
              </p>
            </div>
          </div>
        </div>
        <div className="row mb-none-30 justify-content-center">
          {how_it_work.map(({ title, desc, icon, id }) => (
            <div key={id} className="col-lg-4 col-sm-6 mb-30">
              <div className="work-card text-center">
                <div className="work-card__icon">
                  <div className="inner">
                    <Image src={icon} alt={title} />
                  </div>
                </div>
                <div className="work-card__content">
                  <h3 className="work-card__title">{title}</h3>
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

export default Getting;
