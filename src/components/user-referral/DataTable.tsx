import { useState } from "react";
import DatePicker from "react-datepicker";
import { BsChevronDown } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";

//css
import "react-datepicker/dist/react-datepicker.css";

const DataTable = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <div className="referral-transaction">
      <div className="all-transaction__header">
        <h3 className="title">Your Partners:</h3>
        <div className="date-range">
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            placeholderText="min - max date"
          />
          <i>
            <FaRegCalendarAlt />
          </i>
        </div>
      </div>

      <div className="table-responsive-lg">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Level</th>
              <th>USERNAME</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="date">
                  <span>16</span>
                  <span className="month">APR</span>
                </div>
              </td>
              <td>Level01</td>
              <td>Maxine24</td>
              <td>Maxine24@gmail.com</td>
            </tr>
            <tr>
              <td>
                <div className="date">
                  <span>16</span>
                  <span className="month">APR</span>
                </div>
              </td>
              <td>Level01</td>
              <td>Maxine24</td>
              <td>Maxine24@gmail.com</td>
            </tr>
            <tr>
              <td>
                <div className="date">
                  <span>16</span>
                  <span className="month">APR</span>
                </div>
              </td>
              <td>Level01</td>
              <td>Maxine24</td>
              <td>Maxine24@gmail.com</td>
            </tr>
            <tr>
              <td>
                <div className="date">
                  <span>16</span>
                  <span className="month">APR</span>
                </div>
              </td>
              <td>Level01</td>
              <td>Maxine24</td>
              <td>Maxine24@gmail.com</td>
            </tr>
            <tr>
              <td>
                <div className="date">
                  <span>16</span>
                  <span className="month">APR</span>
                </div>
              </td>
              <td>Level01</td>
              <td>Maxine24</td>
              <td>Maxine24@gmail.com</td>
            </tr>
            <tr>
              <td>
                <div className="date">
                  <span>16</span>
                  <span className="month">APR</span>
                </div>
              </td>
              <td>Level01</td>
              <td>Maxine24</td>
              <td>Maxine24@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="load-more">
        <button
          type="button"
          className="d-flex align-items-center justify-content-lg-center gap-1"
        >
          Show More Lotteries <BsChevronDown />
        </button>
      </div>
    </div>
  );
};

export default DataTable;
