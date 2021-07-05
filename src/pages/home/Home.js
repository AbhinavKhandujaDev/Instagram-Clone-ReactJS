import { memo, Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import Avatar from "../../components/avatar/Avatar";
import Profile from "../profile/Profile";
import "./Home.css";

const selectedImages = {
  homeImage: "./images/home-selected-icon.svg",
  msgImage: "./images/message-selected-icon.svg",
  notifImage: "./images/like-selected-black-icon.svg",
};
const unselectedImages = {
  homeImage: "./images/home-icon.svg",
  msgImage: "./images/message-icon.svg",
  notifImage: "./images/like-icon.svg",
};

const NavBar = memo((props) => {
  const { icons, optionTapped } = props;
  return (
    <nav className="w-100 flex-center justify-content-between">
      <div className="insta-font h3">Instagram</div>
      <div className="search-field txt-field-default flex-center">
        <div className="input-conntainer flex-grow-1">
          <img src="./images/search-icon.svg" alt="" />{" "}
          <input type="text" placeholder="Search" />
        </div>
        <img className="clear" src="./images/cancel-icon.svg" alt="" />
      </div>
      <div className="nav-links flex-center">
        <img
          className="m-3 pointer"
          src={icons.homeImage}
          alt=""
          onClick={() => optionTapped && optionTapped("home")}
        />
        <img
          className="m-3 pointer"
          src={icons.msgImage}
          alt=""
          onClick={() => optionTapped && optionTapped("messages")}
        />
        <img
          className="m-3 pointer"
          src={icons.notifImage}
          alt=""
          onClick={() => optionTapped && optionTapped("notification")}
        />
        <Avatar
          strokeColor="black"
          radius={30}
          onClick={() => optionTapped && optionTapped("profile")}
        />
      </div>
    </nav>
  );
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: {
        homeImage: unselectedImages.homeImage,
        msgImage: unselectedImages.msgImage,
        notifImage: unselectedImages.notifImage,
      },
    };
  }
  componentDidMount() {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/home"
    ) {
      this.setState({
        icons: { ...this.state.icons, homeImage: selectedImages.homeImage },
      });
    }
  }
  shouldComponentMount() {
    if (window.firebase.auth().currentUser != null) {
      this.props.history.push("/login");
    }
    return !window.firebase.auth().currentUser != null;
  }
  navlinkTapped = (path) => {
    let obj = { ...unselectedImages };
    switch (path) {
      case "home":
        obj.homeImage = selectedImages.homeImage;
        this.props.history.push("/");
        break;
      case "messages":
        obj.msgImage = selectedImages.msgImage;
        this.props.history.push("/messages");
        break;
      case "notification":
        obj.notifImage = selectedImages.notifImage;
        break;
      case "profile":
        this.props.history.push("/profile");
        break;
      default:
        break;
    }
    this.setState({ icons: obj });
  };
  render() {
    return (
      <div className="Home w-100 h-100 flex-center flex-column justify-content-start">
        <NavBar icons={this.state.icons} optionTapped={this.navlinkTapped} />
        <div className="hoem-content w-100 flex-grow-1 position-relative">
          <Switch>
            <Route exact path="/"></Route>
            <Route exact path="/messages"></Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}
export default withRouter(memo(Home));
