import React from "react";

export default function Popup3(props) {
  const handleClose = () => {
    props.setIsOpen(false);
  };

  const containerClass = props.visible ? "popup3" : "popup3 display-none";

  const rect = props.visible ? props.visible.getBoundingClientRect() : false;
  const style = rect
    ? {
        left: rect.x + rect.width + 20 + "px",
        top: rect.y + "px",
      }
    : { visible: "hidden" };
  return (
    <div className={containerClass} style={style}>
      <div onClick={handleClose}>x</div>
      <div className="popup3-content">{props.content}</div>
    </div>
  );
}
