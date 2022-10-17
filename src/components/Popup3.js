import React from "react";

export default function Popup3(props) {
  const handleClose = () => {
    props.setIsOpen(false);
  };

  const rect = props.visible ? props.visible.getBoundingClientRect() : false;
  let isVisible = rect.top > 0 ? true : false;
  const style = rect
    ? {
        left: rect.x + rect.width + 20 + "px",
        top: rect.y + "px",
      }
    : { isVisible: false };

  const containerClass = isVisible ? "popup3" : "popup3 display-none";
  return (
    <div className={containerClass} style={style}>
      <div onClick={handleClose}>x</div>
      <div className="popup3-content">{props.content}</div>
    </div>
  );
}
