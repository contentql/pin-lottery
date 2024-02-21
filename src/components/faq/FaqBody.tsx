import AboutRifa from "./AboutRifa";
import Banking from "./Banking";
import ResultsAndAlerts from "./ResultsAndAlerts";
import Tickets from "./Tickets";
import Winning from "./Winning";

const FaqBody = () => {
  return (
    <section className="pb-120 mt-minus-150">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="faq-top-wrapper pt-120">
              <div className="section-header text-center">
                <span className="section-sub-title">You Have Questions</span>
                <h2 className="section-title">WE HAVE ANSWERS</h2>
                <p>
                  Do not hesitate to send us an email if you can&#39;t find what
                  you&#39;re looking for.
                </p>
              </div>
              <ul
                className="nav nav-tabs cmn-tabs justify-content-center"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="ticket-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#ticket"
                    role="tab"
                    aria-controls="ticket"
                    aria-selected="false"
                  >
                    rifa tickets
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="banking-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#banking"
                    role="tab"
                    aria-controls="banking"
                    aria-selected="true"
                  >
                    banking
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="winning-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#winning"
                    role="tab"
                    aria-controls="winning"
                    aria-selected="false"
                  >
                    winning
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="result-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#result"
                    role="tab"
                    aria-controls="result"
                    aria-selected="false"
                  >
                    results & alerts
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="about-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#about"
                    role="tab"
                    aria-controls="about"
                    aria-selected="false"
                  >
                    about rifa
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="faq-body-wrapper">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade"
                  id="ticket"
                  role="tabpanel"
                  aria-labelledby="ticket-tab"
                >
                  {/* Tickets here */}
                  <Tickets />
                </div>
                <div
                  className="tab-pane fade show active"
                  id="banking"
                  role="tabpanel"
                  aria-labelledby="banking-tab"
                >
                  {/* Banking here */}
                  <Banking />
                </div>
                <div
                  className="tab-pane fade"
                  id="winning"
                  role="tabpanel"
                  aria-labelledby="winning-tab"
                >
                  {/* Winning here */}
                  <Winning />
                </div>
                <div
                  className="tab-pane fade"
                  id="result"
                  role="tabpanel"
                  aria-labelledby="result-tab"
                >
                  {/* Results And Alerts here */}
                  <ResultsAndAlerts />
                </div>
                <div
                  className="tab-pane fade"
                  id="about"
                  role="tabpanel"
                  aria-labelledby="about-tab"
                >
                  {/* About Rifa here */}
                  <AboutRifa />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqBody;
