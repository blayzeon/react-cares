import React from "react";

export default function Popup2(props) {
  const elm = props.contentObj
    ? { ...props.contentObj }
    : {
        top: false,
        legend: false,
        content: "content",
        type: "popup",
        submit: false,
        other: false,
      };

  const containerClass = props.style ? props.style + " " + "popup2" : "popup2";

  const handleClose = () => {
    if (props.closeEvent) {
      props.closeEvent();
    }

    props.setIsOpen(false);
  };

  const handleSubmit = () => {
    const data = elm.grabData();
    const result = elm.onSubmit(data);
    if (result === true) {
      props.setIsOpen(false);
    } else {
      return;
    }
  };

  const mainContent = (
    <>
      {elm.content}
      <span className="flex gap-small buttons">
        {elm.submit ? (
          <>
            <button onClick={handleSubmit} type="button">
              {elm.submit}
            </button>
            <button onClick={handleClose} type="button">
              {elm.close ? elm.close : "Close"}
            </button>
          </>
        ) : null}{" "}
        {elm.other ? elm.other : null}
      </span>
    </>
  );
  return props.visible ? (
    <div className="popup2-bg">
      <div className={containerClass} data-popup={elm.type}>
        <div className="space-between">
          {elm.top ? <span>💾 {elm.top}</span> : <span></span>}
          <button className="close-btn" type="button" onClick={handleClose}>
            x
          </button>
        </div>
        <div className="flex-column gap-small content">
          {elm.legend ? (
            <fieldset>
              <legend>
                <strong>{elm.legend}</strong>
              </legend>
              {mainContent}
            </fieldset>
          ) : (
            mainContent
          )}
        </div>
        {elm.noSpacer ? null : <div className="popup2-spacer"></div>}
      </div>
    </div>
  ) : null;
}
