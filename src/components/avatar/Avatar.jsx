import { memo } from "react";
import "./Avatar.css";

function Avatar(props) {
  const {
    className,
    strokeWidth,
    strokeColor = "var(--default-gradient)",
    radius = 22,
    onClick,
  } = props;
  return (
    <div
      style={{ width: radius, height: radius }}
      className={`Avatar flex-center position-relative pointer ${className}`}
      onClick={onClick}
    >
      <div
        style={{
          width: radius,
          height: radius,
          borderRadius: radius,
          padding: strokeWidth
            ? strokeWidth
            : Math.max((3.3 / 100) * radius, 2),
          background: strokeColor,
        }}
        className="border-div overflow-hidden"
      >
        <div
          style={{
            borderRadius: "50%",
            width: radius,
            height: radius,
          }}
          className="w-100 h-100"
        />
      </div>
      <img className="pic position-absolute" src="./images/avatar.jpg" alt="" />
    </div>
  );
}

export default memo(Avatar);
