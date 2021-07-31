import { memo, Component } from "react";
import Avatar from "../../components/avatar/Avatar";
import "./Account.css";
import { withRouter, Switch, Route } from "react-router-dom";
import { fetchUserData } from "../../helper/firebase.js";
import EditProfileView from "./EditProfileView";
import TitleFieldView from "./TitleFieldView";

const ChangePasswordView = memo(() => {
  return (
    <div
      id="change-password"
      className="right-content-view w-100 flex-center flex-column"
    >
      <TitleFieldView
        renderLeftView={() => <Avatar radius={38} strokeColor="transparent" />}
        renderRightView={() => (
          <div className="profile-pic-div flex-center flex-column align-items-start">
            <h1 className="username-div m-0 text-truncate">
              thegamerondrugsmaksmdkalmkdalmdlkamdalk
            </h1>
          </div>
        )}
      />
      <TitleFieldView title="Old Password" />
      <TitleFieldView title="New Password" />
      <TitleFieldView title="Confirm New Password" />
      <TitleFieldView
        renderRightView={() => (
          <div className="w-100 d-flex align-items-start">
            <button disabled className="btn-default">
              Change Password
            </button>
          </div>
        )}
      />
    </div>
  );
});

const optRowClasses = "opt-row pointer text-start p-3 ps-4";

class Account extends Component {
  state = {
    snackbarMessage: null,
  };

  async fetchUserData() {
    let userData = await fetchUserData(window.fbUser.uid);
    this.setState({ user: userData });
  }

  render() {
    return (
      <div className="Account w-100">
        <div className="border-box account-content-div d-flex">
          <section className="left-section d-flex flex-column">
            <div
              className={`${optRowClasses} ${
                window.location.pathname === "/account/edit" ? "selected" : ""
              }`}
              onClick={() => this.props.history.push("/account/edit")}
            >
              <span>Edit Profile</span>
            </div>
            <div
              className={`${optRowClasses} ${
                window.location.pathname === "/account/change-password"
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                this.props.history.push("/account/change-password")
              }
            >
              <span>Change Password</span>
            </div>
          </section>
          <section className="right-section mt-5 mb-5 w-100">
            <Switch>
              <Route exact path="/account/edit">
                <EditProfileView
                  showSnackbar={(obj) =>
                    this.setState({ snackbarMessage: obj })
                  }
                />
              </Route>
              <Route exact path="/account/change-password">
                <ChangePasswordView />
              </Route>
            </Switch>
          </section>
        </div>
        {this.state.snackbarMessage ? (
          <div
            onAnimationEnd={() => this.setState({ snackbarMessage: null })}
            className="snackbar-div position-absolute w-100 flex-center-v snackbarAnim"
          >
            {this.state.snackbarMessage}
          </div>
        ) : null}
      </div>
    );
  }
}
export default withRouter(memo(Account));
