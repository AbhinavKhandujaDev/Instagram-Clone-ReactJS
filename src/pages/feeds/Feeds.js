import { memo, Component, useEffect, useState, useRef } from "react";
import "./Feeds.css";
import { ReactComponent as SaveIcon } from "../../images/saved-posts-icon.svg";
import {
  fetchUserData,
  getUserPosts,
  getPostComments,
  getCount,
} from "../../helper/firebase";
import { withRouter } from "react-router-dom";

const CaptionDiv = memo(({ username, caption, id }) => {
  const [state, setstate] = useState({
    showMoreBtn: false,
    isCollapsed: false,
  });
  const captionDiv = useRef();
  useEffect(() => {
    let height = captionDiv.current?.getBoundingClientRect().height || 0;
    setstate({
      ...state,
      showMoreBtn: height > 38,
      isCollapsed: height > 38,
    });
  }, []);
  return (
    <div className="caption-div px-3 d-flex flex-column align-items-start">
      <h6
        id={id}
        ref={captionDiv}
        className={`caption caption-text flex-wrap text-start py-1 ${
          state.isCollapsed ? "collapsed" : ""
        }`}
      >
        <span className="link fw-bold pointer">{username} </span>
        {caption}
      </h6>
      {state.showMoreBtn ? (
        <div
          className="more-text grey-text pointer"
          onClick={() =>
            setstate({ ...state, isCollapsed: false, showMoreBtn: false })
          }
        >
          more
        </div>
      ) : null}
    </div>
  );
});

const Post = memo((props) => {
  let { post, history } = props;
  const [state, setstate] = useState({
    userData: null,
    commments: [],
    comment: "",
    totalComments: 0,
    showMoreBtn: false,
  });
  const commentInputRef = useRef();
  useEffect(async () => {
    if (post.uid === window.fbUser.uid) {
      var data = window.fbUser;
    } else {
      var data = await fetchUserData(post.uid);
      data = data.val();
    }
    let comments = await getPostComments(post.postId, null);
    let totalComments = await getCount(window.commentsRef, post.postId);
    setstate({
      ...state,
      userData: data,
      comments: comments.data,
      totalComments: totalComments,
    });
    commentInputRef.current.addEventListener("input", (e) => {
      if (
        e.code?.toLowerCase() === "enter" ||
        e.inputType === "insertLineBreak"
      ) {
        e.target.value = e.target.value.replace("\n", "");
      }
      e.target.style.height = "1px";
      let height = e.target.scrollHeight > 84 ? 84 : e.target.scrollHeight;
      e.target.style.height = height + "px";
    });
  }, [post]);
  console.log("Post render");
  return (
    <div className="Post w-100 border-box justify-content-start">
      <div className="user-div flex-center w-100 justify-content-between p-3">
        <div
          className="flex-center"
          onClick={() => history.push(`${state.userData.username}`)}
        >
          <img
            className="rounded-circle pointer"
            width={42}
            height={42}
            src={state.userData?.profileImageUrl}
            alt=""
          />
          <div className="link fw-bold pointer">{state.userData?.username}</div>
        </div>
        <img
          className="rounded-circle"
          width={24}
          height={24}
          src="./images/menu-dots.svg"
          alt=""
          onClick={() => setstate({ ...state, totalComments: 1 })}
        />
      </div>
      <div className="image-div">
        <img className="post-image" src={post.imageUrl} alt="" />
      </div>
      <div className="action-div w-100 p-3">
        <div className="flex-center justify-content-between">
          <section className="left-section">
            <img src="./images/like-selected-red-icon.svg" alt="" />
            <img className="mx-3" src="./images/comment.svg" alt="" />
            <img src="./images/message-icon.svg" alt="" />
          </section>
          <SaveIcon />
        </div>
        {post.likes > 0 ? (
          <div
            style={{ fontSize: 14 }}
            className="fw-bold w-100 text-start my-2"
          >
            {post.likes} likes
          </div>
        ) : null}
      </div>
      <CaptionDiv
        id={post.id}
        username={state.userData?.username + " "}
        caption={post.caption}
        showMoreBtn={state.showMoreBtn}
      />
      <div className="comments-div text-start">
        {state.totalComments > 2 ? (
          <div className="grey-text pointer">
            View all <span>{state.totalComments}</span> comments
          </div>
        ) : null}
        <div>
          {state.comments?.map((comment) => (
            <CaptionDiv
              id={comment.commentId}
              key={comment.commentId}
              username={comment.by}
              caption={comment.commentText}
            />
          ))}
        </div>
      </div>
      <div className="date-div grey-text text-start fw-bold p-3">
        9 hours ago
      </div>
      <form
        style={{ minHeight: "56px", borderTop: "var(--default-border)" }}
        className="comment-div flex-center px-4 w-100"
      >
        <textarea
          style={{
            height: "30px",
            resize: "none",
          }}
          ref={commentInputRef}
          className="no-style flex-grow-1"
          placeholder="Add a comment..."
        />
        <button disabled type="submit" className="no-style text-blue-disabled fw-bold">
          Post
        </button>
      </form>
    </div>
  );
});

class Feeds extends Component {
  state = {
    feeds: [
      {
        caption: "Venom",
        createdAt: 1628346525,
        imageUrl:
          "https://firebasestorage.googleapis.com:443/v0/b/instagramclone-1ee13.appspot.com/o/post_images%2F86D71C2F-9CE0-4BDC-B744-348F05BBE97E?alt=media&token=277f82b6-ee99-4f59-a932-a7d5558b3356",
        likes: 0,
        uid: "AmgiBnUXPiXiSh4QLgNMmkle2tZ2",
        postId: "-MgW01gNxdh908fy6SSq",
      },
    ],
    // feeds: [],
  };

  async componentDidMount() {
    return;
    let posts = await getUserPosts(
      window.userFeedRef,
      window.fbUser.uid,
      null,
      3
    );
    this.setState({
      feeds: [
        ...posts.data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)),
      ],
    });
    console.log(JSON.stringify(posts, null, 4));
  }
  render() {
    return (
      <div className="Feeds w-100 py-5">
        <div className="feeds-content-div">
          {this.state.feeds?.map((post) => (
            <Post
              key={post.imageUrl}
              post={post}
              history={this.props.history}
            />
          )) || null}
        </div>
      </div>
    );
  }
}
export default withRouter(Feeds);
