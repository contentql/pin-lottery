const Tickets = () => {
  return (
    <div className="accordion cmn-accordion" id="faqAcc-one">
      <div className="card">
        <div className="card-header" id="h-1">
          <button
            className="btn btn-link btn-block text-left"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse1"
            aria-expanded="true"
            aria-controls="collapse1"
          >
            How do I deposit funds into my Rifa Lottos account?
          </button>
        </div>
        <div
          id="collapse1"
          className="collapse show"
          aria-labelledby="h-1"
          data-bs-parent="#faqAcc-one"
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
        <div className="card-header" id="h-2">
          <button
            className="btn btn-link btn-block text-left collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse2"
            aria-expanded="false"
            aria-controls="collapse2"
          >
            What will the payment reflect as on my credit card statement?
          </button>
        </div>
        <div
          id="collapse2"
          className="collapse"
          aria-labelledby="h-2"
          data-bs-parent="#faqAcc-one"
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
        <div className="card-header" id="h-3">
          <button
            className="btn btn-link btn-block text-left collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse3"
            aria-expanded="false"
            aria-controls="collapse3"
          >
            Why am I unable to deposit funds via credit card on your website?
          </button>
        </div>
        <div
          id="collapse3"
          className="collapse"
          aria-labelledby="h-3"
          data-bs-parent="#faqAcc-one"
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

export default Tickets;
