import React from "react";
import Table from "./Table";
import transactions from "../data/transactions.json";
import facilities from "../data/facilities.json";
import Adjustments from "./Adjustments";

function returnTransactions(account) {}

function returnSelect(selectObj) {
  return (
    <span>
      {selectObj.label ? <label>{selectObj.label}</label> : null}
      <select disabled={selectObj.disabled}>
        {selectObj.options.map((option) => {
          return <option>{option}</option>;
        })}
      </select>
    </span>
  );
}

export default function Main(props) {
  if (props.page === "Account Summary") {
    const facOptions = facilities.map((fac) => {
      return (
        <option value={fac.public} data-link={fac.link}>
          {fac.public}
        </option>
      );
    });
    return (
      <>
        <Adjustments />
        <div className="flex-groups">
          <div>
            {returnSelect({
              options: ["Active", "Return Mail", "LEC/Inactive", "Blocked"],
            })}
            {returnSelect({
              label: "Account Type: ",
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
          <label>Customer Block Requested: </label> <input type="checkbox" />
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
            <select>{facOptions}</select>
          </div>
        </div>
        <Table data={props.data} page={props.page} />
      </>
    );
  }
}
