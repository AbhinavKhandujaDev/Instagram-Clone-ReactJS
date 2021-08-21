import { useRef } from "react";

const style = {
  height: "100%",
  width: "100%",
  overflow: "scroll",
};

export default function InfiniteScrollList(props) {
  const { children, id, reachedToEnd } = props;
  const lastScrollTop = useRef(0);
  return (
    <div
      style={style}
      onScroll={(e) => {
        let scrollViewHeight = e.target.getBoundingClientRect().height;
        let scrollViewBottom = e.target.scrollHeight - e.target.scrollTop;
        let isLast = lastScrollTop.current
          ? lastScrollTop.current >= e.target.scrollTop
          : true;
        // let max = Math.max(e.target.scrollTop, lastScrollTop.current);
        if (scrollViewBottom <= scrollViewHeight && isLast) {
          lastScrollTop.current = Math.max(
            e.target.scrollTop,
            lastScrollTop.current
          );
          reachedToEnd && reachedToEnd();
        }
      }}
      className="InfiniteScrollList"
    >
      <div id={id} className="content-div">
        {children}
      </div>
    </div>
  );
}
