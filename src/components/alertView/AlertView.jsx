import { memo } from "react";
import "./AlertView.css";
function AlertView(props) {
  const { headerView, bodyView } = props;
  return (
    <div
      className="AlertView flex-center flex-column justify-content-start"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="alert-header p-4">{headerView && headerView()}</div>
      <div className="alert-body">{bodyView && bodyView()}</div>
    </div>
  );
}

export default memo(AlertView);
