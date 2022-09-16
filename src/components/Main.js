import React, { useState, useEffect } from "react";
import Table from "./Table";
import facilities from "../data/facilities.json";
import Linklist from "./Linklist";
import Popup1 from "./Popup1";
import { v4 as uuid } from "uuid";

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
    const amount = document.querySelector("#as-adjustment-amount").value;
    const date = new Date();
    const time = props.time(date);
    const type = document.querySelector("[data-adjustment-type]");

    const deposit = {
      account: props.account,
      system: "deposit",
      date: [props.date, time],
      cc: "false",
      exp: "false",
      status: "APPROVED",
      amount: amount,
      code: ["709002200200CG20220605151519501", "005165"],
      order: ["", "D1067342319"],
      reject: ["ACCEPT", "00"],
      vendor: ["ReD", "PaymenTech"],
      transaction: ["Post-Auth", "Payment"],
      tax: "0.00",
      type: "Deposit",
      added: "InContactMainAdvancePayIVR",
      comment: "",
      refunded: "false",
      refundable: "true",
    };

    const result = props.addTransaction(deposit);
    console.log(result);
  };

  const handleClick = (contentIndex) => {
    if (props.account === "") {
      alert(
        "Please enter a valid account number and click on /'Lookup/' before attempting this action."
      );

      return;
    }

    setContent(contentIndex);
    setIsOpen(true);
  };

  const controls = [
    {
      link: "#",
      label: "CC Deposit |",
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
            <div data-adjustment-type="deposit">
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
              <textarea data-adjustment-comment="comment"></textarea>
            </div>
          </>
        ),
        other: (
          <div className="margin-left">
            <button onClick={handleDeposit}>Add Transaction</button>{" "}
            <button>View Service Fee</button>
          </div>
        ),
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
            <div>
              <label>Amount </label>
              <input
                type="text"
                id="as-adjustment-amount"
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label>Comment </label>
              <textarea></textarea>
            </div>
          </>
        ),
        other: (
          <div className="margin-left">
            <button onClick={handleDeposit}>Add Transaction</button>{" "}
          </div>
        ),
      },
    },
    {
      link: "#",
      label: "Funds Transfer |",
    },
    {
      link: "#",
      label: "Adj Increase |",
    },
    {
      link: "#",
      label: "Adj Decrease |",
    },
    {
      link: "#",
      label: "Chargeback |",
    },
    {
      link: "#",
      label: "Ret Check",
    },
  ];

  /* 
    todo
    useState controls whether popup is visible. I need to write state to control the 
    content variables depending on what adjustment link was last clicked
  */
  return (
    <div className="no-border">
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

  const balance = transactions
    .reduce(
      (sum, transaction) =>
        transaction.type === "Deposit"
          ? parseFloat(transaction.amount) + sum
          : sum,
      0
    )
    .toFixed(2);

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
        <Adjustments
          addTransaction={props.addTransaction}
          account={props.account.account}
          time={props.time}
          date={props.date}
        />
        <div className="flex-groups">
          <div key={props.account.index + uuid()}>
            {returnSelect({
              value: props.account.status,
              options: ["Active", "Return Mail", "LEC/Inactive", "Blocked"],
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
          <div key={props.account.index + uuid()}>
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
          <span key={props.account.index + 4}>
            <label>Credit Card Block: </label>{" "}
            <input type="checkbox" defaultChecked={props.account.ccBlock} />
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
        <Adjustments />
        <div>{props.page}</div>
      </>
    );
  }
  {
    return <div>{props.page}</div>;
  }
}
