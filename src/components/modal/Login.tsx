import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa";
import Social from "../social/Social";

const Login = () => {
  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body">
            <div className="account-form-area">
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="las la-times"></i>
              </button>
              <h3 className="title">Welcome Back</h3>
              <div className="account-form-wrapper">
                <form>
                  <div className="form-group">
                    <label>
                      Email <sup>*</sup>
                    </label>
                    <input
                      type="email"
                      name="login_name"
                      id="login_name"
                      placeholder="Enter your Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      password <sup>*</sup>
                    </label>
                    <input
                      type="password"
                      name="login_pass"
                      id="login_pass"
                      placeholder="password"
                      required
                    />
                  </div>
                  <div className="d-flex flex-wrap justify-content-between mt-2">
                    <div className="custom-checkbox">
                      <input
                        type="checkbox"
                        name="id-1"
                        id="id-1"
                        defaultChecked
                        required
                      />
                      <label htmlFor="id-1">Remember Password</label>
                      <span className="checkbox"></span>
                    </div>
                    <a href="#0" className="link">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="form-group text-center mt-5">
                    <button className="cmn-btn">log in</button>
                  </div>
                </form>
                <p className="text-center mt-4">
                  Don&#39;t have an account?{" "}
                  <a
                    href="#0"
                    data-bs-toggle="modal"
                    data-bs-target="#signupModal"
                  >
                    {" "}
                    Sign Up Now
                  </a>
                </p>
                <div className="divider">
                  <span>or</span>
                </div>

                {/* social links here */}
                <Social
                  items={[
                    [FaFacebookF, "/"],
                    [FaTwitter, "/"],
                    [FaGooglePlusG, "/"],
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
