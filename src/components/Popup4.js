import React from "react";

export default function Popup4(props) {
  const handleClose = () => {
    props.setIsOpen(false);
  };

  const createContent = (
    <div className="default flex-column">
      <p>Determine Account Type</p>
      <label className="center">
        Facility:{" "}
        <select disabled={true}>
          <option></option>
          <option>
            WV_DOC-Wheeling Parole Services probation office (WV53)
          </option>
        </select>
      </label>
      <div className="flex gap-small flex-end bottom margin-bottom-large pad-small">
        <button disabled={true}>Save</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );

  return props.visible ? (
    props.content ? (
      <div className="popup4">
        {props.content}
        <div>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    ) : (
      <div className="popup4">{createContent}</div>
    )
  ) : null;
}
