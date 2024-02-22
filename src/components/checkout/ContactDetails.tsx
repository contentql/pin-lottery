const ContactDetails = () => {
  return (
    <>
      <div className="top">
        <div className="left">
          <h3 className="mb-2">Already a Rifa Member?</h3>
          <p>Sign in to buy lottery more easier!</p>
        </div>
        <div className="right">
          <a href="#0" data-bs-toggle="modal" data-bs-target="#loginModal">
            <i className="las la-user"></i>
            <span>Sign in</span>
          </a>
        </div>
      </div>
      <div className="personal-details mt-30">
        <h3 className="title">Share your Contact Details </h3>
        <form className="personal-details-form">
          <div className="form-row">
            <div className="form-group col-lg-6">
              <input type="text" placeholder="Full Name" required />
            </div>
            <div className="form-group col-lg-6">
              <input type="email" placeholder="Enter your Mail" required />
            </div>
            <div className="form-group col-lg-6">
              <input
                type="text"
                placeholder="Enter your Phone Number"
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <button type="submit" className="cmn-btn justify-content-center">
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactDetails;
