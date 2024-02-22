const BuyLotteryTicketCard = () => {
  return (
    <div className="buy-lottery-ticket">
      <div className="left">
        <div className="sub-total-price">
          <p>Ticket Price (3 tickets X $ 4.99)</p>
          <span>$14.97</span>
        </div>
        <div className="total-price">
          <p>Ticket Price (3 tickets X $ 4.99)</p>
          <span>$14.97</span>
        </div>
      </div>
      <div className="right">
        <a href="#0" className="cmn-btn">
          buy tickets
        </a>
      </div>
    </div>
  );
};

export default BuyLotteryTicketCard;
