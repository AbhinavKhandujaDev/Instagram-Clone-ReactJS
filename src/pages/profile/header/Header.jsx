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
        <span>69</span> posts
      </div>
      <div>
        <span>69</span> followers
      </div>
      <div>
        <span>69</span> following
      </div>
    </div>
  );
};

function Header(props) {
  const { avatarSize = 168 } = props;
  return (
    <div className="Header">
      <div className="upper-sections-div flex-center-v align-items-start">
        <section className="left-section">
          <Avatar radius={avatarSize} />
        </section>
        <section
          className={`right-section d-flex align-items-start flex-column ms-${
            avatarSize === 168 ? 5 : 4
          }`}
        >
          <div className="profile-actions-div d-flex w-100 flex-wrap">
            <div className="username h1 w-75">
              ThisausernamekncjnskjcnsdjkcnskjcnsjkcnskjcnsjkcdsnkcjsdThisausernamekncjnskjcnsdjkcnskjcnsjkcnskjcnsjkcdsnkcjsd
            </div>
            <div className="actions-div flex-center-v float-left flex-grow-1">
              <button className="flex-grow-1 btn-default bordered">
                Message
              </button>
              <div style={{ width: 10 }} />
              <button className="flex-grow-1 btn-default">Follow</button>
            </div>
          </div>
          {avatarSize === 168 ? <Audience /> : null}
          <div className="bio-div text-start">
            <div className="name">Virat Kohli</div>
            {/* 150 or fewer */}
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500
          </div>
        </section>
      </div>
      {avatarSize === 77 ? <Audience classes="bottom-div" /> : null}
    </div>
  );
  // return (
  //   <div className="Header w-100 position-relative flex-center flex-column">
  //     <div className="m-1 flex-center">
  //       <div className="dp-div d-flex">
  //         <Avatar radius={avatarSize} />
  //         <div
  //           style={{
  //             width: avatarSize === 168 ? 60 : 28,
  //             height: avatarSize,
  //           }}
  //         />
  //       </div>
  //       <section className="details-section d-flex position-relative flex-column">
  //         <div className="d-flex flex-wrap position-relative">
  //           <h1 className="username text-start">usernamencdjsnscjkdncjskncjdksncjksdncdjskncjkdsncjdks</h1>
  //           <div className="actions-div flex-center-v flex-grow-1 justify-content-around position-relative">
  //             <button className="flex-grow-1 btn-default bordered">
  //               Message
  //             </button>
  //             <div style={{ width: 10 }} />
  //             <button className="flex-grow-1 btn-default">Follow</button>
  //           </div>
  //         </div>
  //         {avatarSize === 168 ? <Audience /> : null}
  //         <div className="bio-div text-start">
  //           <div className="name">Virat Kohli</div>
  //           {/* 150 or fewer */}
  //           Lorem Ipsum is simply dummy text of the printing and typesetting
  //           industry. Lorem Ipsum has been the industry's standard dummy text
  //           ever since the 1500
  //         </div>
  //       </section>
  //     </div>
  //     {avatarSize === 77 ? <Audience classes="bottom-div" /> : null}
  //   </div>
  // );
}

export default memo(Header);
