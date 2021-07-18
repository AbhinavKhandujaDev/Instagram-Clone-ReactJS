export async function fetchUserData(key) {
  if (!key) return;
  let path = window.usersRef;
  let resp = await path.child(key).once("value");
  return resp;
}

export async function getIdByUsername(username) {
  if (!username) return;
  let path = window.usernamesRef;
  let resp = await path.child(username).once("value");
  return resp;
}

export async function getFollowersCount(key, isFollowing = false) {
  if (!key) return;
  const ref = isFollowing ? window.userFollowingRef : window.userFollowerRef;
  let resp = await ref.child(key).once("value");
  return resp.numChildren();
}
export async function getCollectionCount(key, ref) {
  if (!key || !ref) return;
  let resp = await ref.child(key).once("value");
  return resp.numChildren();
}
export async function getPosts(key) {
  let ref = window.userPostsRef;
  let resp = await ref.child(key).once("value");
  let postIds = Object.keys(resp.val());
  let data = Promise.all(
    postIds.map(async (obj) => {
      let ref = window.postsRef;
      let value = await ref.child(obj).once("value");
      return value.val();
    })
  );
  return data;
}
