import React from "react";
import { v4 as uuid } from "uuid";

function paymentInput(inputObj) {
  return (
    <div className="popup-payment-pair" key={uuid()}>
      <label>{inputObj.label}: </label>
      {inputObj.type === "select" ? (
        inputObj.select
      ) : inputObj.type === "textarea" ? (
        <textarea></textarea>
      ) : (
        <input
          id={inputObj.id ? inputObj.id : uuid()}
          type={inputObj.type ? inputObj.type : "text"}
          defaultValue={inputObj.value}
          onWheel={(e) => {
            e.target.blur();
          }}
        />
      )}
      {inputObj.extra ? <> {inputObj.extra}</> : null}
      {inputObj.required === true ? <span className="red-text"> *</span> : null}
    </div>
  );
}

export default function PopupPayment(props) {
  const FEE_PERCENTAGE = 0.0325;

  const submitDeposit = () => {
    const amount = document.querySelector("#as-cc-deposit-amount");
    const deposits = [];

    if (amount.valueAsNumber > 0) {
      const deposit = {
        account: props.account.account,
        system: "CARES",
        date: [props.date, props.time()],
        cc: ["******", "****"],
        exp: ["**", "**"],
        status: "APPROVED",
        amount: amount.valueAsNumber,
        code: [uuid(), "123456"],
        order: ["", "D1234567890"],
        reject: ["ACCEPT", "00"],
        vendor: ["ReD", "PaymenTech"],
        transaction: ["Post-Auth", "Payment"],
        tax: "",
        type: "Deposit",
        added: "CARES",
        comment: `GTL\\new.trainee: Name ${props.account.name.first} ${props.account.name.last} CCNum: ****************:`,
        refunded: "false",
        refundable: "true",
        increase: "1",
        summary: "Deposit",
      };

      if (props.fee > 0) {
        const fee1 = {
          account: props.account.account,
          system: "DepositTransactionFee",
          date: [props.date, props.time()],
          status: "APPROVED",
          amount: props.fee,
          type: "DepositTransactionFee",
          added: "CARES",
          comment: "",
          refunded: "false",
          refundable: "false",
          increase: "-1",
          summary: "Fees",
        };

        const fee2 = {
          account: props.account.account,
          system: "3rdPartyFinancialTransactionFee",
          date: [props.date, props.time()],
          status: "APPROVED",
          amount: amount.valueAsNumber * FEE_PERCENTAGE,
          type: "3rdPartyFinancialTransactionFee",
          added: "CARES",
          comment: "",
          refunded: "false",
          refundable: "false",
          increase: "-1",
          summary: "Fees",
        };

        deposits.push(fee1);
        deposits.push(fee2);
      }

      deposits.push(deposit);
      document.querySelector("#as-payment-form").reset();
      updateSystemMsg(
        "The payment went through successfully. Please wait a few minutes for it to appear on the account."
      );
      props.addTransaction(deposits);

      return false;
    } else {
      updateSystemMsg("Please enter a valid payment amount.");
      return false;
    }
  };

  const handleClose = () => {
    props.setIsOpen(false);
  };

  const handleSubmit = () => {
    const result = submitDeposit();
    if (result === true) {
      props.setIsOpen(false);
    } else {
      return;
    }
  };

  const cardName = props.account
    ? props.account.name.first + " " + props.account.name.last
    : "";

  const updateSystemMsg = (newMsg = false) => {
    const elm = document.querySelector(".system-message");
    const amount = document.querySelector("#as-cc-deposit-amount");
    const fee = props.fee + amount.valueAsNumber * FEE_PERCENTAGE;
    let msg = newMsg.target ? false : newMsg;

    if (msg === false) {
      if (amount.valueAsNumber > 0) {
        msg = `<p>Total service charge will be: $${fee.toFixed(2)}.</p>`;
      } else {
        msg =
          "<p>A valid non-zero amount is required to check the service fee.</p>";
      }
    }

    elm.innerHTML = `
      <div>
        <u>SYSTEM MESSAGE(S):</u>
        <p>${msg}</p>
      </div>`;
  };
  const serviceFee = (
    <a href="#" onClick={updateSystemMsg}>
      Check Service Fee
    </a>
  );
  const countrySelect = (
    <select>
      <option key="country-usa">USA</option>
    </select>
  );

  const otherCountry = (
    <select>
      <option key="other-country-none"></option>
    </select>
  );

  const cardType = (
    <select>
      <option key="card-type-visa">Visa</option>
      <option key="card-type-mc">MasterCard</option>
    </select>
  );

  const zeroToTwelve = (function () {
    const options = [];

    for (let i = 0; i <= 12; i += 1) {
      if (i === 0) {
        options.push(<option key={uuid()}></option>);
        continue;
      }
      options.push(<option key={uuid()}>{i > 9 ? i : "0" + i}</option>);
    }

    return <select>{options}</select>;
  })();

  const years = (function () {
    const options = [<option key="years_blank"></option>];

    for (let i = 0; i <= 9; i += 1) {
      let date = new Date();
      date.setDate(date.getDate() + 365 * i);
      options.push(<option key={uuid()}>{date.getFullYear()}</option>);
    }

    return <select>{options}</select>;
  })();

  const items = [
    {
      label: "Amount",
      value: "",
      type: "number",
      required: true,
      id: "as-cc-deposit-amount",
    },
    {
      label: "Service Fee",
      value: "",
      type: "checkbox",
      extra: serviceFee,
    },
    { label: "Name on Card", value: cardName, required: true },
    { label: "Address", value: props.account.address.one, required: true },
    { label: "City", value: props.account.address.city, required: true },
    { label: "Country", type: "select", select: countrySelect },
    { label: "Other Country", type: "select", select: otherCountry },
    { label: "State", value: props.account.address.state, required: true },
    { label: "Zip Code", value: props.account.address.zip, required: true },
    { label: "Card Type", type: "select", select: cardType, required: true },
    {
      label: "Card Exp Date",
      type: "select",
      select: zeroToTwelve,
      required: true,
      extra: years,
    },
    { label: "Security Code", value: "", required: true },
    { label: "Comment", type: "textarea" },
  ];

  return props.visible ? (
    <div className="popup-payment">
      <div className="flex flex-end">
        <button type="button" onClick={handleClose}>
          x
        </button>
      </div>
      <form id="as-payment-form">
        <fieldset>
          <legend>CREDIT CARD PAYMENT</legend>
          <span>
            You are about to make a credit card payment from the account{" "}
            <strong>{props.account.account}</strong>. If this is correct,
            complete all required fields and click on "Submit". Otherwise click
            on "Cancel" to close this window.
          </span>
          <span className="system-message"></span>
          <div>{items.map((item) => paymentInput(item))}</div>
          <div>
            <span className="red-text">*</span>{" "}
            <em>- denotes required field.</em>
          </div>
        </fieldset>
        <div className="flex flex-end gap-large">
          <button type="button" className="wide-padding" onClick={handleSubmit}>
            Submit
          </button>
          <button type="reset" className="wide-padding">
            Reset
          </button>
          <button type="button" className="wide-padding" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  ) : null;
}
