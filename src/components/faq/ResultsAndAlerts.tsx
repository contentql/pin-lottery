const ResultsAndAlerts = () => {
  return (
    <div className="accordion cmn-accordion" id="faqAcc-four">
      <div className="card">
        <div className="card-header" id="h-7">
          <button
            className="btn btn-link btn-block text-left"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse7"
            aria-expanded="true"
            aria-controls="collapse7"
          >
            How do I deposit funds into my Rifa Lottos account?
          </button>
        </div>
        <div
          id="collapse7"
          className="collapse show"
          aria-labelledby="h-7"
          data-bs-parent="#faqAcc-four"
        >
          <div className="card-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="h-8">
          <button
            className="btn btn-link btn-block text-left collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse8"
            aria-expanded="false"
            aria-controls="collapse8"
          >
            What will the payment reflect as on my credit card statement?
          </button>
        </div>
        <div
          id="collapse8"
          className="collapse"
          aria-labelledby="h-8"
          data-bs-parent="#faqAcc-four"
        >
          <div className="card-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="h-9">
          <button
            className="btn btn-link btn-block text-left collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse9"
            aria-expanded="false"
            aria-controls="collapse9"
          >
            Why am I unable to deposit funds via credit card on your website?
          </button>
        </div>
        <div
          id="collapse9"
          className="collapse"
          aria-labelledby="h-9"
          data-bs-parent="#faqAcc-four"
        >
          <div className="card-body">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
              dignissimos consectetur aspernatur expedita aut reiciendis magni
              tempore ullam libero, voluptate nam accusamus est a debitis,
              obcaecati beatae possimus veniam distinctio?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsAndAlerts;
