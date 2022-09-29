import React from "react";

export default function Popup4(props) {
  const handleClose = () => {
    props.setIsOpen(false);
  };

  return props.visible ? (
    <div className="popup4">
      {props.content}
      <div>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  ) : null;
}
