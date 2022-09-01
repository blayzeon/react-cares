import React, { useEffect } from "react";
import Table from "./Table";
import transactions from "../data/transactions.json";
import facilities from "../data/facilities.json";
import Adjustments from "./Adjustments";
import { v4 as uuid } from "uuid";

function returnTransactions(account) {}

function returnSelect(selectObj) {
  return (
    <span>
      {selectObj.label ? <label>{selectObj.label}</label> : null}
      <select disabled={selectObj.disabled}>
        {selectObj.options.map((option) => {
          return <option key={uuid()}>{option}</option>;
        })}
      </select>
    </span>
  );
}

export default function Main(props) {
  let account = props.account;
  useEffect(() => {
    console.log(account);
  }, []);

  const formattedComments = props.account.comments.length > 0 ? [] : false;

  props.account.comments.forEach((comment) => {
    const date = comment.date ? comment.date : props.date;
    const time = comment.time ? comment.time : props.time(new Date());
    formattedComments.push([`${date} ${time}`, comment.comment]);
  });

  const accountComments = {
    thead: [["Date", "Comment"]],
    tbody: formattedComments,
  };
  if (props.page === "Account Summary") {
    const facOptions = facilities.map((fac) => {
      return (
        <option value={fac.public} data-link={fac.link} key={uuid()}>
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
        <div className="green-blue-bg flex space-between w1080">
          <span>
            <strong>Account Comments</strong> (Add New) *{" "}
            <em>
              Use the paging controls at the bottom to see additional comments.
            </em>
          </span>
          <span>
            <strong>Filter: </strong>
            <select>
              <option>All</option>
              <option>IVR</option>
              <option>CreditLimitChange</option>
              <option>Complaint</option>
              <option>Connect Network</option>
              <option>Trust</option>
              <option>Chargeback</option>
              <option>Inquiry-Payment/Balance</option>
              <option>Inquiry-Rates</option>
              <option>Inquiry-Refund/Close Account</option>
              <option>Account Setup</option>
              <option>Block Issue</option>
              <option>Wireless Activation Team</option>
              <option>Research Team</option>
              <option>AP International Team</option>
              <option>Fax Team Update</option>
              <option>General</option>
            </select>
          </span>
        </div>
        <Table data={accountComments} page="as-comments" />
      </>
    );
  } else if (props.page === "Transactions") {
    return (
      <>
        <Adjustments />
        <div>{props.page}</div>
      </>
    );
  }
  {
    return <div>{props.page}</div>;
  }
}
