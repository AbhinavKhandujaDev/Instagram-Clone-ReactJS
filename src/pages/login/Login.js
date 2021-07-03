import React, { memo, Component } from "react";
import { withRouter } from "react-router-dom";
import { emailRegex } from "../../helper/validations";
import "./Onboarding.css";

class Login extends Component {
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
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 4));
        switch (err.code) {
          case "auth/user-not-found":
            this.setState({
              error:
                "The email you entered doesn't belong to an account. Please check your email and try again.",
            });
            break;
          case "auth/wrong-password":
            this.setState({
              error:
                "Sorry, your password was incorrect. Please double-check your password.",
            });
            break;
          default:
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
          className="sign-in d-flex-inline flex-column"
        >
          <div className="border-box">
            <div className="flex-center flex-column m-5">
              <img
                className="mb-5"
                width="175px"
                height="65px"
                src="./images/instagram-logo.png"
                alt=""
              />
              <input
                className="txt-field-default m-1"
                placeholder="Email"
                type="email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <input
                className="txt-field-default m-1"
                placeholder="Password"
                type="password"
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
                Log In
              </button>
              <div className="m-3" />
              <button
                type="button"
                className="position-relative btn-default mb-3"
              >
                <img
                  width="auto"
                  height="100%"
                  src="./images/facebook-icon.svg"
                  alt=""
                />{" "}
                Log in with Facebook
              </button>

              <div className="error-div">{this.state.error}</div>
            </div>
          </div>
          <div className="onboarding-switch border-box mt-2">
            <div className="m-3">
              Don't have an account?{" "}
              <span
                className="pointer switch-button"
                onClick={() => this.props.history.push("/signup")}
              >
                Sign up
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(memo(Login));
