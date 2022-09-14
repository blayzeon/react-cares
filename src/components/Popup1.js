import React from "react";

export default function Popup1(props) {
  const containerClass = props.style
    ? props.class + "popup wide"
    : "popup wide";

  const handleClose = () => {
    props.setIsOpen(false);
  };

  const handleSubmit = () => {
    const result = props.onSubmit();
    if (result === true) {
      props.setIsOpen(false);
    } else {
      return;
    }
  };

  return props.visible ? (
    <div className={containerClass} data-popup={props.type}>
      <div className="space-between">
        {props.top}
        <button className="close-btn" onClick={handleClose}>
          x
        </button>
      </div>
      <div>{props.content}</div>
      <button className="flex-end" onClick={handleSubmit}>
        {props.submit}
      </button>
    </div>
  ) : null;
}
