import React, { memo, Component, useCallback } from "react";
import "./Profile.css";
import Header from "./header/Header";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import {
  getUserPosts,
  fetchUserData,
  getIdByUsername,
  getCollectionCount,
} from "../../helper/firebase.js";
import ImageView from "../../components/imageView/ImageView";
import { ReactComponent as PostIcon } from "../../images/posts-icon.svg";
import { ReactComponent as SavedPostIcon } from "../../images/saved-posts-icon.svg";
import { ReactComponent as SelfPostIcon } from "../../images/self-posts-icon.svg";

const selectedTabColor = "#0094f6";
const unselectedTabColor = "#8e8e8e";
const postsCountPerLoad = 10;

const InvalidUser = (props) => {
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
          Go to home.
        </span>
      </div>
    </div>
  );
};
const SpinnerView = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="spinner-view w-100 flex-center p-3">
      <img width={35} height={35} src="/images/spinner.gif" alt="" />
    </div>
  );
});
class Profile extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      avatarSize: window.innerWidth < 736 ? 77 : 168,
      selectedTabIndex: 0,
      userData: {},
      username: null,
      posts: [],
      loadingPosts: true,
      isEndOfPosts: false,
    };
    this.observer = React.createRef();
    this.lastPostKey = React.createRef(null);
  }

  fetchPhotos = (node) => {
    // if (this.state.loadingPosts) return;
    // if (this.observer.current) this.observer.current.disconnect();
    this.observer.current = new IntersectionObserver(async (photos) => {
      if (photos[0].isIntersecting && !this.state.loadingPosts) {
        this.setState({ loadingPosts: true });
        let posts = await getUserPosts(
          window.userPostsRef,
          this.state.userData.id,
          this.lastPostKey.current,
          postsCountPerLoad
        );
        if (posts.data?.length === 0) {
          this.observer.current.disconnect();
          this.setState({ isEndOfPosts: true });
          return;
        }
        let sortedPosts = posts.data?.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1
        );
        this.setState({
          posts: [...this.state.posts, ...sortedPosts],
          loadingPosts: false,
        });
        this.lastPostKey.current = posts.lastKey;
      }
    });
    if (node) this.observer.current.observe(node);
  };

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
    let posts = await getUserPosts(
      window.userPostsRef,
      id.val(),
      this.lastPostKey.current,
      postsCountPerLoad
    );
    let sortedPosts = posts.data.sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
    );
    let obj = {
      ...userData.val(),
      followers: followers,
      following: following,
      id: id.val(),
      postsCount: postsCount,
    };
    if (obj.id !== window.fbUser.id) {
      let ref = window.userFollowingRef;
      let res = await ref.child(`${window.fbUser.uid}/${obj.id}`).once("value");
      let isCurrentUserFollowing = res.val() === 1;
      obj["isCurrentUserFollowing"] = isCurrentUserFollowing;
    }
    if (this._isMounted) {
      this.setState(
        {
          userData: { ...obj },
          posts: [...sortedPosts],
          loadingPosts: false,
        },
        () => {
          this.lastPostKey.current = posts.lastKey;
        }
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.url !== this.props.match.url) {
      this.setState({ userData: {} });
      this.fetchProfileData();
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchProfileData();
    window.onresize = () =>
      this.setState({ avatarSize: window.innerWidth < 736 ? 77 : 168 });
  }

  componentWillUnmount() {
    this._isMounted = false;
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
            editProfileTapped={() => this.props.history.push("/account/edit")}
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
                {this.state.posts.map((post) => {
                  return (
                    <ImageView
                      className="pointer"
                      src={post.imageUrl}
                      key={post.createdAt}
                    />
                  );
                })}
              </div>
              {this.state.isEndOfPosts ? null : (
                <SpinnerView ref={this.fetchPhotos} />
              )}
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
      <div className="Profile position-relative min-vh-100 flex-center align-items-start">
        {this.loadViews()}
      </div>
    );
  }
}
export default withRouter(memo(Profile));
