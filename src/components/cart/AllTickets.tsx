import Link from "next/link";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const AllTickets = ({ removeTicket, allTicket }) => {
  return (
    <div className="col-lg-7">
      <div className="ticket-wrapper">
        <div className="ticket-wrapper__header">
          <h3>Your tickets:</h3>
          <button type="button">clear all</button>
        </div>
        <div className="ticket-wrapper__body">
          {allTicket.map((itm) => (
            <div key={itm.id} className="single-row">
              <ul className="numbers">
                {itm.ticket.map((single, i) => (
                  <li key={i}>{single}</li>
                ))}
              </ul>
              <div className="action-btns">
                <Link href="/lottery-details" className="edit-btn">
                  <FaPencilAlt className="fs-5" />
                </Link>
                <button
                  type="button"
                  className="del-btn"
                  onClick={() => removeTicket(itm.id)}
                >
                  <FaTrashAlt className="fs-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTickets;
