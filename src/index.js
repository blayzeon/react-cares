import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import accountData from "./data/accounts.json";
import transactionData from "./data/transactions.json";
import facilities from "./data/facilities.json";
import firstNames from "./data/firstNames.json";
import lastNames from "./data/lastNames.json";
import streetNames from "./data/streetNames.json";
import address from "./data/cityStateZip.json";
import adjectives from "./data/adjectives.json";
import nouns from "./data/nouns.json";

const root = ReactDOM.createRoot(document.getElementById("root"));
const accounts = accountData;
const transactions = transactionData;

function returnRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function returnMixedInt(seed, minDigit = 0, maxDigit = 9999) {
  let result = seed;
  while (result > maxDigit) {
    result = result * 0.5;
  }

  result = parseInt(result);

  while (result < minDigit) {
    result = result * 2;
  }

  if (result < maxDigit) {
    return result;
  } else {
    return minDigit;
  }
}

// todo - have cc refunds show in cc auths and not disappear
const date = new Date();
const formatDate = (date) => {
  return date.toLocaleDateString({
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
function getPreviousDate(daysBack = 1, date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - daysBack);

  return previous;
}

function getFutureDate(daysBack = 1, date = new Date()) {
  const future = new Date(date.getTime());
  future.setDate(date.getDate() + daysBack);

  return future;
}

const formattedDate = formatDate(date);

const formatTime = (d = date) => {
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let seconds = d.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  const strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return strTime;
};

function generateData(index, account, type) {
  function sliceNum(numberToSlice, firstIndex, secondIndex) {
    const num = numberToSlice;
    const lastDigit2Str = secondIndex
      ? String(num).slice(firstIndex, secondIndex)
      : String(num).slice(firstIndex);
    const lastDigit2Num = Number(lastDigit2Str);
    return parseInt(lastDigit2Num);
  }

  const lastIndex = sliceNum(index, -1);
  const seed = parseInt(lastIndex) * date.getDate();

  const generateEmailAddress = (name = false) => {
    const adjIndex = adjectives[seed] ? seed : lastIndex;
    const nounsIndex = nouns[seed] ? seed : lastIndex;
    const emailNumber = seed;
    let generatedEmail = `${adjectives[adjIndex]}.${nouns[nounsIndex]}${emailNumber}`;

    if (name) {
      generatedEmail =
        index % 2 === 0 ? `${name[0]}.${name[1]}` : generatedEmail;
    } else {
      generatedEmail = false;
    }

    return generatedEmail === false
      ? ""
      : `${generatedEmail.toLowerCase()}@customer.com`;
  };

  const daysBack =
    type === "broken"
      ? 180
      : type === "established"
      ? returnMixedInt(index, 2, 7)
      : returnMixedInt(index, 1, 3);
  const oldDate = getPreviousDate(daysBack);
  const creationDate = formatDate(oldDate);
  const expireDate = getFutureDate(180, oldDate);
  const formattedExpireDate = formatDate(expireDate);
  const streets = streetNames;
  const lec = [
    "",
    "ASTRO TELECOMM LLC",
    "123 NET INC.",
    "SPRINT SPECTRUM L.P.",
    "NEW CINGULAR WIRELESS",
    "MCIMETRO ATS LLC",
    "",
  ];
  const fNameIndex = returnMixedInt(index, 0, firstNames.length - 1);
  const lNameIndex = returnMixedInt(index, 0, lastNames.length - 1);
  const addressIndex = returnMixedInt(index, 0, address.length);
  const passcode = sliceNum(account, 5, -1);
  const depositAmt = returnMixedInt(index, 15, 50);
  const facIndex = returnMixedInt(index, 1, facilities.length);
  const rate = returnMixedInt(index, 5, 7);
  const fee =
    facilities[facIndex].fees[0] === 0
      ? "0.00"
      : facilities[facIndex].fees[0] + depositAmt * 0.0325;
  const depositTotal = depositAmt - fee;

  let newAccount = {
    index: index,
    account: account,
    name: {
      first: "",
      last: "",
    },
    address: {
      one: "",
      two: "",
      zip: "",
      city: "",
      state: "",
    },
    phone: {
      one: "",
      two: "",
    },
    email: "",
    tax: "",
    ivrPc: "",
    exempt: false,
    notes: "",
    au: "",
    lec: lec[returnMixedInt(index, 0, lec.length)],
    facility: 0,
    facilities: [],
    policies: {
      cell: false,
      fees: false,
      exp90: false,
      exp180: false,
    },
    status: 0,
    block: false,
    ccBlock: false,
    type: 0,
    created: false,
    indicator: 3,
    comments: [],
  };

  const partial = {
    name: {
      first: firstNames[fNameIndex],
      last: lastNames[lNameIndex],
    },
    address: {
      one: `${returnMixedInt(index, 111, 9999)} ${
        streets[returnMixedInt(index, 0, streets.length)]
      }`,
      two: "",
      zip: address[addressIndex].zip,
      city: address[addressIndex].city,
      state: address[addressIndex].state,
    },
    phone: {
      one: account,
      two: "",
    },
    email: generateEmailAddress([
      firstNames[fNameIndex],
      lastNames[lNameIndex],
    ]),
    created: true,
    type: 1,
  };

  const randomHour = returnMixedInt(index, 1, 11);
  const randomMinute = returnMixedInt(index, 11, 34);
  const randomSecond = returnMixedInt(index, 10, 49);
  const established = {
    ...partial,
    ...{
      ivrPc: passcode,
      policies: {
        cell: true,
        fees: true,
        exp90: false,
        exp180: true,
      },
      facility: facIndex,
      comments: [
        {
          date: creationDate,
          time: `${randomHour}:${randomMinute - 1}:${randomSecond} PM`,
          filter: "general",
          comment: "CARES User kristine.carter accessed account.",
          color: "black",
        },
        {
          date: creationDate,
          time: `${randomHour}:${randomMinute + 5}:${randomSecond + 5} PM`,
          filter: "general",
          comment: `kristine.carter updated the account attribute for PCCellPhone to true.`,
          color: "red",
        },
        {
          date: creationDate,
          time: `${randomHour}:${randomMinute + 5}:${randomSecond + 7} PM`,
          filter: "general",
          comment: `kristine.carter updated the account attribute for PCServiceFees to true.`,
          color: "red",
        },
        {
          date: creationDate,
          time: `${randomHour}:${randomMinute + 5}:${randomSecond + 9} PM`,
          filter: "general",
          comment: `kristine.carter updated the account attribute for PC180DaysAccountExpiration to true.`,
          color: "red",
        },
        {
          date: creationDate,
          time: `${randomHour}:${randomMinute + 6}:${randomSecond + 3} PM`,
          filter: "general",
          comment: `kristine.carter cx ${firstNames[fNameIndex]} ${
            lastNames[lNameIndex]
          } ci to create acc / pc ${passcode} / pay $${depositAmt} / nb $${depositTotal.toFixed(
            2
          )}`,
          color: "red",
        },
      ],
    },
  };

  const first5 = returnMixedInt(index, 1111, 9999);
  const first1 = returnMixedInt(index, 1111, 9999) === 0 ? "5" : "4";
  const first6 = first1.toString() + first5.toString();
  const last4 = returnMixedInt(index, 1111, 9999);
  const futureDate = new Date();
  const inmate = {
    id: returnMixedInt(index, 111111, 99999999),
    name: [
      firstNames[returnMixedInt(index, 0, firstNames.length)],
      lastNames[returnMixedInt(index, 0, lastNames.length)],
    ],
  };
  futureDate.setDate(date.getDate() + 365);
  if (type === "broken" || type === "established") {
    // add transactions to the account

    const newTransactions = [
      {
        account: account,
        system: "CARES",
        date: [
          creationDate,
          `${randomHour}:${randomMinute}:${returnMixedInt(index, 10, 59)} PM`,
        ],
        status: "APPROVED",
        amount: "0.00",
        type: "NewAccount",
        added: "kristine.carter",
        comment: "",
        refunded: "true",
        refundable: "false",
        increase: "1",
        summary: false,
      },
      {
        account: account,
        system: "CARES",
        date: [
          creationDate,
          `${randomHour}:${randomMinute + 1}:${randomSecond} PM`,
        ],
        cc: [first6, last4],
        exp: [
          `0${returnMixedInt(index, 1, 9)}`,
          futureDate.getFullYear().toString().slice(-2),
        ],
        status: "APPROVED",
        amount: depositAmt.toFixed(2),
        code: [
          returnMixedInt(index, 1111111111111, 9999999999999),
          returnMixedInt(index, 111111, 999999),
        ],
        order: [`D${returnMixedInt(index, 1111111111, 9999999999)}`, ""],
        reject: ["ACCEPT", "00"],
        vendor: ["ReD", "PaymenTech"],
        transaction: ["Post-Auth", "Payment"],
        type: "Deposit",
        added: "kristine.carter",
        comment: `GTL\\kristine.carter: Name ${firstNames[fNameIndex]} ${lastNames[lNameIndex]} CCNum: ${first6}******${last4}:`,
        refunded: "false",
        refundable: "true",
        increase: "1",
        summary: "Deposit",
        color: "red",
      },
    ];

    if (fee > 0 || fee !== "0.00") {
      newTransactions.push({
        account: account,
        date: [
          creationDate,
          `${randomHour}:${randomMinute + 1}:${
            randomSecond + returnMixedInt(index, 1, 10)
          } PM`,
        ],
        system: "DepositTransactionFee",
        amount: facilities[facIndex].fees[0],
        type: "DepositTransactionFee",
        added: "CARES",
        comment: "",
        refunded: "false",
        refundable: "false",
        increase: "-1",
        summary: "Fees",
      });

      newTransactions.push({
        account: account,
        date: [
          creationDate,
          `${randomHour}:${randomMinute + 1}:${
            randomSecond + returnMixedInt(index, 1, 10)
          } PM`,
        ],
        system: "DepositTransactionFee",
        amount: depositAmt * 0.0325,
        type: "3rdPartyFinancialTransactionFee",
        added: "CARES",
        comment: "",
        refunded: "false",
        refundable: "false",
        increase: "-1",
        summary: "Fees",
      });
    }

    transactions.push(...newTransactions);

    // add calls to the account
    const hour = returnMixedInt(index, 1, 9);
    let callMinute = returnMixedInt(index, 1, 30);
    let totalCallCost = 0;
    let newDuration = sliceNum(index, -2);
    newDuration = newDuration > 15 ? 14 : newDuration;
    const seconds = (i) => `${i + 1}${lastIndex}`;
    for (let i = 0; i < returnMixedInt(index, 1, 3); i += 1) {
      const duration = newDuration + i;
      const amount = facilities[facIndex].rates[rate - 1] * duration;
      transactions.push({
        account: account,
        system: "CallUsage",
        inmate: inmate,
        date: [creationDate, `${hour + i}:${callMinute}:${seconds(i)} PM`],
        status: "APPROVED",
        facIndex: facIndex,
        subIndex: 0,
        amount: amount.toFixed(2),
        rate: rate,
        tax: true,
        type: "CallUsage",
        added: "HOUPASWVALSQL06",
        comment: "",
        refunded: "true",
        refundable: "false",
        increase: "-1",
        summary: "Call Usage",
      });

      totalCallCost -= amount.toFixed(2);

      callMinute += duration;
    }
    if (type === "broken") {
      const expireTotal = depositTotal + totalCallCost;
      const expireFunds = {
        account: account,
        system: "adjustment",
        date: [
          formattedExpireDate,
          `${randomHour}:${randomMinute + 1}:${seconds(1)} PM`,
        ],
        amount: expireTotal.toString(),
        type: "ExpFunds",
        added: "Breakage AMES AdvancePay",
        comment: "",
        refunded: "false",
        refundable: "false",
        increase: "-1",
        summary: "Exp Funds",
      };
      transactions.push(expireFunds);
    }
  } else if (type === "partial") {
    const system =
      returnMixedInt(index, 0, 5) === 0
        ? "GTL-PINDEBIT-WEB"
        : "DSI-TRUSTDEPOSIT-WEB";
    const newTransactions = [
      {
        account: account,
        system: "ConnectNetwork",
        date: [
          creationDate,
          `${randomHour}:${randomMinute}:${returnMixedInt(index, 10, 59)} PM`,
        ],
        status: "APPROVED",
        amount: "0.00",
        type: "NewAccount",
        added: "ConnectNetwork",
        comment: "",
        refunded: "true",
        refundable: "false",
        increase: "1",
        summary: false,
      },
      {
        account: account,
        system: system,
        date: [
          creationDate,
          `${randomHour}:${randomMinute + 15}:${randomSecond} PM`,
        ],
        cc: [first6, last4],
        exp: [
          `0${returnMixedInt(index, 1, 9)}`,
          futureDate.getFullYear().toString().slice(-2),
        ],
        status: "APPROVED",
        amount: depositAmt.toFixed(2),
        code: [
          returnMixedInt(index, 1111111111111, 9999999999999),
          returnMixedInt(index, 111111, 999999),
        ],
        order: [`D${returnMixedInt(index, 1111111111, 9999999999)}`, ""],
        reject: ["ACCEPT", "00"],
        vendor: ["ReD", "PaymenTech"],
        transaction: ["Post-Auth", "Payment"],
        refunded: "false",
        refundable: "false",
        increase: "0",
      },
    ];

    transactions.push(...newTransactions);
  } else {
    // unaccepted call for an unestablished account
    transactions.push({
      account: account,
      system: "CallUsage",
      inmate: inmate,
      date: [
        creationDate,
        `${returnMixedInt(index, 6, 11)}:${returnMixedInt(
          index,
          10,
          59
        )}:${returnMixedInt(index, 10, 59)} AM`,
      ],
      facIndex: facIndex,
      subIndex: 0,
      amount: "0.00",
      rate: rate,
      tax: false,
      type: "CallUsage",
      added: "HOUPASWVALSQL06",
      comment: "",
      refunded: "true",
      refundable: "false",
      increase: false,
      summary: "Call Usage",
    });
  }
  const broken = {
    ...established,
    ...{
      status: 2,
    },
  };

  const bna =
    type === "established"
      ? established
      : type === "partial"
      ? partial
      : type === "broken"
      ? broken
      : newAccount;
  const result = { ...newAccount, ...bna };

  return result;
}

const returnAccounts = () => {
  const prefix = 208555;
  let section = 11;

  for (let i = 0; section < 55; i += 1) {
    const type =
      section === 11
        ? "blank"
        : section === 22
        ? "partial"
        : section === 33
        ? "broken"
        : "established";
    const index = i < 10 ? "0" + i : i;
    const account = prefix.toString() + section.toString() + index.toString();
    const newAccount = generateData(accounts.length, account, type);

    accounts.push(newAccount);
    if (i === 99) {
      section += 11;
      i = 0;
    }
  }
};

// random account generation
returnAccounts();

root.render(
  <React.StrictMode>
    <App
      accountData={accounts}
      transactionData={transactions}
      date={date}
      formattedDate={formattedDate}
      formatTime={formatTime}
      returnRandomInt={returnRandomInt}
      returnMixedInt={returnMixedInt}
    />
  </React.StrictMode>
);
