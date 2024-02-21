const Banking = () => {
  return (
    <div className="accordion cmn-accordion" id="faqAcc-two">
      <div className="card">
        <div className="card-header" id="headingOne">
          <button
            className="btn btn-link btn-block text-left"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            How do I deposit funds into my Rifa Lottos account?
          </button>
        </div>
        <div
          id="collapseOne"
          className="collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#faqAcc-two"
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
        <div className="card-header" id="headingTwo">
          <button
            className="btn btn-link btn-block text-left collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            What will the payment reflect as on my credit card statement?
          </button>
        </div>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#faqAcc-two"
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
        <div className="card-header" id="headingThree">
          <button
            className="btn btn-link btn-block text-left collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Why am I unable to deposit funds via credit card on your website?
          </button>
        </div>
        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#faqAcc-two"
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
      <div className="card">
        <div className="card-header" id="headingFour">
          <button
            className="btn btn-link btn-block text-left collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
            Am I allowed to withdraw my deposit?
          </button>
        </div>
        <div
          id="collapseFour"
          className="collapse"
          aria-labelledby="headingFour"
          data-bs-parent="#faqAcc-two"
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
      <div className="card">
        <div className="card-header" id="headingFive">
          <button
            className="btn btn-link btn-block text-left collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFive"
            aria-expanded="false"
            aria-controls="collapseFive"
          >
            Which payment methods are accepted by Rifa Lottos?
          </button>
        </div>
        <div
          id="collapseFive"
          className="collapse"
          aria-labelledby="headingFive"
          data-bs-parent="#faqAcc-two"
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

export default Banking;
