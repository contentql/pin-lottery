import Image from "next/image";
import payment from "/public/images/elements/payment.png";

const Prices = () => {
  return (
    <div className="col-lg-4 mt-lg-0 mt-4">
      <div className="checkout-wrapper">
        <div className="checkout-wrapper__header">
          <h3>Your tickets:</h3>
        </div>
        <div className="checkout-wrapper__body">
          <ul className="price">
            <li>
              <div className="left">
                <h4 className="caption">Ticket Price</h4>
                <span>(8 tickets X $ 4.99)</span>
              </div>
              <div className="right">
                <span className="price">$39.92</span>
              </div>
            </li>
            <li>
              <div className="left">
                <h4 className="caption">Total</h4>
              </div>
              <div className="right">
                <span className="price">$39.92</span>
              </div>
            </li>
          </ul>
          <div className="checkout-wrapper__btn">
            <button type="submit" className="cmn-btn">
              buy tickets
            </button>
          </div>
        </div>
      </div>
      <div className="mt-30">
        <Image src={payment} alt="payment" />
      </div>
    </div>
  );
};

export default Prices;
