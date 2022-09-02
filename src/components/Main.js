import React, { useEffect } from "react";
import Table from "./Table";
import facilities from "../data/facilities.json";
import Adjustments from "./Adjustments";
import { v4 as uuid } from "uuid";

export default function Main(props) {
  const transactions = props.transactions.filter(
    (transaction) => transaction.account === props.account.account
  );

  const balance = transactions
    .reduce(
      (sum, transaction) =>
        transaction.type === "Deposit"
          ? parseFloat(transaction.amount) + sum
          : sum,
      0
    )
    .toFixed(2);

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

  const formattedComments = props.account.comments.length > 0 ? [] : false;

  props.account.comments.forEach((comment) => {
    const date = comment.date ? comment.date : props.date;
    const time = comment.time ? comment.time : props.time(new Date());
    const fontColor = `${comment.color}-text`;
    formattedComments.unshift([
      <span className={fontColor}>
        {date} {time}
      </span>,
      <span className={fontColor}>{comment.comment}</span>,
    ]);
  });

  const accountComments = {
    thead: [["Date", "Comment"]],
    tbody: formattedComments,
  };
  if (props.page === "Account Summary") {
    return (
      <>
        <Adjustments />
        <div className="flex-groups">
          <div key={props.account.index}>
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
          <div key={props.account.index + 1}>
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
          <span key={props.account.index + 2}>
            <label>Customer Block Requested: </label>{" "}
            <input type="checkbox" defaultChecked={props.account.block} />
          </span>
          <div key={props.account.index + 3}>
            <p>
              <strong>Available: </strong>${balance}
            </p>
            <p>
              <strong>Ledger: </strong>${balance}
            </p>
            <p>
              <strong>Hold Amount: </strong>
              <a href="#">$0.00</a>
            </p>
            <p>
              <strong>Liability Limit: </strong>$0.00
            </p>
          </div>
          <div key={props.account.index + 4}>
            {returnSelect({
              label: "Send Bill: ",
              options: ["No Export"],
              disabled: true,
            })}
            <select
              defaultValue={
                facilities[props.account.facility ? props.account.facility : 0]
                  .public
              }
            >
              {facilities.map((fac) => {
                return (
                  <option value={fac.public} data-link={fac.link} key={uuid()}>
                    {fac.public}
                  </option>
                );
              })}
            </select>
            <button
              type="button"
              onClick={function (e) {
                console.log(e.target.closest("div select"));
              }}
            >
              View Rates
            </button>
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
