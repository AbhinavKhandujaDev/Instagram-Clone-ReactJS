import { memo, Component } from "react";
import "./Profile.css";
import Avatar from "../../components/avatar/Avatar";

class Profile extends Component {
  render() {
    return (
      <div className="Profile w-100 h-100 flex-center align-items-start">
        <div className="profile-content-div">
          <div className="details-div w-100 flex-center justify-content-start">
            <Avatar radius={168} />
            <div className="profile-details-div flex-grow-1">
              <div className="action-div flex-center justify-content-between flex-wrap">
                <div className="username-div">This is username</div>
                <button className="btn-default">Follow</button>
              </div>
              <div className="audience-div flex-center justify-content-between">
                <div>
                  <span>69</span> posts
                </div>
                <div>
                  <span>69</span> followers
                </div>
                <div>
                  <span>69</span> following
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default memo(Profile);
