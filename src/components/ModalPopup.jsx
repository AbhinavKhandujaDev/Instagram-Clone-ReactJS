import { memo, useEffect } from "react";
import ReactDOM from "react-dom";
import { v4 as uuid } from "uuid";

const modalRoot = document.getElementById("modal-root");

function ModalPopup(props) {
  const modalId = uuid();
  useEffect(() => {
    let body = document.querySelector("body");
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "initial";
    };
  });
  return ReactDOM.createPortal(
    <div
      id={modalId}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 3,
        backgroundColor: "rgba(0,0,0,.65)",
        ...props.styles,
      }}
      className="ModalPopup flex-center"
      onMouseDown={(e) => {
        if (e.target.classList.contains("ModalPopup")) {
          props.onModalTapped && props.onModalTapped();
        }
      }}
    >
      {props.children}
    </div>,
    modalRoot
  );
}
export default memo(ModalPopup);
