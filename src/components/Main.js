import React, { useState, useEffect } from "react";
import Table from "./Table";
import facilities from "../data/facilities.json";
import Linklist from "./Linklist";
import Refund from "./Refund";
import Popup1 from "./Popup1";
import PopupPayment from "./PopupPayment";
import { v4 as uuid } from "uuid";

function returnSelect(selectObj) {
  return (
    <span>
      {selectObj.label ? <label>{selectObj.label}</label> : null}
      <select
        disabled={selectObj.disabled}
        defaultValue={selectObj.options[selectObj.value]}
        id={selectObj.id ? selectObj.id : uuid()}
      >
        {selectObj.options.map((option) => {
          return <option key={uuid()}>{option}</option>;
        })}
      </select>
    </span>
  );
}

function Comments(props) {
  const [isOpen, setIsOpen] = useState(false);

  const addComment = () => {
    // opens the Add Comment popup menu
    if (props.account) {
      /* todo popup2 */
      const msg =
        "Please enter a phone number and select a valid account type to add account comment.";
      alert(msg);
      return;
    }

    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    // allows comments to be added
    const popup = document.querySelector("[data-popup='comment']");
    const select = popup.querySelector("select");
    const comment = document.querySelector("#as-comment");

    if (select.value === "") {
      alert("Please select a valid comment type.");
      return false;
    }

    if (comment.value === "") {
      props.updateAlert(
        "A comment is required when adding a new comment.",
        "red-text bold-text"
      );
    } else {
      const date = new Date();
      const newComment = {
        date: props.date,
        time: props.time(date),
        filter: select.value,
        comment: "new.trainee " + comment.value,
        color: "black",
      };
      props.addComment(newComment);
    }

    return true;
  };

  const top = returnSelect({
    label: "Comment Type: ",
    options: [
      "",
      "IVR",
      "CreditLimitChange",
      "Complaint",
      "Connect Network",
      "Trust",
      "Chargeback",
      "Inquiry-Payment/Balance",
      "Inquiry-Rates",
      "Inquiry-Refund/Close Account",
      "Account Setup",
      "Block Issue",
      "Wireless Activation Team",
      "Research Team",
      "AP International Team",
      "Fax Team Update",
      "General",
    ],
  });

  const content = (
    <div className="input-group-row gap-large">
      <p>Comment: </p>
      <textarea id="as-comment"></textarea>
    </div>
  );

  const contentObj = {
    top: top,
    content: content,
    submit: "Add Comment",
    onSubmit: handleSubmit,
    type: "comment",
    style: "comments",
  };

  return (
    <>
      <Popup1
        visible={isOpen}
        content={content}
        setIsOpen={setIsOpen}
        contentObj={contentObj}
      />
      <div className="green-blue-bg flex space-between w1080">
        <span>
          <strong>Account Comments</strong> (
          <span onClick={addComment} className="hover-pointer">
            Add New
          </span>
          ) *{" "}
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
    </>
  );
}

function Adjustments(props) {
  const [isOpenPayment, setOpenPayment] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(0);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;

    if (isNaN(value)) {
      // prevent letters
      let newVal = [...value];
      newVal.pop();
      newVal = newVal.join("");
      e.target.value = newVal;

      return;
    }
  };

  const handleDeposit = () => {
    const date = new Date();
    const time = props.time(date);
    const amount = document.querySelector("#as-adjustment-amount").value;
    const comment = document.querySelector("#as-adjustment-comment").value;

    const deposits = [];

    const type = document
      .querySelector("[data-adjustment-type]")
      .getAttribute("data-adjustment-type")
      .split(",");

    if (type[0] === "FundsTransfer") {
      const acc = document.querySelector("#as-adjustment-account").value;
      const accType = document.querySelector(
        "#as-adjustment-accountType"
      ).value;

      if (acc === "" || !accType) {
        alert("Please enter a valid account to transfer the fund to.");
        return false;
      }

      deposits.push({
        account: acc,
        system: "adjustment",
        date: [props.date, time],
        amount: amount,
        type: "AdjustmentIncrease",
        added: "new.trainee",
        comment: comment,
        refunded: "false",
        refundable: "false",
        increase: "1",
        summary: "Adj Increase",
      });
    }

    const isRefundable = type[0] === "Deposit" ? "true" : "false";
    const summary =
      type[0] === "AdjustmentIncrease"
        ? "Adj Increase"
        : type[0] === "AdjustmentDecrease"
        ? "Adj Decrease"
        : type[0] === "ReturnedCheck"
        ? "Ret Check"
        : type[0];
    deposits.push({
      account: props.account,
      system: "adjustment",
      date: [props.date, time],
      amount: amount,
      type: type[0],
      added: "new.trainee",
      comment: comment,
      refunded: "false",
      refundable: isRefundable,
      increase: type[1],
      summary: summary,
    });

    const result = props.addTransaction(deposits);
    return true;
  };

  const handleClick = (contentIndex) => {
    if (props.account === "") {
      alert(
        "Please enter a valid account number and click on /'Lookup/' before attempting this action."
      );

      return;
    }

    if (contentIndex === 0) {
      setOpenPayment(true);
      return;
    } else {
      setContent(contentIndex);
      setIsOpen(true);
    }
  };

  const controls = [
    {
      link: "#",
      label: "CC Deposit |",
      click: function () {
        handleClick(0);
      },
    },
    {
      link: "#",
      label: "Other Deposit |",
      click: function () {
        handleClick(1);
      },
      popup: {
        style: "adjustment",
        top: <label>Deposit </label>,
        content: (
          <>
            <div data-adjustment-type="Deposit,1">
              <select className="margin-left">
                <option>Money Gram</option>
                <option>Kiosk</option>
                <option>Lockbox</option>
                <option>Money Order</option>
                <option>Personal Check</option>
                <option>Tele-Check</option>
                <option>Western Union</option>
              </select>
            </div>
            <div className="margin-left">
              <span>
                <input type="checkbox" />
                <small>Apply Service Fee</small>
              </span>
            </div>
            <div>
              <label>Amount </label>
              <input
                type="text"
                id="as-adjustment-amount"
                data-adjustment-deposit="true"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label>Comment </label>
              <textarea id="as-adjustment-comment"></textarea>
            </div>
          </>
        ),
        onSubmit: handleDeposit,
        submit: "Add Transaction",
        other: <button>View Service Fee</button>,
      },
    },
    {
      link: "#",
      label: "Withdrawal |",
      click: function () {
        handleClick(2);
      },
      popup: {
        style: "adjustment bg-blue",
        top: <label>Withdrawal </label>,
        content: (
          <>
            <div data-adjustment-type="Withdrawal,-1">
              <label>Amount </label>
              <input
                type="text"
                id="as-adjustment-amount"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label>Comment </label>
              <textarea id="as-adjustment-comment"></textarea>
            </div>
          </>
        ),
        onSubmit: handleDeposit,
        submit: "Add Transaction",
      },
    },
    {
      link: "#",
      label: "Funds Transfer |",
      click: function () {
        handleClick(3);
      },
      popup: {
        style: "adjustment bg-purple",
        top: <label>Funds Transfer </label>,
        content: (
          <>
            <div data-adjustment-type="FundsTransfer,-1">
              <label>Amount </label>
              <input
                type="text"
                id="as-adjustment-amount"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label>Comment </label>
              <textarea id="as-adjustment-comment"></textarea>
            </div>
          </>
        ),
        extra: (
          <fieldset>
            <legend>Transfer Fund To</legend>
            <div>
              <label>Account Number </label>
              <input
                type="text"
                id="as-adjustment-account"
                onChange={handleChange}
              ></input>
            </div>
            <label>Account Type </label>
            <select id="as-adjustment-accountType">
              <option></option>
              <option>Advance Pay</option>
              <option>Direct Bill</option>
              <option>Friends and Family</option>
              <option>APOC</option>
            </select>
          </fieldset>
        ),
        onSubmit: handleDeposit,
        submit: "Add Transaction",
      },
    },
    {
      link: "#",
      label: "Adj Increase |",
      click: function () {
        handleClick(4);
      },
      popup: {
        style: "adjustment bg-green",
        top: <label>Adjustment Increase </label>,
        content: (
          <>
            <div data-adjustment-type="AdjustmentIncrease,1">
              <label>Amount </label>
              <input
                type="text"
                id="as-adjustment-amount"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label>Comment </label>
              <textarea id="as-adjustment-comment"></textarea>
            </div>
          </>
        ),
        onSubmit: handleDeposit,
        submit: "Add Transaction",
      },
    },
    {
      link: "#",
      label: "Adj Decrease |",
      click: function () {
        handleClick(5);
      },
      popup: {
        style: "adjustment bg-maroon",
        top: <label>Adjustment Decrease </label>,
        content: (
          <>
            <div data-adjustment-type="AdjustmentDecrease,-1">
              <label>Amount </label>
              <input
                type="text"
                id="as-adjustment-amount"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label>Comment </label>
              <textarea id="as-adjustment-comment"></textarea>
            </div>
          </>
        ),
        onSubmit: handleDeposit,
        submit: "Add Transaction",
      },
    },
    {
      link: "#",
      label: "Chargeback |",
      click: function () {
        handleClick(6);
      },
      popup: {
        style: "adjustment bg-red",
        top: <label>Chargeback </label>,
        content: (
          <>
            <div data-adjustment-type="Chargeback,-1">
              <label>Amount </label>
              <input
                type="text"
                id="as-adjustment-amount"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label>Comment </label>
              <textarea id="as-adjustment-comment"></textarea>
            </div>
          </>
        ),
        onSubmit: handleDeposit,
        submit: "Add Transaction",
      },
    },
    {
      link: "#",
      label: "Ret Check",
      click: function () {
        handleClick(7);
      },
      popup: {
        style: "adjustment bg-orange",
        top: <label>Returned Check </label>,
        content: (
          <>
            <div data-adjustment-type="ReturnedCheck,-1">
              <label>Amount </label>
              <input
                type="text"
                id="as-adjustment-amount"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label>Comment </label>
              <textarea id="as-adjustment-comment"></textarea>
            </div>
          </>
        ),
        onSubmit: handleDeposit,
        submit: "Add Transaction",
      },
    },
  ];

  return (
    <div className="no-border">
      <PopupPayment
        account={props.accountInfo}
        visible={isOpenPayment}
        setIsOpen={setOpenPayment}
        fee={props.fee}
        addTransaction={props.addTransaction}
        date={props.date}
        time={props.time}
      />
      <Popup1
        visible={isOpen}
        setIsOpen={setIsOpen}
        contentObj={controls[content].popup}
      />
      <span id="adjustment-controls" className="no-link" key={uuid()}>
        <Linklist
          links={controls}
          propClass="flex tiny-pad"
          childClass="no-pad"
          start="Add ("
          end=")"
        />
      </span>
    </div>
  );
}

export default function Main(props) {
  const transactions = props.transactions.filter(
    (transaction) => transaction.account === props.account.account
  );

  const onCxBlock = (e) => {
    if (props.index === 0) {
      e.preventDefault();
      return;
    }
    const checked = e.target;
    const msg = checked.checked
      ? `Advise the customer that blocking their phone number will not allow them to receive any calls from any facility serviced by GTL. Make sure they wish to continue before activating the block.`
      : `Advise the customer that unblocking their phone number will allow them to receive any calls from any facility serviced by GTL. Make sure they wish to continue before deactivating the block.`;

    const a = window.confirm(msg);

    if (a) {
      props.updateAccount({ block: checked.checked });
    } else {
      checked.checked = !checked.checked;
    }
  };

  const onCcBlock = (e) => {
    if (props.index === 0) {
      e.preventDefault();
      return;
    }
    const checked = e.target;
    const msg = checked.checked
      ? `Are you sure you want to unblock credit card payment for the current account?`
      : `Are you sure you want to block credit card payment for the current account?`;

    const a = window.confirm(msg);

    if (a) {
      props.updateAccount({ ccBlock: checked.checked });
    } else {
      checked.checked = !checked.checked;
    }
  };

  const formattedDeposits = [];
  let sum = 0; // track balance
  let balance = transactions.forEach((transaction) => {
    if (transaction.increase === "0") return;
    const transVal = parseFloat(transaction.amount);
    const amount = transVal * parseInt(transaction.increase);

    // update balance
    sum = amount + sum;

    // create comments for transaction page
    if (props.account.account === transaction.account) {
      formattedDeposits.unshift([
        <span>
          {transaction.date[0]} {transaction.date[1]}
        </span>,
        <span>{transaction.type}</span>,
        <span>{transaction.added}</span>,
        <span>${transVal.toFixed(2)}</span>,
        // format balance so that it has parenthesis when negative and does not show a minus sign
        <span>
          {sum >= 0 ? "$" + sum.toFixed(2) : "($" + sum.toFixed(2) * -1 + ")"}
        </span>,
        <span
          className={
            transaction.fontColor ? transaction.fontColor : "black-text"
          }
        >
          {transaction.comment}
        </span>,
      ]);
    }
  });
  balance = sum.toFixed(2);

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

  const accountTransactions = {
    thead: [["Date", "Type", "Added By", "Amount", "Balance", "Comment"]],
    tbody: formattedDeposits,
  };

  if (props.page === "Account Summary") {
    return (
      <>
        <Adjustments
          addTransaction={props.addTransaction}
          account={props.account.account}
          accountInfo={props.account}
          time={props.time}
          date={props.date}
          fee={props.fee}
        />
        <div className="flex-groups">
          <div key={props.account.index + uuid()}>
            {returnSelect({
              value: props.account.status,
              options: ["Active", "Return Mail", "LEC/Inactive", "Blocked"],
            })}
            {returnSelect({
              label: "Account Type: ",
              id: "as-account-type-select",
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
          <div key={props.account.index + uuid()}>
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
            <input
              type="checkbox"
              defaultChecked={props.account.block}
              onClick={onCxBlock}
            />
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
          <div key={props.account.index + uuid()}>
            {returnSelect({
              label: "Send Bill: ",
              options: ["No Export"],
              disabled: true,
            })}
            <select
              id="as-facility-rates"
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
              onClick={function () {
                const rates = document.querySelector("#as-facility-rates");
                const options = rates.querySelectorAll("[data-link]");
                options.forEach((option) => {
                  if (option.value === rates.value) {
                    const hyperlink = option.getAttribute(["data-link"]);
                    window.open(hyperlink, "_blank", "resizable=yes");
                  }
                });
              }}
            >
              View Rates
            </button>
          </div>
          <span key={props.account.index + 4}>
            <label>Credit Card Block: </label>{" "}
            <input
              type="checkbox"
              defaultChecked={props.account.ccBlock}
              onClick={onCcBlock}
            />
          </span>
        </div>
        <Table data={props.data} page={props.page} />
        <Comments
          updateAlert={props.updateAlert}
          account={props.account.account === "" ? true : false}
          addComment={props.addComment}
          date={props.date}
          time={props.time}
        />
        <Table data={accountComments} page="as-comments" />
      </>
    );
  } else if (props.page === "Transactions") {
    return (
      <>
        <Adjustments
          addTransaction={props.addTransaction}
          account={props.account.account}
          accountInfo={props.account}
          time={props.time}
          date={props.date}
          fee={props.fee}
        />
        <Table data={accountTransactions} page="as-comments" />
      </>
    );
  } else if (props.page === "Refund") {
    return (
      <Refund
        balance={balance}
        refundable={props.returnRefundable()}
        account={props.account}
      />
    );
  } else if (props.page === "Transaction Summary") {
    const result = props.transactions.reduce((obj, item) => {
      // if the item doesn't match the account, skip it
      if (item.account !== props.account.account) return obj;

      // if the item isn't meant for the account summary page, skip it
      if (!item.summary) return obj;

      // if the item doesn't exist in the summary, add it
      if (!obj[item.summary]) {
        obj[item.summary] = { count: 0, value: 0 };
      }

      // update the values
      obj[item.summary].count++;
      obj[item.summary].value += parseFloat(item.amount);

      return obj;
    }, {});
    return (
      <div>
        <div>
          <strong>Account Transaction Summary</strong>
          <table className="basic-table">
            <thead>
              <tr>
                <th></th>
                <th>Deposit</th>
                <th>Call Usage</th>
                <th>Taxes</th>
                <th>Fees</th>
                <th>Funds Xfer</th>
                <th>Adj Increase</th>
                <th>Adj Decrease</th>
                <th>Withdrawal</th>
                <th>Ret Check</th>
                <th>Close Acct</th>
                <th>Exp Funds</th>
                <th>Chargeback</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Amount: </th>
                <td>${result.Deposit.value.toFixed(2)}</td>
                <td>${result.Deposit.value.toFixed(2)}</td>
                <td>${result.Deposit.value.toFixed(2)}</td>
                <td>${result.Deposit.value.toFixed(2)}</td>
                <td>${result.Deposit.value.toFixed(2)}</td>
                <td>${result.Deposit.value.toFixed(2)}</td>
                <td>${result.Deposit.value.toFixed(2)}</td>
                <td>${result.Deposit.value.toFixed(2)}</td>
                <td>${result.Deposit.value.toFixed(2)}</td>
                <td>${result.Deposit.value.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Count: </th>
                <td>{result.Deposit.count}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  {
    return <div>{props.page}</div>;
  }
}
