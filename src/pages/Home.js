import { memo, Component } from "react";
import { withRouter } from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentMount() {
    if (window.firebase.auth().currentUser != null) {
      this.props.history.push("/login");
    }
    return !window.firebase.auth().currentUser != null;
  }
  render() {
    return <div className="w-100 h-100 bg-primary"></div>;
  }
}
export default withRouter(memo(Home));
