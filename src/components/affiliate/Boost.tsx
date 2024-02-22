import Image from "next/image";
import Link from "next/link";
import affiliate_obj from "/public/images/elements/affiliate-obj.png";

const Boost = () => {
  return (
    <section className="mt-minus-150">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="affiliate-single-wrapper pt-120 pb-120">
              <div className="affiliate-single-wrapper__obj">
                <Image src={affiliate_obj} alt="affiliate obj" />
              </div>
              <div className="section-header mb-0">
                <span className="section-sub-title">Boost Your Earnings</span>
                <h2 className="section-title font-weight-bold">
                  Become an affiliate
                </h2>
                <p>Follow these 3 easy steps! </p>
                <Link
                  href="/affiliate"
                  className="cmn-btn text-capitalize mt-4"
                >
                  join us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Boost;
