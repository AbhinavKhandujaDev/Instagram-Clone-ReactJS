import { memo, Component } from "react";
import "./Profile.css";
import Header from "./header/Header";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import {
  getPosts,
  fetchUserData,
  getIdByUsername,
  getCollectionCount,
} from "../../helper/firebase.js";
import ImageView from "../../components/imageView/ImageView";
import { ReactComponent as PostIcon } from "../../assets/posts-icon.svg";
import { ReactComponent as SavedPostIcon } from "../../assets/saved-posts-icon.svg";
import { ReactComponent as SelfPostIcon } from "../../assets/self-posts-icon.svg";

const selectedTabColor = "#0094f6";
const unselectedTabColor = "#8e8e8e";

const InvalidUser = () => {
  return (
    <div className="Invalid-User m-5">
      <div className="h1">Sorry, this page isn't available.</div>
      <div className="p-2">
        The link you followed may be broken, or the page may have been removed.
        <span
          className="pointer text-primary"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          {" "}
          Go back.
        </span>
      </div>
    </div>
  );
};
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSize: window.innerWidth < 736 ? 77 : 168,
      selectedTabIndex: 0,
      userData: {},
      username: null,
      posts: [],
    };
  }

  async fetchProfileData() {
    let path = this.props.location.pathname.split("/")[1];
    let id = await getIdByUsername(path);
    if (!id.val()) {
      this.setState({ userData: null });
      return;
    }
    let userData = await fetchUserData(id.val());
    let followers = await getCollectionCount(id.val(), window.userFollowerRef);
    let following = await getCollectionCount(
      id.val(),
      window.userFollowingRef,
      true
    );
    let postsCount = await getCollectionCount(id.val(), window.userPostsRef);
    let posts = await getPosts(id.val());
    let obj = {
      ...userData.val(),
      followers: followers,
      following: following,
      id: id.val(),
      postsCount: postsCount,
    };
    this.setState({ userData: { ...obj }, posts: posts.val() });
  }

  componentDidMount() {
    this.fetchProfileData();
    window.onresize = () =>
      this.setState({ avatarSize: window.innerWidth < 736 ? 77 : 168 });
  }

  shouldComponentUpdate(next, nextState) {
    let shouldUpdate =
      JSON.stringify(this.state) !== JSON.stringify(nextState) ||
      this.state.userData.username !== window.location.pathname.split("/")[1];
    return shouldUpdate;
  }

  getSelectedColor(index) {
    return this.state.selectedTabIndex === index
      ? selectedTabColor
      : unselectedTabColor;
  }

  loadViews() {
    if (this.state.userData === null) {
      return <InvalidUser props={this.props} />;
    } else if (this.state.userData?.username) {
      return (
        <div className="profile-content-div">
          <Header
            avatarSize={this.state.avatarSize}
            userData={this.state.userData}
          />
          <div className="post-tabs-div pt-3 pb-3 flex-center justify-content-between">
            <Link
              className="flex-grow-1 pointer"
              to={`/${this.state.userData?.username}`}
            >
              <PostIcon
                fill={this.getSelectedColor(0)}
                onClick={() => this.setState({ selectedTabIndex: 0 })}
              />
            </Link>
            <Link
              className="flex-grow-1 pointer"
              to={`/${this.state.userData?.username}/saved`}
            >
              <SavedPostIcon
                fill={this.getSelectedColor(1)}
                onClick={() => this.setState({ selectedTabIndex: 1 })}
              />
            </Link>

            <Link className="flex-grow-1 pointer" to="">
              <SelfPostIcon
                className="flex-grow-1 pointer"
                fill={this.getSelectedColor(2)}
                onClick={() => this.setState({ selectedTabIndex: 2 })}
              />
            </Link>
          </div>
          <Switch>
            <Route exact path={`/${this.state.userData?.username}`}>
              <div className="gallery-grid w-100">
                <ImageView src="https://source.unsplash.com/random/200x200?sig=1" />
                <ImageView src="https://source.unsplash.com/random/200x200?sig=2" />
                <ImageView src="https://source.unsplash.com/random/200x200?sig=3" />
                <ImageView src="https://source.unsplash.com/random/200x200?sig=4" />
                <ImageView src="https://source.unsplash.com/random/200x200?sig=5" />
                <ImageView src="https://source.unsplash.com/random/200x200?sig=6" />
                <ImageView src="https://source.unsplash.com/random/200x200?sig=7" />
                <ImageView src="https://source.unsplash.com/random/200x200?sig=8" />
                <ImageView src="https://source.unsplash.com/random/200x200?sig=9" />
                <ImageView src="https://source.unsplash.com/random/200x200?sig=0" />
                <ImageView src="https://source.unsplash.com/random/200x200?sig=1" />
                <ImageView src="https://source.unsplash.com/random/200x200?sig=2" />
              </div>
            </Route>
            <Route exact path={`/${this.state.userData?.username}/saved`}>
              <div>hello</div>
            </Route>
          </Switch>
        </div>
      );
    }
    return (
      <div className="flex-center p-5">
        <img
          className="m-5"
          width={35}
          height={35}
          src="/images/spinner.gif"
          alt=""
        />
      </div>
    );
  }

  render() {
    return (
      <div className="Profile position-relative flex-center">
        {this.loadViews()}
      </div>
    );
  }
}
export default withRouter(memo(Profile));
