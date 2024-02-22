import Checkout from "./Checkout";
import ContactDetails from "./ContactDetails";
import Payment from "./Payment";

const Details = () => {
  return (
    <section className="pb-120 mt-minus-300">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="checkout-area">
              <div className="row">
                <div className="col-lg-7">
                  <div className="checkout-form-area">
                    {/* Contact Details section here */}
                    <ContactDetails />

                    {/* Payment section here */}
                    <Payment />
                  </div>
                </div>

                <div className="col-lg-5 mt-lg-0 mt-4">
                  <div className="checkout-wrapper">
                    <div className="checkout-wrapper__header">
                      <h3>Checkout</h3>
                    </div>

                    {/* Checkout section here */}
                    <Checkout />
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

export default Details;
