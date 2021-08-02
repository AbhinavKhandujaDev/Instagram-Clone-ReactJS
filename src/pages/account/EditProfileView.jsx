import { memo, useState, useEffect, useMemo, useCallback } from "react";
import ModalPopup from "../../components/ModalPopup";
import AlertView from "../../components/alertView/AlertView";
import Avatar from "../../components/avatar/Avatar";
import TitleFieldView from "./TitleFieldView";
import {
  fetchUserData,
  usernameExists,
  storageExists,
} from "../../helper/firebase.js";
import { v4 as uuid } from "uuid";

function EditProfileView(props) {
  const { showSnackbar } = props;
  const [state, setstate] = useState({
    originalUsrData: null,
    data: null,
    isUpdating: false,
    showModal: false,
    isImageUpdating: false,
  });

  const fetchData = useCallback(async () => {
    let userData = await fetchUserData(window.fbUser.uid);
    let dta = userData.val();
    setstate({ ...state, data: dta, originalUsrData: dta });
  }, []);

  useEffect(() => {
    if (state.data === null) {
      fetchData();
    }
  }, [fetchData]);

  const isSameData = useMemo(
    () => () => {
      let isTrue =
        JSON.stringify(state.data) === JSON.stringify(state.originalUsrData);
      return isTrue;
    },
    [state.data, state.originalUsrData]
  );

  const updateImage = async (e) => {
    setstate({ ...state, showModal: false, isImageUpdating: true });
    let id = await getFileId();
    try {
      if (window.fbUser.profileImageUrl) {
        await window.storage.refFromURL(window.fbUser.profileImageUrl).delete();
      }
    } catch {}
    try {
      let file = new File(e.target.files, "");
      window.profileImageStorageRef
        .child(id)
        .put(file)
        .then(async (snapshot) => {
          let url = await snapshot.ref.getDownloadURL();
          window.usersRef
            .child("AmgiBnUXPiXiSh4QLgNMmkle2tZ2")
            .update({ profileImageUrl: url });
          setstate({
            ...state,
            showModal: false,
            isImageUpdating: false,
            data: { ...state.data, profileImageUrl: url },
          });
          state.originalUsrData.profileImageUrl = url;
        });
    } catch (error) {
      setstate({ ...state, showModal: false, isImageUpdating: false });
    }
  };

  const validData = async () => {
    let obj = [];
    if (state.originalUsrData.name !== state.data.name) {
      obj.push({
        status: state.data.name.length > 0,
        type: "name",
        message: state.data.name.length === 0 ? "Please enter name" : "",
      });
    }
    if (state.originalUsrData.username !== state.data.username) {
      let val = await usernameExists(state.data?.username);
      let key = val.val();
      obj.push({
        status: key === null,
        type: "username",
        message: key !== null ? "Username already exists" : "",
      });
    }
    if (state.originalUsrData.bio !== state.data.bio) {
      obj.push({
        status: state.data.bio.length <= 150,
        type: "bio",
        message:
          state.data.bio.length > 150
            ? "Your bio should be 150 characters or fewer"
            : "",
      });
    }
    return obj;
  };

  const getFileId = async () => {
    let fileId = uuid();
    let exists = await storageExists(fileId);
    if (exists) {
      getFileId();
    } else {
      return fileId;
    }
  };

  return (
    <div
      id="edit-profile"
      className="right-content-view w-100 flex-center flex-column"
    >
      <TitleFieldView
        renderLeftView={() => (
          <Avatar
            className={`${state.isImageUpdating ? "loader" : ""}`}
            src={state.data?.profileImageUrl}
            radius={38}
            strokeColor="transparent"
          />
        )}
        renderRightView={() => (
          <div className="profile-pic-div flex-center flex-column align-items-start">
            <h1 className="username-div m-0 text-truncate">
              {state.originalUsrData?.username}
            </h1>
            <div
              className="photo-text-div text-blue pointer"
              onClick={() => setstate({ ...state, showModal: true })}
            >
              Change Profile Photo
            </div>
          </div>
        )}
      />
      <TitleFieldView
        title="Name"
        placeholder="Name"
        defaultValue={state.data?.name || ""}
        onChange={(e) =>
          setstate({ ...state, data: { ...state.data, name: e.target.value } })
        }
      />
      <TitleFieldView
        title="Username"
        placeholder="Username"
        value={state.data?.username || ""}
        onChange={(e) =>
          setstate({
            ...state,
            data: { ...state.data, username: e.target.value },
          })
        }
      />
      <TitleFieldView
        title="Bio"
        renderRightView={() => (
          <textarea
            value={state.data?.bio || ""}
            onChange={(e) =>
              setstate({
                ...state,
                data: { ...state.data, bio: e.target.value },
              })
            }
          />
        )}
        onChange={(e) =>
          setstate({
            ...state,
            data: { ...state.data, bio: e.target.value },
          })
        }
      />
      <TitleFieldView
        renderRightView={() => (
          <div className="w-100 d-flex align-items-start">
            <button
              disabled={isSameData()}
              className={`btn-default ${state.isUpdating ? "loader" : ""}`}
              onClick={async () => {
                let valid = await validData();
                let falseEntries = valid.filter((o) => !o.status);
                if (falseEntries.length > 0) {
                  showSnackbar && showSnackbar(falseEntries[0].message);
                  return;
                }
                if (state.originalUsrData.username !== state.data.username) {
                  window.usernamesRef
                    .child(state.originalUsrData.username)
                    .remove();
                  window.usernamesRef.update({
                    [state.data.username]: window.fbUser.uid,
                  });
                  let index = valid.findIndex((o) => o.type === "username");
                  valid.splice(index, 1);
                }

                let newObj = { ...state.data };
                valid.forEach((o) => {
                  newObj[o.type] = state.data[o.type];
                });
                window.usersRef.child(window.fbUser.uid).update(newObj);
                state.originalUsrData = newObj;
                setstate({
                  ...state,
                  data: state.originalUsrData,
                });
                showSnackbar("Profile updated successfully!");
              }}
            >
              Submit
            </button>
          </div>
        )}
      />
      {state.showModal ? (
        <ModalPopup
          onModalTapped={() => setstate({ ...state, showModal: false })}
        >
          <AlertView
            headerView={() => (
              <div className="title-div text-black">Change Profile Photo</div>
            )}
            bodyView={() => (
              <div className="">
                <div className="alert-opt-div text-blue">
                  Upload Photo
                  <input
                    id="123"
                    className="position-absolute opacity-0 pointer h-100 w-100"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={updateImage}
                  />
                </div>
                <div className="alert-opt-div text-red">
                  Remove current Photo
                </div>
                <div
                  className="alert-opt-div no-weight text-black"
                  onClick={(event) => setstate({ ...state, showModal: false })}
                >
                  Cancel
                </div>
              </div>
            )}
          />
        </ModalPopup>
      ) : null}
    </div>
  );
}

export default memo(EditProfileView);
