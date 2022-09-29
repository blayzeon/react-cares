import React from "react";

export default function Popup3(props) {
  const handleClose = () => {
    props.setIsOpen(false);
  };

  const rect = props.visible ? props.visible.getBoundingClientRect() : false;
  const style = rect
    ? {
        left: rect.x + rect.width + 20 + "px",
        top: rect.y + "px",
      }
    : { visible: "hidden" };
  return props.visible ? (
    <div className="popup3" style={style}>
      <div onClick={handleClose}>x</div>
      <div className="popup3-content">{props.content}</div>
    </div>
  ) : null;
}
