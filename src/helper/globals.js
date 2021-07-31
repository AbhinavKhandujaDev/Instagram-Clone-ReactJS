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
window.storage = firebase.storage();

// (async () => {
//   let ref = window.dbRef.ref("users");
//   let resp = await ref.child("AmgiBnUXPiXiSh4QLgNMmkle2tZ2").once("value");
//   console.log(JSON.stringify(resp.val(), null, 4));
// })();

// return;
// firebase
//   .database()
//   .ref("users")
//   .on(
//     "value",
//     (snapshot) => {
//       // console.log(JSON.stringify(snapshot, null, 4));
//       return snapshot;
//     },
//     (error) => {
//       debugger;
//     }
//   );

// firebase
//   .database()
//   .ref("posts")
//   .limitToLast(1)
//   .orderByKey()
//   .once("value", (ss) => {
//     console.log(JSON.stringify(ss.val(), null, 4));
//   });

window.usersRef = window.dbRef.ref("users");
window.usernamesRef = window.dbRef.ref("usernames");
window.postsRef = window.dbRef.ref("posts");
window.userFeedRef = window.dbRef.ref("user-feed");
window.userPostsRef = window.dbRef.ref("user-posts");
window.userLikesRef = window.dbRef.ref("user-likes");
window.postLikesRef = window.dbRef.ref("post-likes");
window.userFollowerRef = window.dbRef.ref("user-follower");
window.userFollowingRef = window.dbRef.ref("user-following");
window.commentsRef = window.dbRef.ref("comments");
window.notificationsRef = window.dbRef.ref("notifications");
window.messagesRef = window.dbRef.ref("messages");
window.userMessagesRef = window.dbRef.ref("user-messages");
window.hashtagPostsRef = window.dbRef.ref("hashtag-post");

window.profileImageStorageRef = window.storage.ref("profile_images");

// firebase
//   .storage()
//   .ref("profile_images")
//   .child("12351EA7-9457-4DF0-BEA1-6A0252920520").put();
