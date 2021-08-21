import { memo } from "react";
import "./ImageView.css";

function ImageView(props) {
  const { src, styles, className, reference } = props;
  return (
    <div className={`ImageView ${className}`} {...styles}>
      <img
        ref={reference}
        className="position-absolute"
        width="100%"
        height="100%"
        src={src}
        alt=""
      />
    </div>
  );
}

export default memo(ImageView);
