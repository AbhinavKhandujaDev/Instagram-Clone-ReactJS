import { memo } from "react";

function ImageView(props) {
  const { src, styles } = props;
  return (
    <div className="ImageView position-relative" {...styles}>
      <img width="100px" height="100px" src={src} alt="" />
    </div>
  );
}

export default memo(ImageView);
