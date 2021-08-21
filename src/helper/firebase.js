export async function fetchUserData(key) {
  if (!key) return;
  let path = window.usersRef;
  let resp = await path.child(key).once("value");
  return resp;
}

export async function updateProfile(data) {
  if (!data) return;
  let path = window.usersRef;
  let resp = await path.child(window.fbUser.uid).update(data);
  return resp;
}
export async function usernameExists(username) {
  if (!username) return;
  let path = window.usernamesRef;
  let resp = await path.child(username).get();
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
export async function getCount(ref, path) {
  if (!ref) return;
  let resp = await ref.child(path).once("value");
  return resp.numChildren();
}
export async function getCollectionCount(path, ref) {
  if (!path || !ref) return;
  let resp = await ref.child(path).once("value");
  return resp.numChildren();
}

export async function getUserPosts(ref, userId, lastKey, limit) {
  let postsCount = lastKey ? limit + 1 : limit;
  let query = lastKey
    ? await ref
        .child(userId)
        .endAt(lastKey)
        .limitToLast(postsCount)
        .orderByKey()
    : await ref.child(userId).limitToLast(postsCount).orderByKey();
  let resp = await query.once("value");
  if (!resp.val()) return [];
  let postIds = Object.keys(resp.val());
  let data = await Promise.all(
    postIds.map(async (obj) => {
      let ref = window.postsRef;
      let value = await ref.child(obj).once("value");
      return { ...value.val(), postId: obj };
    })
  );
  if (lastKey) data.pop();
  return {
    data,
    lastKey: postIds[0],
  };
}
export async function getPostComments(postId, lastKey, limit = 2) {
  let postsCount = lastKey ? limit + 1 : limit;
  let query = lastKey
    ? await window.commentsRef
        .child(postId)
        .endAt(lastKey)
        .limitToLast(postsCount)
        .orderByKey()
    : await window.commentsRef
        .child(postId)
        .limitToLast(postsCount)
        .orderByKey();
  let resp = await query.once("value");
  if (!resp.val()) return [];
  let postIds = Object.keys(resp.val());
  let data = await Promise.all(
    postIds.map(async (obj) => {
      let comments = resp.val();
      let username = await window.usersRef
        .child(comments[obj].user)
        .child("username")
        .once("value");
      return { ...comments[obj], commentId: obj, by: username.val() };
    })
  );
  if (lastKey) data.pop();
  return {
    data,
    lastKey: postIds[0],
  };
}

export async function storageExists(name) {
  try {
    await window.profileImageStorageRef.child(name).getMetadata();
    return true;
  } catch (error) {
    return false;
  }
}

export async function changeProfileImage(files) {
  try {
  } catch (error) {}
  await window.storage.refFromURL(window.fbUser.profileImageUrl).delete();
}
