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
  const [popupContentObj, setPopupContentObj] = useState();
  const [remainingBalance, setRemainingBalance] = useState(props.balance);

  const onClose = () => {
    // close the popup
  };

  const handleChange = (e) => {
    if (e.target.value === "Account Closure") {
      setIsAccountClosure(true);
    } else {
      props.resetClosure();
      if (e.target.value === "Refund") {
        setIsAccountClosure(false);
      } else {
        setIsAccountClosure(null);
      }
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
      // todo: fix bug where remaining balance pops back up if you revisit account closure page
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
        refunded: trans[i].refunded,
        forClosure: trans[i].forClosure,
        grabData: function () {
          return [trans[i]];
        },
        onSubmit: function (data) {
          // on submit
          if (isAccountClosure) {
            const difference = remainingBalance - parseFloat(trans[i].amount);
            const newBal = difference < 0 ? 0 : difference;
            setRemainingBalance(newBal.toFixed(2));
            console.log(remainingBalance, trans[i].amount);
          }

          props.refund(data, isAccountClosure);
          return true;
        },
      };

      const handleCcClick = () => {
        alert(trans[i].cc);
      };

      const handleClick = () => {
        const unClickable =
          refundContentObj.forClosure || refundContentObj.refunded;

        // when the table row is clicked
        if (unClickable === true) {
          return false;
        } else {
          setPopupContentObj(refundContentObj);
          setShowPopup(true);
        }
      };

      const row = [];
      if (type) {
        row.push(
          <div className="flex center" onClick={handleClick}>
            <input
              type="checkbox"
              checked={
                trans[i].forClosure === "true" || trans[i].forClosure === true
                  ? true
                  : false
              }
              readOnly={true}
            />
          </div>
        );
      }
      row.push(
        <div className="flex center" onClick={handleClick}>
          <a href="#">{trans[i].forClosure ? "Pending" : "Refund"}</a>
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

  // todo no cc refund
  // "debora.stanton submitted non-credit card check refund for $12.54. Refund reason Account Closure. New available balance $0.00. Account status set to Blocked."
  return (
    <div>
      <Popup2
        visible={showPopup}
        setIsOpen={setShowPopup}
        contentObj={popupContentObj}
        closeEvent={onClose}
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
        {isAccountClosure ? (
          <div>Remaining Balance to Close Account: ${remainingBalance}.</div>
        ) : null}
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
            <button type="button" onClick={props.refund}>
              Save
            </button>
            <button type="button" onClick={props.resetClosure}>
              Cancel
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
