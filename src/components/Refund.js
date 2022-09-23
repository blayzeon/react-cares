import React, { useState } from "react";
import Table from "./Table";
import Popup2 from "./Popup2";

export default function Refund(props) {
  const refundable = props.refundable;

  /* 
    true > show account closure
    false > show refund
    null > show nothing
  */
  const [isAccountClosure, setIsAccountClosure] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupSubmit, setPopupSubmit] = useState();
  const [popupContentObj, setPopupContentObj] = useState();

  const handleChange = (e) => {
    if (e.target.value === "Account Closure") {
      setIsAccountClosure(true);
    } else if (e.target.value === "Refund") {
      setIsAccountClosure(false);
    } else {
      setIsAccountClosure(null);
    }
  };

  function generateTableContent(trans = refundable, type = isAccountClosure) {
    const head = isAccountClosure
      ? [
          "Use For Closure",
          "Refund",
          "Date",
          "Added By",
          "Amount",
          "CC Number",
          "Comment",
        ]
      : ["Refund", "Date", "Added By", "Amount", "CC Number", "Comment"];

    const body = [];

    for (let i = 0; i < trans.length; i += 1) {
      const returnInput = (obj) => {
        return (
          <div className="popup-payment-pair">
            <label>{obj.label}: </label>
            {obj.defaultValue ? (
              <input
                type={obj.type ? obj.type : "text"}
                className="w248"
                defaultValue={obj.defaultValue}
              />
            ) : (
              <input
                type={obj.type ? obj.type : "text"}
                className="w248"
                value={obj.value}
                readOnly={true}
              />
            )}
          </div>
        );
      };

      // todo: refund amount can be updated
      // todo: refund checkbox populates email
      const refundContentObj = {
        content: (
          <form className="no-margin-parent">
            {returnInput({
              label: "Request Date",
              value: trans[i].date.join(" "),
            })}
            {returnInput({
              label: "Rep's Name",
              value: "new.trainee",
            })}
            {returnInput({
              label: "Customer Account",
              value: trans[i].account,
            })}
            {returnInput({
              label: "Customer's Name",
              value: props.account.name.first + " " + props.account.name.last,
            })}
            {returnInput({
              label: "Merchant ID",
              value: 123456,
            })}
            {returnInput({
              label: "Credit Card Number",
              value: trans[i].cc[0] + "******" + trans[i].cc[1],
            })}
            {returnInput({
              label: "Ledger Balance",
              value: "$" + props.balance,
            })}
            {returnInput({
              label: "Refund Amount",
              value: "$" + trans[i].amount,
            })}
            <div className="flex gap-tiny">
              <label className="popup-label">Reason for Refund: </label>
              <select className="w248">
                <option>
                  {isAccountClosure ? "Account Closure" : "Refund"}
                </option>
              </select>
            </div>
            <div className="flex">
              <label className="popup-label">E-mail Receipt: </label>
              <input type="checkbox" />
            </div>
            {returnInput({
              label: "E-mail Address",
              value: props.account.email,
            })}
            <div className="popup-payment-pair">
              <label>Comment: </label>
              <textarea className="w248"></textarea>
            </div>
          </form>
        ),
        legend: "Account Closure Request",
        submit: "Submit",
        close: "Close",
        grabData: function () {
          return [trans[i]];
        },
        onSubmit: function (data) {
          props.refund(data);
        },
      };

      const handleCcClick = () => {
        alert(trans[i].cc);
      };

      const handleClick = () => {
        setPopupContentObj(refundContentObj);
        setShowPopup(true);
      };

      const row = [];
      if (type) {
        row.push(
          <div className="flex center" onClick={handleClick}>
            <input
              type="checkbox"
              checked={trans[i].forClosure == true ? true : false}
              readOnly={true}
            />
          </div>
        );
      }
      row.push(
        <div className="flex center" onClick={handleClick}>
          <a href="#">Refund</a>
        </div>
      );
      const refundImage = `${process.env.PUBLIC_URL}/images/info_italic.png`;
      row.push(<div onClick={handleClick}>{trans[i].date}</div>);
      row.push(<div onClick={handleClick}>{trans[i].added}</div>);
      row.push(<div onClick={handleClick}>${trans[i].amount}</div>);
      row.push(
        <div className="flex center">
          <img
            className="hover-pointer"
            src={refundImage}
            onClick={handleCcClick}
          />
        </div>
      );
      row.push(<div onClick={handleClick}>{trans[i].comment}</div>);

      body.push(row);
    }

    const result = {
      thead: [head],
      tbody: body,
    };

    return result;
  }

  return (
    <div>
      <Popup2
        visible={showPopup}
        setIsOpen={setShowPopup}
        contentObj={popupContentObj}
        style="popup-refund"
      />
      <fieldset>
        <legend>Refund Request</legend>
        <label>Type: </label>
        <select onChange={handleChange}>
          <option></option>
          <option>Refund</option>
          <option>Account Closure</option>
        </select>
      </fieldset>
      <div className="border-parent pad-small">
        {isAccountClosure === null ? null : (
          <Table data={generateTableContent()} page="as-comments" />
        )}
      </div>
      <div className="flex gap-small">
        <button type="button">No CC Refund</button>
        {isAccountClosure ? (
          <>
            <button type="button">Check Refund</button>
            <button type="button">Save</button>
            <button type="button">Cancel</button>
          </>
        ) : null}
      </div>
    </div>
  );
}
