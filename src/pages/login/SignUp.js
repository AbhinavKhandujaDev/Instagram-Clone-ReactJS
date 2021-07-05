import React, { memo, Component } from "react";
import { withRouter } from "react-router-dom";
import { emailRegex } from "../../helper/validations";
import "./Onboarding.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullname: "",
      username: "",
      password: "",
      error: null,
      loading: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    window.dbRef
      .ref(`usernames/${this.state.username}`)
      .get()
      .then((snapshot) => {
        if (snapshot.val() === 1) {
          this.setState({ loading: false, error: "Username already exists" });
          return;
        } else {
          window.dbRef.ref("usernames").update({ [this.state.username]: 1 });
          window.firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.state.email,
              this.state.password
            )
            .then((result) => {
              let values = {
                [result.user.uid]: {
                  name: this.state.fullname,
                  username: this.state.username,
                },
              };
              window.usersRef.update(values, () =>
                this.props.history.push("/home")
              );
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
            .finally(() => this && this.setState({ loading: false }));
        }
      });
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
            <div className="flex-center flex-column m-3">
              <div className="m-3">
                <div className="instagram-logo-text insta-font mb-3">
                  Instagram
                </div>
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
              <input
                className="txt-field-default m-1"
                placeholder="Full Name"
                onChange={(e) => this.setState({ fullname: e.target.value })}
              />
              <input
                className="txt-field-default m-1"
                placeholder="Username"
                onChange={(e) => this.setState({ username: e.target.value })}
              />
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
            </div>
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
