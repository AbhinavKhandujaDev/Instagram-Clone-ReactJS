import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

var configure = {
  apiKey: process.env.REACT_APP_FIREBASEAPIKEY,
  authDomain: process.env.REACT_APP_FIREBASEAUTHDOMAIN,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  databaseURL: process.env.REACT_APP_FIREBASEDATABASEURL,
  projectId: process.env.REACT_APP_FIREBASEPROJECTID,
};

firebase.initializeApp(configure);
window.firebase = firebase;

window.dbRef = firebase.database();
window.storageRef = firebase.storage();

// firebase
//   .database()
//   .ref("users")
//   .on(
//     "value",
//     (snapshot) => {
//       debugger;
//       console.log(JSON.stringify(snapshot, null, 4));
//     },
//     (error) => {
//       debugger;
//     }
//   );

window.usersRef = window.dbRef.ref("users");
window.postsRef = window.dbRef.ref("posts");
window.userFeedRef = window.dbRef.ref("user-feed");
window.userPostsRef = window.dbRef.ref("user-posts");
window.userLikesRef = window.dbRef.ref("user-likes");
window.postLikesRef = window.dbRef.ref("post-likes");
window.userFollowerRef = window.dbRef.ref("user-follower");
window.commentsRef = window.dbRef.ref("comments");
window.notificationsRef = window.dbRef.ref("notifications");
window.messagesRef = window.dbRef.ref("messages");
window.userMessagesRef = window.dbRef.ref("user-messages");
window.hashtagPostsRef = window.dbRef.ref("hashtag-post");

window.profileImageStorageRef = window.storageRef.ref("profile_images");
