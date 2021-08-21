import React, { memo, Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import "./Home.css";
import Avatar from "../../components/avatar/Avatar";
import Profile from "../profile/Profile";
import Feeds from "../feeds/Feeds";
import Account from "../account/Account";

const selectedImages = {
  homeImage: "/images/home-selected-icon.svg",
  msgImage: "/images/message-selected-icon.svg",
  notifImage: "/images/like-selected-black-icon.svg",
};
const unselectedImages = {
  homeImage: "/images/home-icon.svg",
  msgImage: "/images/message-icon.svg",
  notifImage: "/images/like-icon.svg",
};

const NavBar = memo((props) => {
  const { icons, optionTapped } = props;
  return (
    <nav className="w-100 flex-center justify-content-between">
      <div className="insta-font h3">Instagram</div>
      {/* <div className="search-field txt-field-default flex-center">
        <div className="input-conntainer flex-grow-1">
          <img src="./images/search-icon.svg" alt="" />{" "}
          <input type="text" placeholder="Search" />
        </div>
        <img className="clear" src="./images/cancel-icon.svg" alt="" />
      </div> */}
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
    this.lastScrollTop = React.createRef(0);
  }
  componentDidMount() {
    this.setState({
      icons: { ...this.state.icons, homeImage: selectedImages.homeImage },
    });
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
        let username = window.fbUser.username;
        this.props.history.push(`/${username}`);
        break;
      default:
        break;
    }
    this.setState({ icons: obj });
  };
  render() {
    return (
      <div className="Home w-100 flex-center flex-column justify-content-start">
        <NavBar icons={this.state.icons} optionTapped={this.navlinkTapped} />
        <div className="home-content w-100 flex-grow-1 position-relative">
          <Switch>
            <Route exact path="/" key={0}>
              <Feeds />
            </Route>
            <Route exact path="/messages" key={1}>
              <div>Messages</div>
            </Route>
            <Route exact path="/account/:type" key={2}>
              <Account />
            </Route>
            <Route path="/:username" key={3}>
              <Profile />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(memo(Home));
