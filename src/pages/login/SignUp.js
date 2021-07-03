import React, { memo, Component } from "react";
import { withRouter } from "react-router-dom";
import { emailRegex } from "../../helper/validations";
import "./Onboarding.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
      loading: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    window.firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        this.setState({ loading: false });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
            this.setState({
              error: `Another account is using ${this.state.email}.`,
            });
            break;
          default:
            this.setState({ error: err.message });
            break;
        }
      })
      .finally(() => this.setState({ loading: false }));
  };
  render() {
    return (
      <div className="Onboarding Login flex-center w-100 h-100">
        <img className="m-3" src="./images/mobile-frame-image.png" alt="" />
        <form
          onSubmit={this.onSubmit}
          className="sign-up d-flex-inline flex-column"
        >
          <div className="border-box">
            <div className="m-3 mt-5">
              <img
                width="175px"
                height="65px"
                src="./images/instagram-logo.png"
                alt=""
              />
              <div className="title-text">
                Sign up to see phtos and videos from your friends.
              </div>
              <button
                type="button"
                className="position-relative btn-default mt-3 mb-3"
              >
                <img
                  width="auto"
                  height="100%"
                  src="./images/facebook-icon.svg"
                  alt=""
                />{" "}
                Log in with Facebook
              </button>
            </div>
            <input
              className="txt-field-default m-1"
              placeholder="Email"
              type="email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <input className="txt-field-default m-1" placeholder="Full Name" />
            <input className="txt-field-default m-1" placeholder="Username" />
            <input
              className="txt-field-default m-1"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />

            <button
              disabled={
                !emailRegex.test(this.state.email) ||
                this.state.password?.length < 6
              }
              className={`btn-default m-3 ${
                this.state.loading ? "loader" : ""
              }`}
            >
              Sign Up
            </button>
            <div className="m-3" />
            <div className="error-div m-3">{this.state.error}</div>
          </div>
          <div className="onboarding-switch border-box mt-2">
            <div className="m-3">
              Have an account?{" "}
              <span
                className="pointer switch-button"
                onClick={() => this.props.history.push("/login")}
              >
                Log in
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(memo(SignUp));
