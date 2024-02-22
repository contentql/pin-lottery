import Image from "next/image";
import transaction_1 from "/public/images/icon/transaction/1.png";
import transaction_2 from "/public/images/icon/transaction/2.png";

const Balance = () => {
  return (
    <div className="transaction-balance-wrapper">
      <div className="left">
        <div className="transaction-balance">
          <h4 className="balance">$2956.00</h4>
          <span>Available Balance</span>
        </div>
      </div>
      <div className="right">
        <a href="#0" className="transaction-action-btn">
          <Image src={transaction_1} alt="transaction 1" />

          <span>Deposit</span>
        </a>
        <a href="#0" className="transaction-action-btn ms-4">
          <Image src={transaction_2} alt="transaction 2" />

          <span>Withdraw</span>
        </a>
      </div>
    </div>
  );
};

export default Balance;
