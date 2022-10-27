import React, { useState, useEffect } from "react";
import Table from "./Table";
import facilities from "../data/facilities.json";
import Linklist from "./Linklist";
import Refund from "./Refund";
import Popup1 from "./Popup1";
import Popup3 from "./Popup3";
import Popup4 from "./Popup4";
import PopupPayment from "./PopupPayment";
import { v4 as uuid } from "uuid";

function returnSelect(selectObj) {
  let index = -1;
  return (
    <span>
      {selectObj.label ? <label>{selectObj.label}</label> : null}
      <select
        data-form={selectObj.data ? selectObj.data : ""}
        disabled={selectObj.disabled}
        defaultValue={selectObj.options[selectObj.value]}
        id={selectObj.id ? selectObj.id : uuid()}
      >
        {selectObj.options.map((option) => {
          index += 1;
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

    // @todo make these show up in refunds
    const isRefundable = type[0] === "Deposit" ? "true" : "false";
    const summary =
      type[0] === "AdjustmentIncrease"
        ? "Adj Increase"
        : type[0] === "AdjustmentDecrease"
        ? "Adj Decrease"
        : type[0] === "FundsTransfer"
        ? "Funds Xfer"
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
      refundable: false,
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
  const imgItalic = `${process.env.PUBLIC_URL}/images/info_italic.png`;

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

    const blockStatus = checked.checked ? "Activated" : "Deactivated";

    if (a) {
      props.addComment({
        date: props.date,
        time: props.time(),
        filter: "general",
        comment: `Customer Block was ${blockStatus.toLowerCase()}. ${blockStatus} by new.trainee`,
        color: "black",
      });
      props.updateAccount({ block: checked.checked });
      return true;
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

  const [openPopup3, setPopup3] = useState(false);
  const [openPopup4, setPopup4] = useState(false);
  const [popup3Content, setPopup3Content] = useState();

  const formattedDeposits = [];
  const formattedCalls = [];
  let sum = 0; // track balance
  let balance = transactions.forEach((transaction) => {
    if (transaction.increase === "0") return;
    const transVal = parseFloat(transaction.amount);
    const amount = transVal * parseInt(transaction.increase);

    // create comments for transaction & call records pages
    if (props.account.account === transaction.account) {
      // todo program in tax

      const pin = transaction.inmate ? transaction.inmate.id : "111111";
      const inmateName = transaction.inmate
        ? transaction.inmate.name
        : ["unknown", "unknown"];
      const facIndex = transaction.facIndex ? transaction.facIndex : 0;
      const facility = props.facilities[facIndex];
      const subIndex = transaction.subIndex ? transaction.subIndex : 0;
      const subId = facility.subs[subIndex];
      const orig = facility.orig ? facility.orig[subIndex] : "8005551234";
      const rateIndex = transaction.rate ? transaction.rate : 5;
      const rateType = facility.rates[rateIndex];
      const minutes = transaction.duration
        ? transaction.duration[0]
        : parseFloat(transaction.amount) > 0.0
        ? parseInt(transaction.amount / rateType)
        : 0;
      const seconds = transaction.duration
        ? transaction.duration[1]
        : minutes === 15
        ? "0"
        : minutes === 0
        ? "0"
        : minutes === 60
        ? "0"
        : transaction.date[1].slice(5, 7);
      const feeIcon = `${process.env.PUBLIC_URL}/images/info_italic.png`;
      const researchIcon = `${process.env.PUBLIC_URL}/images/info_r.png`;
      const startCode = transaction.startCode
        ? transaction.startCode
        : minutes > 0
        ? "D0"
        : "D5";
      const endCode = transaction.endCode
        ? transaction.endCode
        : minutes > 0
        ? "HU"
        : "";
      const callType = transaction.callType ? transaction.callType : "H";
      const content = {
        sub: (
          <ul>
            <li>
              <strong>Full Name: </strong>
              {facility.names[subIndex]}
            </li>
            <li>
              <strong>Site ID: </strong>
              {facility.ids[subIndex]}
            </li>
            <li>
              <strong>Cost Center: </strong>
              {facility.centers[subIndex]}
            </li>
            <li>
              <strong>Inmate System: </strong>
              {facility.platform}
            </li>
            <li>
              <strong>Phone System: </strong>
              {facility.system}
            </li>
          </ul>
        ),
        pin: (
          <ul>
            <li>
              <strong>First Name: </strong>
              {inmateName[0]}
            </li>
            <li>
              <strong>Last Name: </strong>
              {inmateName[1]}
            </li>
          </ul>
        ),
        rate: (
          <table>
            <caption className="center">
              <p>
                <strong>RATES</strong>
              </p>
            </caption>
            <thead>
              <tr>
                <th>Rate Type</th>
                <th>SURCHG</th>
                <th>Rate 1st Minute</th>
                <th>INIT DUR</th>
                <th>Rate ADD'L Minute</th>
                <th>ADD'L DUR</th>
                <th>Rate Period</th>
                <th>Miles</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>InterStateInterLata</td>
                <td>0</td>
                <td>{facility.rates[rateIndex]}</td>
                <td>60</td>
                <td>{facility.rates[rateIndex]}</td>
                <td>60</td>
                <td>1</td>
                <td>0-99999</td>
              </tr>
            </tbody>
          </table>
        ),
        fees: (
          <table>
            <caption className="center">
              <p>
                <strong>Other Fees</strong>
              </p>
            </caption>
            <thead>
              <tr>
                <th>Fee Type</th>
                <th>Amount</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Account Setup Fee</td>
                <td>$0.00</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Admin Fee</td>
                <td>$0.00</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Cell Phone Fee</td>
                <td>$0.00</td>
                <td>0</td>
              </tr>
              <tr>
                <td>FUSF Admin</td>
                <td>$0.00</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Late fee</td>
                <td>$0.00</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Single Bill Fee</td>
                <td>$0.00</td>
                <td>0</td>
              </tr>
              <tr>
                <td>State Reg Fee (SCCRF)</td>
                <td>$0.00</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Validation Surcharge</td>
                <td>$0.00</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Write Off</td>
                <td>$0.00</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        ),
        D0: <span>Call Accepted</span>,
        D5: <span>Not Accepted</span>,
        HU: <span>Inmate Hungup</span>,
        CH: <span>Customer Hungup</span>,
        H: <span>Prepaid</span>,
        D: <span>Debit</span>,
        X: <span>Advance Pay One Call</span>,
        L6: <span>BNS Missing Customer Record</span>,
        BZ: <span>Busy</span>,
        TO: <span>Timeout</span>,
        L2: <span>Missing Start Code</span>,
        "01": <span>BNS Missing Customer Record</span>,
        0: <span>Free, Operator Default, Misc</span>,
        9: <span>Collect Station to Station</span>,
        87: <span>Insufficient Funds</span>,
        85: <span>Blocked</span>,
      };
      if (transaction.type === "CallUsage") {
        const handleOpenPopup3 = (e) => {
          const key = String(e.target.getAttribute("data-info"));
          setPopup3Content(content[key]);

          if (key === "rate" || key === "fees") {
            setPopup3(false);
            setPopup4(true);
          } else {
            setPopup3(e.target);
            setPopup4(false);
          }
        };

        // todo clickable codes
        // todo phone type
        // todo listen to call icon & support
        formattedCalls.unshift([
          <span>
            {transaction.date[0]} {transaction.date[1]}
          </span>,
          <span className="hover-pointer">
            <strong onClick={handleOpenPopup3} data-info="sub">
              {subId}
            </strong>
          </span>,
          <span>{orig}</span>,
          <span className="hover-pointer">
            <strong onClick={handleOpenPopup3} data-info="pin">
              {pin}
            </strong>
          </span>,
          <span>
            {minutes}m {seconds}s
          </span>,
          <span>${transaction.amount}</span>,
          <span>$0.00</span>,
          <span>${transaction.amount}</span>,
          <img
            src={feeIcon}
            className="hover-pointer"
            onClick={handleOpenPopup3}
            data-info="fees"
          />,
          <span className="hover-pointer">
            <strong onClick={handleOpenPopup3} data-info={startCode}>
              {startCode}
            </strong>
          </span>,
          <span className="hover-pointer">
            <strong onClick={handleOpenPopup3} data-info={startCode}>
              {endCode}
            </strong>
          </span>,
          <span className="hover-pointer">
            <strong onClick={handleOpenPopup3} data-info={callType}>
              {callType}
            </strong>
          </span>,
          <span className="hover-pointer">
            <strong onClick={handleOpenPopup3} data-info="rate">
              {rateIndex}
            </strong>
          </span>,
          <span>Feature Disabled</span>,
          <a href="http://hcares/csguide/default.aspx">
            <img className="hover-pointer" src={researchIcon} />
          </a>,
          ,
        ]);
      }

      if (
        (transaction.amount === "0.00" && transaction.type === "CallUsage") ||
        transaction.callType === "X" ||
        transaction.callType === "D"
      ) {
        // skip zero charge transactions
      } else {
        // update balance
        sum = amount + sum;
        // prevent a negative sign showing up for 0 dollar amounts
        sum = sum.toFixed(2) == 0.0 ? Math.abs(sum) : sum;
        formattedDeposits.unshift([
          <span>
            {transaction.date[0]} {transaction.date[1]}
          </span>,
          <span>{transaction.type}</span>,
          <span>{transaction.added}</span>,
          <span>${transVal.toFixed(2)}</span>,
          // format balance so that it has parenthesis when negative and does not show a minus sign
          <span>
            {sum.toFixed(2) >= 0.0
              ? "$" + sum.toFixed(2)
              : "($" + sum.toFixed(2) * -1 + ")"}
          </span>,
          <span
            className={
              transaction.color ? `${transaction.color}-text` : "black-text"
            }
          >
            {transaction.comment}
          </span>,
        ]);
      }
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

  const callTransactions = {
    thead: [
      [
        "Call Date",
        "Sub ID",
        "Orig",
        "PIN",
        "Duration",
        "Bill Amt",
        "Tax",
        "Total Amt",
        "Fees",
        "Start Code",
        "End Code",
        "Call Type",
        "Rate Type",
        "Phone Type",
        "Add Req",
      ],
    ],
    tbody: formattedCalls,
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
              data: "status",
              value: props.account.status,
              options: ["Active", "Return Mail", "LEC/Inactive", "Blocked"],
            })}
            {returnSelect({
              label: "Account Type: ",
              id: "as-account-type-select",
              data: "type",
              value: props.account.type,
              options: [
                "",
                "Advance Pay",
                "Direct Bill",
                "Friends and Family",
                "APOC",
              ],
            })}
            <img className="icon" src={imgItalic}></img>
            <button type="button">Show Contract Exceptions</button>
          </div>
          <div key={props.account.index + uuid()}>
            {returnSelect({
              label: "Phone Indicator: ",
              data: "indicator",
              value: props.account.indicator,
              options: [
                "Cell Phone",
                "Land Line",
                "No Override",
                "Not Indicated",
                "Block",
              ],
            })}
            <img className="icon" src={imgItalic}></img>
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
              data-form="block"
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
              <strong>Liability Limit: </strong>$
              {props.account.autoReload
                ? props.account.autoReload.credit
                : "0.00"}
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
              data-form="ccBlock"
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
        <Table
          data={accountTransactions}
          page="as-calls"
          search="true"
          message="No record(s) found."
        />
      </>
    );
  } else if (props.page === "Refund") {
    return (
      <Refund
        balance={balance}
        refundable={props.returnRefundable()}
        account={props.account}
        refund={props.refund}
        resetClosure={props.resetClosure}
      />
    );
  } else if (props.page === "Transaction Summary") {
    const result = props.transactions.reduce(
      (obj, item) => {
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
      },
      {
        Deposit: { value: 0, count: 0 },
        "Call Usage": { value: 0, count: 0 },
        Taxes: { value: 0, count: 0 },
        Fees: { value: 0, count: 0 },
        "Funds Xfer": { value: 0, count: 0 },
        "Adj Increase": { value: 0, count: 0 },
        "Adj Decrease": { value: 0, count: 0 },
        Withdrawal: { value: 0, count: 0 },
        "Ret Check": { value: 0, count: 0 },
        "Close Acct": { value: 0, count: 0 },
        "Exp Funds": { value: 0, count: 0 },
        Chargeback: { value: 0, count: 0 },
      }
    );
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
                <td>${result["Call Usage"].value.toFixed(2)}</td>
                <td>${result.Taxes.value.toFixed(2)}</td>
                <td>${result.Fees.value.toFixed(2)}</td>
                <td>${result["Funds Xfer"].value.toFixed(2)}</td>
                <td>${result["Adj Increase"].value.toFixed(2)}</td>
                <td>${result["Adj Decrease"].value.toFixed(2)}</td>
                <td>${result.Withdrawal.value.toFixed(2)}</td>
                <td>${result["Ret Check"].value.toFixed(2)}</td>
                <td>${result["Close Acct"].value.toFixed(2)}</td>
                <td>${result["Exp Funds"].value.toFixed(2)}</td>
                <td>${result.Chargeback.value.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Count: </th>
                <td>{result.Deposit.count}</td>
                <td>{result["Call Usage"].count}</td>
                <td>{result.Taxes.count}</td>
                <td>{result.Fees.count}</td>
                <td>{result["Funds Xfer"].count}</td>
                <td>{result["Adj Increase"].count}</td>
                <td>{result["Adj Decrease"].count}</td>
                <td>{result.Withdrawal.count}</td>
                <td>{result["Ret Check"].count}</td>
                <td>{result["Close Acct"].count}</td>
                <td>{result["Exp Funds"].count}</td>
                <td>{result.Chargeback.count}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } else if (props.page === "Call Records") {
    return (
      <>
        <Popup3
          visible={openPopup3}
          content={popup3Content}
          setIsOpen={setPopup3}
        />
        <Popup4
          visible={openPopup4}
          content={popup3Content}
          setIsOpen={setPopup4}
        />
        <p className="w1076 no-border">
          <strong>
            NOTE: Only billing administrators are allowed to listen to call
            recording. For advanced call recording playback features please
            select and download the recording(s) and use the stand-alone{" "}
            <a href="#">ActiveLPlayer</a> to listen to the file. For ICM calls
            please click <a href="#">here</a> to download and install the ICMV
            codec.
          </strong>
        </p>
        <Table
          data={callTransactions}
          page="as-calls"
          search="all"
          message="No record(s) found."
          hidden={true}
        />
      </>
    );
  } else if (props.page === "TAG Comments") {
    return (
      <Table
        data={{ tbody: false, thead: false }}
        page="as-calls"
        search="true"
        message="No record(s) found."
      />
    );
  } else if (props.page === "Statements") {
    return (
      <div>
        <p>
          <strong>Click on the invoice date to view customer invoice.</strong>
        </p>
        <p className="red-text">No invoice(s) found for this customer.</p>
      </div>
    );
  } else if (props.page === "Auto Reload") {
    const handleAutoReloadClick = (e) => {
      // todo change to popup2?
      const isChecked = e.target.checked;
      const a = window.confirm(
        "Are you sure you want to disable low balance auto reload?"
      );
      if (a) {
        e.target.disabled = true;
        props.cancelAutoReload();
      } else {
        e.target.checked = !isChecked;
      }
    };

    return (
      <div>
        {props.account.autoReload ? null : (
          <p className="blue-text">
            The current destination does not have auto reload configured.
          </p>
        )}
        <table className="table-auto-reload">
          <thead>
            <tr>
              <th>Reload Type</th>
              <th>Enabled</th>
              <th>LB Amount</th>
              <th>Active Date</th>
              <th>Expiration Date</th>
              <th>Cancelled Date</th>
              <th>Amount</th>
              <th>CC Number</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {props.account.autoReload ? (
                <>
                  <td>{props.account.autoReload.type}</td>
                  <td>
                    <input
                      type="checkbox"
                      defaultChecked={props.account.autoReload.enabled}
                      onClick={handleAutoReloadClick}
                    />
                  </td>
                  <td>${props.account.autoReload.lbAmount}</td>
                  <td>{props.account.autoReload.active}</td>
                  <td>{props.account.autoReload.expire}</td>
                  <td>{props.account.autoReload.cancel}</td>
                  <td>${props.account.autoReload.amount}</td>
                  <td>{props.account.autoReload.cc}</td>
                  <td>{props.account.autoReload.source}</td>
                </>
              ) : null}
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else if (props.page === "Alerts") {
    // todo: add functionality
    return (
      <div>
        <fieldset>
          <legend>Low Balance and No Account IVR Alert</legend>
          <div>
            <label>Status: </label>
            <select>
              <option>Opt In</option>
              <option>Temporary Opt Out</option>
              <option>Permanent Opt Out</option>
            </select>
          </div>
          <div>
            <label>Cancelled Date: </label>-
          </div>
          <div>
            <label>Restart Date: </label>-
          </div>
          <div>
            <label>Application Name: </label>
            <div></div>
          </div>
          <div>
            <label>Modified By: </label>
            <div></div>
          </div>
          <div>
            <label>Comment: </label>
            <div></div>
          </div>
          <div></div>
        </fieldset>
        <fieldset>
          <legend>Low Balance Text Alert</legend>
          <div>
            <label>Status: </label>
            <input type="checkbox" disabled="true" />
          </div>
          <div>
            <label>Create Date: </label>
          </div>
          <div>
            <label>Cancelled Date: </label>-
          </div>
        </fieldset>
      </div>
    );
  } else {
    return <div>{props.page}</div>;
  }
}
