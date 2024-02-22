import Image from "next/image";
import referral_1 from "/public/images/icon/referral/1.png";
import referral_2 from "/public/images/icon/referral/2.png";

const Overview = () => {
  return (
    <div className="referral-overview mt-30">
      <div className="row justify-content-center mb-none-30">
        <div className="col-lg-5 col-sm-6 mb-30">
          <div className="referral-crad">
            <div className="referral-crad__icon">
              <Image src={referral_1} alt="referral 1" />
            </div>
            <div className="referral-crad__content">
              <h3 className="number">$2956.00</h3>
              <span>Earned Referral</span>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-sm-6 mb-30">
          <div className="referral-crad">
            <div className="referral-crad__icon">
              <Image src={referral_2} alt="referral 2" />
            </div>
            <div className="referral-crad__content">
              <h3 className="number">$208.00</h3>
              <span>Last Month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
