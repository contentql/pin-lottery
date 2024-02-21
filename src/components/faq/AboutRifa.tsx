const AboutRifa = () => {
  return (
    <div className="accordion cmn-accordion" id="faqAcc-five">
      <div className="card">
        <div className="card-header" id="h-10">
          <button
            className="btn btn-link btn-block text-left"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse10"
            aria-expanded="true"
            aria-controls="collapse10"
          >
            How do I deposit funds into my Rifa Lottos account?
          </button>
        </div>
        <div
          id="collapse10"
          className="collapse show"
          aria-labelledby="h-10"
          data-bs-parent="#faqAcc-five"
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
        <div className="card-header" id="h-11">
          <button
            className="btn btn-link btn-block text-left collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse11"
            aria-expanded="false"
            aria-controls="collapse11"
          >
            What will the payment reflect as on my credit card statement?
          </button>
        </div>
        <div
          id="collapse11"
          className="collapse"
          aria-labelledby="h-11"
          data-bs-parent="#faqAcc-five"
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
        <div className="card-header" id="h-12">
          <button
            className="btn btn-link btn-block text-left collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse12"
            aria-expanded="false"
            aria-controls="collapse12"
          >
            Why am I unable to deposit funds via credit card on your website?
          </button>
        </div>
        <div
          id="collapse12"
          className="collapse"
          aria-labelledby="h-12"
          data-bs-parent="#faqAcc-five"
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

export default AboutRifa;
