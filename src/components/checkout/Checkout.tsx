const Checkout = () => {
  return (
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
    </div>
  );
};

export default Checkout;
