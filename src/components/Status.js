import React from "react";
import { v4 as uuid } from "uuid";

export default function Status(props) {
  function returnSelect(selectObj) {
    return (
      <span>
        {selectObj.label ? <label>{selectObj.label}</label> : null}
        <select
          disabled={selectObj.disabled}
          defaultValue={selectObj.options[selectObj.value]}
        >
          {selectObj.options.map((option) => {
            return <option key={uuid()}>{option}</option>;
          })}
        </select>
      </span>
    );
  }

  return (
    <div className="flex-groups">
      <div>
        {returnSelect({
          options: ["Active", "Return Mail", "LEC/Inactive", "Blocked"],
          value: props.account.status,
        })}
        {returnSelect({
          label: "Account Type: ",
          value: props.account.type,
          options: [
            "",
            "Advance Pay",
            "Direct Bill",
            "Friends and Family",
            "APOC",
          ],
        })}
        <img className="icon" src="../images/info_italic.png"></img>
        <button type="button">Show Contract Exceptions</button>
      </div>
      <div>
        {returnSelect({
          label: "Phone Indicator: ",
          value: props.account.indicator,
          options: [
            "Cell Phone",
            "Land Line",
            "No Override",
            "Not Indicated",
            "Block",
          ],
        })}
        <img className="icon" src="../images/info_italic.png"></img>
        {returnSelect({
          label: "Validation Surcharge: ",
          options: ["Not Indicated", "Yes", "No"],
        })}
        {returnSelect({
          label: "Special Rate: ",
          options: ["", "LC Public Def. Rate"],
          disabled: true,
        })}
      </div>
      <label>Customer Block Requested: </label>{" "}
      <input type="checkbox" defaultChecked={props.account.block} />
      <div>
        <p>
          <strong>Available: </strong>$0.00
        </p>
        <p>
          <strong>Ledger: </strong>$0.00
        </p>
        <p>
          <strong>Hold Amount: </strong>$0.00
        </p>
        <p>
          <strong>Liability Limit: </strong>$0.00
        </p>
      </div>
      <div>
        {returnSelect({
          label: "Send Bill: ",
          options: ["No Export"],
          disabled: true,
        })}
        <select defaultValue={props.account.facility}>
          {props.facOptions}
        </select>
        <button type="button">View Rates</button>
      </div>
    </div>
  );
}
