import React from "react";

export default function Popup1(props) {
  const elm = props.contentObj
    ? { ...props.contentObj }
    : {
        top: "top",
        content: "content",
        type: "popup",
        submit: false,
        other: false,
      };

  const containerClass = elm.style
    ? elm.style + " " + "popup wide"
    : "popup wide";

  const handleClose = () => {
    props.setIsOpen(false);
  };

  const handleSubmit = () => {
    const result = elm.onSubmit();
    if (result === true) {
      props.setIsOpen(false);
    } else {
      return;
    }
  };

  return props.visible ? (
    <div className={containerClass} data-popup={elm.type}>
      <div className="space-between">
        {elm.top}
        <button className="close-btn" onClick={handleClose}>
          x
        </button>
      </div>
      <div className="content">{elm.content}</div>
      {elm.submit ? (
        <button className="flex-end" onClick={handleSubmit}>
          {elm.submit}
        </button>
      ) : null}
      {elm.other ? elm.other : null}
    </div>
  ) : null;
}
