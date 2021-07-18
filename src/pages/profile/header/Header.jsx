import { memo } from "react";
import Avatar from "../../../components/avatar/Avatar";
import "./Header.css";

const Audience = (props) => {
  const { classes } = props;
  return (
    <div
      className={`audience-div w-100 flex-center justify-content-between ${classes}`}
    >
      <div>
        <span>{props.data.postsCount}</span> posts
      </div>
      <div>
        <span>{props.data.followers}</span> followers
      </div>
      <div>
        <span>{props.data.following}</span> following
      </div>
    </div>
  );
};

const Actions = (props) => {
  if (props.data.id === window.firebase.auth().currentUser.uid) {
    return (
      <button className="flex-grow-1 btn-default bordered">Edit Profile</button>
    );
  } else if (props.data.id !== window.firebase.auth().currentUser.uid) {
    return (
      <button className="flex-grow-1 btn-default bordered">Edit Profile</button>
    );
  }
};

function Header(props) {
  const { avatarSize = 168, userData } = props;
  return (
    <div className="Header">
      <div className="upper-sections-div flex-center-v align-items-start px-3">
        <section className="left-section">
          <Avatar radius={avatarSize} src={userData?.profileImageUrl} />
        </section>
        <section
          className={`right-section d-flex align-items-start flex-column ms-${
            avatarSize === 168 ? 5 : 4
          }`}
        >
          <div className="profile-actions-div d-flex w-100 flex-wrap">
            <div className="username h1 w-75 text-start">
              {userData?.username}
            </div>
            <div className="actions-div flex-center-v float-left flex-grow-1">
              <button className="flex-grow-1 btn-default bordered">
                Message
              </button>
              <div style={{ width: 10 }} />
              <button className="flex-grow-1 btn-default">Follow</button>
            </div>
          </div>
          {avatarSize === 168 ? <Audience data={props.userData} /> : null}
          <div className="bio-div text-start">
            <div className="name">{userData?.name}</div>
            {/* 150 or fewer */}
            {userData?.bio}
          </div>
        </section>
      </div>
      {avatarSize === 77 ? (
        <Audience classes="bottom-div" data={props.userData} />
      ) : null}
    </div>
  );
}

export default memo(Header);
