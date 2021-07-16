import { memo, Component } from "react";
import "./Profile.css";
import Header from "./header/Header";
import ImageView from "../../components/imageView/ImageView";
import { ReactComponent as PostIcon } from "../../assets/posts-icon.svg";
import { ReactComponent as SavedPostIcon } from "../../assets/saved-posts-icon.svg";
import { ReactComponent as SelfPostIcon } from "../../assets/self-posts-icon.svg";

const selectedTabColor = "#0094f6";
const unselectedTabColor = "#8e8e8e";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSize: 168,
      selectedTabIndex: 0,
    };
  }
  componentDidMount() {
    this.setState({ avatarSize: window.innerWidth < 736 ? 77 : 168 });

    window.onresize = () =>
      this.setState({ avatarSize: window.innerWidth < 736 ? 77 : 168 });
  }

  shouldComponentUpdate(next, nextState) {
    return JSON.stringify(this.state) !== JSON.stringify(nextState);
  }

  getSelectedColor(index) {
    return this.state.selectedTabIndex === index
      ? selectedTabColor
      : unselectedTabColor;
  }

  render() {
    return (
      <div className="Profile position-relative flex-center">
        <div className="profile-content-div">
          <Header avatarSize={this.state.avatarSize} />
          <div className="post-tabs-div pt-3 pb-3 flex-center justify-content-between">
            <PostIcon
              className="flex-grow-1 pointer"
              fill={this.getSelectedColor(0)}
              onClick={() => this.setState({ selectedTabIndex: 0 })}
            />
            <SavedPostIcon
              className="flex-grow-1 pointer"
              fill={this.getSelectedColor(1)}
              onClick={() => this.setState({ selectedTabIndex: 1 })}
            />
            <SelfPostIcon
              className="flex-grow-1 pointer"
              fill={this.getSelectedColor(2)}
              onClick={() => this.setState({ selectedTabIndex: 2 })}
            />
          </div>
          <ImageView />
        </div>
      </div>
    );
  }
}
export default memo(Profile);
