import { Component, memo } from "react";

class Splash extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // if (window.firebase.auth().currentUser != null) {
    //   this.props.history.push("/home");
    // } else if (
    //   window.location.pathname === "/" ||
    //   window.location.pathname === "/login"
    // ) {
    //   this.props.history.push("/login");
    // } else if (window.location.pathname === "/signup") {
    //   this.props.history.push("/signup");
    // }
  }
  render() {
    return (
      <div
        style={{ background: "var(--default-bg)" }}
        className="w-100 h-100 flex-center"
      >
        <img
          width="100px"
          height="100px"
          src="./images/instagram-icon.svg"
          alt=""
        />
      </div>
    );
  }
}
export default memo(Splash);
