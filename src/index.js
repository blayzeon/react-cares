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
let transactions = transactionData;

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

function getFormattedDate(days, date = new Date()) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() + days);

  return formatDate(previous);
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
  const seed = parseInt(lastIndex) * 9; // date.getDate();

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
  let fee =
    facilities[facIndex].fees[0] === 0
      ? 0.0
      : facilities[facIndex].fees[0] + depositAmt * 0.0325;
  fee = fee.toFixed(2);
  const depositTotal = depositAmt - fee;
  const randomAu =
    index % 2 === 0
      ? `${firstNames[returnMixedInt(index + 2, 0, firstNames.length - 1)]} ${
          lastNames[returnMixedInt(index + 5, 0, lastNames.length - 1)]
        }`
      : index % 3 === 0
      ? "REMOVED"
      : "";

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
      au: randomAu,
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
      const type = index % 2 === 0 ? "WriteOff" : "ExpFunds";
      const summary = type === "WriteOff" ? "Write Off" : "Exp Funds";
      const increase = type === "WriteOff" ? "1" : "-1";
      // write off = CallUsage + 3rdParty fee + Deposit fee
      const expireTotal =
        type === "WriteOff"
          ? Number(fee) + Math.abs(totalCallCost)
          : depositTotal + totalCallCost;
      if (type === "WriteOff") {
        // add a charge back
        const chargeback = {
          account: account,
          system: "adjustment",
          date: [
            getFormattedDate(10, oldDate),
            `${randomHour}:${randomMinute + 1}:${seconds(1)} PM`,
          ],
          amount: String(depositAmt),
          type: "Chargeback",
          added: "bduty",
          comment: `1 chargeback dispute(s) ($${depositAmt}). CB Reason (Card Holder Not Present).`,
          refunded: "false",
          refundable: "false",
          increase: "-1",
          summary: "Chargeback",
          color: "orange",
        };
        transactions.push(chargeback);
      }
      const expireTime = `${randomHour}:${randomMinute + 1}:${seconds(2)} PM`;
      const expireFunds = {
        account: account,
        system: "adjustment",
        date: [formattedExpireDate, expireTime],
        amount: String(expireTotal),
        type: type,
        added: "Breakage AMES AdvancePay",
        comment: "",
        refunded: "false",
        refundable: "false",
        increase: increase,
        summary: summary,
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

// customized accounts
const currentTime = formatTime();

const newTransactions = [
  {
    account: "2085551111",
    date: [formattedDate, currentTime],
    system: "GTL-PINDEBIT-WEB",
    cc: ["440393", "5366"],
    exp: ["03", "30"],
    status: "APPROVED",
    amount: "15.00",
    code: ["709002200200WDF2022099211244484", "60DFEE"],
    order: ["H1190788586", ""],
    reject: ["ACCEPT", "00"],
    vendor: ["ReD", "PaymenTech"],
    transaction: ["Post-Auth", "Payment"],
    type: "Deposit",
    added: "ConnectNetwork",
    comment: "",
    refunded: "false",
    refundable: "false",
    increase: "0",
    summary: false,
  },
  {
    account: "8889884768",
    date: [formattedDate, currentTime],
    system: "DSI-TRUSTDEPOSIT-WEB",
    cc: ["440393", "5366"],
    exp: ["03", "30"],
    status: "APPROVED",
    amount: "15.00",
    code: ["709002200200VBZ20220921221736844", "097496"],
    order: ["H1190519942", ""],
    reject: ["ACCEPT", "00"],
    vendor: ["ReD", "PaymenTech"],
    transaction: ["Post-Auth", "Payment"],
    type: "Deposit",
    added: "ConnectNetwork",
    comment: "",
    refunded: "false",
    refundable: "false",
    increase: "0",
    summary: false,
  },
  {
    account: "2085551111",
    system: "CallUsage",
    inmate: {
      id: "A93456",
      name: ["ALICE", "DEMETTRIE"],
    },
    date: [formattedDate, currentTime],
    status: "APPROVED",
    facIndex: 1,
    subIndex: 0,
    amount: "0.30",
    rate: 5,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: "D",
    callType: "D",
    summary: "Call Usage",
  },
  {
    account: "2085551122",
    system: "ICM",
    date: [formattedDate, currentTime],
    status: "APPROVED",
    amount: "0.00",
    type: "NewAccount",
    added: "ICM",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: "1",
    summary: false,
  },
  {
    account: "2085551122",
    system: "ICM",
    date: [formattedDate, currentTime],
    cc: ["440393", "4542"],
    exp: ["11", "30"],
    status: "APPROVED",
    amount: "5.00",
    code: ["454326357825683115835725842710", "713493"],
    order: ["H0990889774", ""],
    reject: ["ACCEPT", "00"],
    vendor: ["ReD", "PaymenTech"],
    transaction: ["Post-Auth", "Payment"],
    type: "Deposit",
    added: "ICM",
    comment: "",
    refunded: "false",
    refundable: "true",
    increase: "1",
    summary: "Deposit",
  },
  {
    account: "2085551122",
    system: "DepositTransactionFee",
    date: [formattedDate, currentTime],
    amount: "0.16",
    type: "3rdPartyFinancialTransactionFee",
    added: "InContactMainAdvancePayIVR",
    comment: "",
    refunded: "false",
    refundable: "false",
    increase: "-1",
    summary: "Fees",
  },
  {
    account: "2085551122",
    system: "DepositTransactionFee",
    date: [formattedDate, currentTime],
    amount: "3.00",
    type: "DepositTransactionFee",
    added: "InContactMainAdvancePayIVR",
    comment: "",
    refunded: "false",
    refundable: "false",
    increase: "-1",
    summary: "Fees",
  },
  {
    account: "2085551122",
    system: "ICM",
    date: [formattedDate, currentTime],
    cc: ["440393", "4542"],
    exp: ["11", "30"],
    status: "APPROVED",
    amount: "25.00",
    code: ["454326357825683115835725842710", "713493"],
    order: ["H0990889774", ""],
    reject: ["ACCEPT", "00"],
    vendor: ["ReD", "PaymenTech"],
    transaction: ["Post-Auth", "Payment"],
    type: "Deposit",
    added: "ICM",
    comment: "",
    refunded: "false",
    refundable: "true",
    increase: "1",
    summary: "Deposit",
  },
  {
    account: "2085551122",
    system: "DepositTransactionFee",
    date: [formattedDate, currentTime],
    amount: "0.81",
    type: "3rdPartyFinancialTransactionFee",
    added: "ICM",
    comment: "",
    refunded: "false",
    refundable: "false",
    increase: "-1",
    summary: "Fees",
  },
  {
    account: "2085551122",
    system: "DepositTransactionFee",
    date: [formattedDate, currentTime],
    amount: "3.00",
    type: "DepositTransactionFee",
    added: "ICM",
    comment: "",
    refunded: "false",
    refundable: "false",
    increase: "-1",
    summary: "Fees",
  },
  {
    account: "2085551133",
    system: "ADVANCEPAY-IVR",
    date: [formattedDate, currentTime],
    cc: ["523451", "8624"],
    exp: ["12", "30"],
    status: "DECLINED",
    amount: "1000.00",
    code: ["", ""],
    order: ["D54642346", ""],
    reject: ["381", ""],
    vendor: ["ReD", "PaymenTech"],
    transaction: ["", "Payment"],
    type: "Deposit",
    added: "InContactMainAdvancePayIVR",
    comment: "",
    refunded: "false",
    refundable: "false",
    increase: "0",
    summary: "false",
  },
  {
    account: "2085551144",
    system: "DSI-TRUSTDEPOSIT-WEB",
    date: [formattedDate, currentTime],
    cc: ["512345", "3462"],
    exp: ["11", "30"],
    status: "APPROVED",
    amount: "25.00",
    code: ["6435346452543634355456644445534", "235267"],
    order: ["", "H4353334533"],
    reject: ["ACCEPT", "00"],
    vendor: ["ReD", "Vantiv"],
    transaction: ["Post-Auth", "Payment"],
    type: "",
    added: "",
    comment: "",
    refunded: "false",
    refundable: "false",
    increase: "0",
  },
  {
    account: "2085551155",
    system: "AP_ONECALL_USAGE",
    inmate: {
      id: "952456",
      name: ["KIM", "KITSURAGI"],
    },
    facIndex: 5,
    subIndex: 0,
    rate: 7,
    date: [formattedDate, currentTime],
    cc: ["412345", "5468"],
    exp: ["10", "31"],
    status: "APPROVED",
    amount: "13.67",
    code: ["709002500001TA72022092904916633", "640912"],
    order: ["D45341234", ""],
    reject: ["ACCEPT", "00"],
    vendor: ["ReD", "PaymenTech"],
    transaction: ["Post-Auth", "Payment"],
    type: "",
    added: "Pay2TalkQueue",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: "0",
    summary: false,
  },
  {
    account: "2085551155",
    system: "AP_ONECALL_USAGE",
    inmate: {
      id: "952456",
      name: ["KIM", "KITSURAGI"],
    },
    facIndex: 5,
    subIndex: 0,
    rate: 7,
    date: [formattedDate, currentTime],
    cc: ["412345", "5468"],
    exp: ["10", "31"],
    status: "APPROVED",
    amount: ["$11.51", "$2.16"],
    code: ["", ""],
    order: ["D45341234", ""],
    reject: ["ACCEPT", "00"],
    vendor: ["PaymenTech", "PaymenTech"],
    transaction: ["Capture", "Void"],
    type: "",
    added: "",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: "0",
    summary: false,
  },
  {
    account: "2085551155",
    system: "CallUsage",
    inmate: {
      id: "952456",
      name: ["KIM", "KITSURAGI"],
    },
    date: [formattedDate, currentTime],
    status: "APPROVED",
    facIndex: 5,
    subIndex: 0,
    amount: "4.21",
    rate: 7,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: "X",
    callType: "X",
    summary: "Call Usage",
  },
  {
    account: "2085551166",
    system: "ADVANCEPAY-IVR",
    date: [getFormattedDate(-2), currentTime],
    cc: ["476452", "6753"],
    exp: ["09", "30"],
    status: "APPROVED",
    amount: "25.00",
    code: ["7687895645687564576785657567657", "455464"],
    order: ["H768565454", ""],
    reject: ["ACCEPT", "00"],
    vendor: ["ReD", "PaymenTech"],
    transaction: ["Post-Auth", "Payment"],
    type: "Deposit",
    added: "InContactMainAdvancePayIVR",
    comment: "",
    refunded: "false",
    refundable: "true",
    increase: "1",
    summary: "Deposit",
  },
  {
    account: "2085551166",
    system: "DepositTransactionFee",
    date: [getFormattedDate(-2), currentTime],
    amount: "0.81",
    type: "3rdPartyFinancialTransactionFee",
    added: "InContactMainAdvancePayIVR",
    comment: "",
    refunded: "false",
    refundable: "false",
    increase: "-1",
    summary: "Fees",
  },
  {
    account: "2085551166",
    system: "DepositTransactionFee",
    date: [getFormattedDate(-2), currentTime],
    amount: "3.00",
    type: "DepositTransactionFee",
    added: "InContactMainAdvancePayIVR",
    comment: "",
    refunded: "false",
    refundable: "false",
    increase: "-1",
    summary: "Fees",
  },
  {
    account: "2085551166",
    system: "adjustment",
    date: [getFormattedDate(-1), currentTime],
    amount: "25.00",
    type: "Chargeback",
    added: "GTL\\bduty",
    comment: `1 chargeback dispute(s) ($25.00) Txn Date(s) ${formattedDate} CC =476452...6753. CB Reason (Card Holder Not Present).`,
    refunded: "false",
    refundable: "false",
    increase: "-1",
    summary: "Chargeback",
    color: "orange",
  },
  {
    account: "2085552211",
    system: "AP_ONECALL_USAGE",
    inmate: {
      id: "A123456",
      name: ["NIX", "GOTTLIEB"],
    },
    facIndex: 1,
    subIndex: 0,
    rate: 5,
    date: [formattedDate, currentTime],
    cc: ["512346", "6321"],
    exp: ["08", "30"],
    status: "APPROVED",
    amount: "0.25",
    code: ["65756756455547567456476576456456745", "435354346"],
    order: ["D456456544", ""],
    reject: ["ACCEPT", "00"],
    vendor: ["ReD", "PaymenTech"],
    transaction: ["Post-Auth", "Payment"],
    type: "",
    added: "Pay2TalkQueue",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: "0",
    summary: false,
  },
  {
    account: "2085552211",
    system: "AP_ONECALL_USAGE",
    inmate: {
      id: "A123456",
      name: ["NIX", "GOTTLIEB"],
    },
    facIndex: 1,
    subIndex: 0,
    rate: 5,
    date: [formattedDate, currentTime],
    cc: ["412345", "5468"],
    exp: ["10", "31"],
    status: "APPROVED",
    amount: ["$0.25", "$0.00"],
    code: ["", ""],
    order: ["D45341234", ""],
    reject: ["ACCEPT", "00"],
    vendor: ["PaymenTech", "PaymenTech"],
    transaction: ["Capture", "Void"],
    type: "",
    added: "",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: "0",
    summary: false,
  },
  {
    account: "2085552211",
    system: "CallUsage",
    inmate: {
      id: "A123456",
      name: ["NIX", "GOTTLIEB"],
    },
    date: [formattedDate, currentTime],
    status: "APPROVED",
    facIndex: 1,
    subIndex: 0,
    amount: "0.25",
    rate: 5,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: "X",
    callType: "X",
    summary: "Call Usage",
  },
  {
    account: "2085552222",
    system: "CallUsage",
    inmate: {
      id: "546633",
      name: ["HARRY", "DUBOIS"],
    },
    date: [formattedDate, currentTime],
    status: "APPROVED",
    facIndex: 4,
    subIndex: 0,
    amount: "0.00",
    rate: 5,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: false,
    summary: "Call Usage",
    startCode: "L6",
    endCode: "01",
  },
  {
    account: "2085552233",
    system: "CallUsage",
    inmate: {
      id: "546454",
      name: ["JULES", "PIDIEU"],
    },
    date: [formattedDate, currentTime],
    status: "APPROVED",
    facIndex: 4,
    subIndex: 0,
    amount: "0.00",
    rate: 5,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: false,
    summary: "Call Usage",
    startCode: "L2",
    endCode: "87",
  },
  {
    account: "2085552244",
    system: "CallUsage",
    inmate: {
      id: "456453",
      name: ["JEAN", "VICQUEMARE"],
    },
    date: [getFormattedDate(-5), "7:23:11 AM"],
    status: "APPROVED",
    facIndex: 5,
    subIndex: 0,
    amount: "0.00",
    rate: 5,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: false,
    summary: "Call Usage",
    startCode: "D5",
  },
  {
    account: "2085552244",
    system: "CallUsage",
    inmate: {
      id: "456453",
      name: ["JEAN", "VICQUEMARE"],
    },
    date: [getFormattedDate(-3), "6:32:22 AM"],
    status: "APPROVED",
    facIndex: 5,
    subIndex: 0,
    amount: "0.00",
    rate: 5,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: false,
    summary: "Call Usage",
    startCode: "D5",
  },
  {
    account: "2085552244",
    system: "CallUsage",
    inmate: {
      id: "456453",
      name: ["CHESTER", "MCLAINE"],
    },
    date: [getFormattedDate(-1), "9:23:45 AM"],
    status: "APPROVED",
    facIndex: 5,
    subIndex: 0,
    amount: "0.00",
    rate: 5,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: false,
    summary: "Call Usage",
    startCode: "D5",
  },
  {
    account: "2085552255",
    system: "CallUsage",
    inmate: {
      id: "W54164",
      name: ["JUDIT", "MINOT"],
    },
    date: [formattedDate, currentTime],
    status: "APPROVED",
    facIndex: 1,
    subIndex: 0,
    amount: "0.00",
    rate: 7,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: false,
    summary: "Call Usage",
    startCode: "D5",
  },
  {
    account: "2085552255",
    system: "CallUsage",
    inmate: {
      id: "A54645",
      name: ["JEAN", "VICQUEMARE"],
    },
    date: [formattedDate, currentTime],
    status: "APPROVED",
    facIndex: 1,
    subIndex: 1,
    amount: "0.00",
    rate: 7,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: false,
    summary: "Call Usage",
    startCode: "D5",
  },
  {
    account: "2085552266",
    system: "CallUsage",
    inmate: {
      id: "657563",
      name: ["KUUNO", "RUYTER"],
    },
    date: [formattedDate, currentTime],
    status: "APPROVED",
    facIndex: 2,
    subIndex: 0,
    amount: "0.00",
    rate: 4,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: false,
    summary: "Call Usage",
    startCode: "D5",
  },
  {
    account: "2085552266",
    system: "CallUsage",
    inmate: {
      id: "546432",
      name: ["CUNOESE", "RUYTER"],
    },
    date: [formattedDate, currentTime],
    status: "APPROVED",
    facIndex: 2,
    subIndex: 1,
    amount: "0.00",
    rate: 3,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: false,
    summary: "Call Usage",
    startCode: "D5",
  },
  {
    account: "2085551177",
    system: "adjustment",
    date: ["10/20/2022", "8:10:34 PM"],
    amount: "10",
    type: "Deposit",
    added: "kiosk",
    comment: "",
    refunded: "false",
    refundable: false,
    increase: "1",
    summary: "Deposit",
  },
  {
    account: "2085554411",
    system: "CallUsage",
    inmate: {
      id: "544266",
      name: ["MACK", "TORSON"],
    },
    date: [formattedDate, currentTime],
    status: "APPROVED",
    facIndex: 1,
    subIndex: 0,
    amount: "0.00",
    rate: 5,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: "X",
    callType: "X",
    summary: "Call Usage",
    startCode: "D5",
    endCode: "",
  },
  {
    account: "2085554422",
    system: "CallUsage",
    inmate: {
      id: "544266",
      name: ["TRANT", "HEIDELSTAM"],
    },
    date: [formattedDate, currentTime],
    status: "APPROVED",
    facIndex: 2,
    subIndex: 0,
    amount: "0.00",
    rate: 5,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: "X",
    callType: "H",
    summary: "Call Usage",
    startCode: "L2",
    endCode: 85,
  },
  {
    account: "2085554433",
    system: "CallUsage",
    inmate: {
      id: "654357",
      name: ["GARY", "CRYPTO"],
    },
    date: [formattedDate, currentTime],
    status: "APPROVED",
    facIndex: 3,
    subIndex: 0,
    amount: "0.00",
    rate: 6,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: "X",
    callType: "H",
    summary: "Call Usage",
    startCode: "L2",
    endCode: 10,
  },
  {
    account: "2085554444",
    system: "CallUsage",
    inmate: {
      id: "264446",
      name: ["MICHAEL", "THOMASON"],
    },
    date: [formattedDate, currentTime],
    status: "APPROVED",
    facIndex: 8,
    subIndex: 0,
    amount: "0.00",
    rate: 1,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: "X",
    callType: "H",
    summary: "Call Usage",
    startCode: "L2",
    endCode: "04",
  },
  {
    account: "2085554466",
    system: "CallUsage",
    inmate: {
      id: "743263",
      name: ["GORACY", "KUBEK"],
    },
    date: [getFormattedDate(-4), "7:52:11 PM"],
    status: "APPROVED",
    facIndex: 7,
    subIndex: 0,
    amount: "0.65",
    rate: 5,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: false,
    summary: "Call Usage",
  },
  {
    account: "2085554466",
    system: "CallUsage",
    inmate: {
      id: "743263",
      name: ["GORACY", "KUBEK"],
    },
    date: [getFormattedDate(-3), "4:52:11 AM"],
    status: "APPROVED",
    facIndex: 7,
    subIndex: 0,
    amount: "0.15",
    rate: 5,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: false,
    summary: "Call Usage",
  },
  {
    account: "2085554466",
    system: "CallUsage",
    inmate: {
      id: "743263",
      name: ["GORACY", "KUBEK"],
    },
    date: [getFormattedDate(-2), currentTime],
    status: "APPROVED",
    facIndex: 7,
    subIndex: 0,
    amount: "0.45",
    rate: 5,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: false,
    summary: "Call Usage",
  },
  {
    account: "2085554477",
    system: "CallUsage",
    inmate: {
      id: "623842",
      name: ["KLAASJE ", "AMANDOU"],
    },
    date: [formattedDate, currentTime],
    status: "APPROVED",
    facIndex: 2,
    subIndex: 1,
    amount: "0.00",
    rate: 1,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: "X",
    summary: "Call Usage",
    startCode: "D0",
    endCode: "TO",
    duration: ["1", "0"],
  },
  {
    account: "2085554488",
    system: "CallUsage",
    inmate: {
      id: "743263",
      name: ["LAWRENCE", "GARTE"],
    },
    date: [getFormattedDate(-2), "3:11:22 PM"],
    status: "APPROVED",
    facIndex: 6,
    subIndex: 0,
    amount: "0.00",
    rate: 6,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: false,
    summary: "Call Usage",
    startCode: "D5",
  },
  {
    account: "2085554488",
    system: "CallUsage",
    inmate: {
      id: "743263",
      name: ["LAWRENCE", "GARTE"],
    },
    date: [getFormattedDate(-1), "11:22:35 PM"],
    status: "APPROVED",
    facIndex: 6,
    subIndex: 0,
    amount: "0.00",
    rate: 6,
    tax: true,
    type: "CallUsage",
    added: "HOUPASWVALSQL06",
    comment: "",
    refunded: "true",
    refundable: "false",
    increase: false,
    summary: "Call Usage",
    startCode: "BZ",
  },
];

transactions = [...transactions, ...newTransactions];

accounts.forEach((account) => {
  transactions.forEach((tran) => {
    if (tran.account === account.account) {
      // write off & expire funds
      if (tran.type === "ExpFunds" || tran.type === "WriteOff") {
        account.comments.push({
          date: tran.date[0],
          time: tran.date[1],
          filter: "general",
          comment: "Account expired due to inactivity.",
          color: "black",
        });
      }

      // makes accounts that received blocked calls, blocked.
      if (tran.endCode === 85 || tran.endCode === "85") {
        account.status = "3";
        account.comments.push({
          date: getFormattedDate(-1),
          time: "12:21:44 PM",
          filter: "general",
          comment: "new.trainee changed the account status to BLOCKED.",
          color: "black",
        });
        return;
      }

      if (tran.endCode === 10 || tran.endCode === "10") {
        account.block = true;
        account.comments.push({
          date: getFormattedDate(-1),
          time: "1:55:22 PM",
          filter: "general",
          comment: "Customer Block was activated. Activated by new.trainee",
          color: "black",
        });
        return;
      }

      // calls aren't connecting
      if (tran.startCode === "BZ") {
        account.comments.push({
          date: getFormattedDate(-1),
          time: "12:21:44 PM",
          filter: "general",
          comment: "new.trainee changed the account status to BLOCKED.",
          color: "black",
        });
        account.comments.push({
          date: getFormattedDate(-1),
          time: "12:23:12 PM",
          filter: "general",
          comment: "new.trainee changed the account status to ACTIVE.",
          color: "black",
        });
        account.comments.push({
          date: getFormattedDate(-1),
          time: "12:25:45 PM",
          filter: "general",
          comment: "new.trainee cx wanted line reset / carrier is METRO PCS.",
          color: "black",
        });
        return;
      }

      // makes accounts that received APOC calls inactive.
      if (tran.callType === "X") {
        account.status = "2";

        if (account.ivrPc === "") {
          return;
        }

        account.comments.push({
          date: getFormattedDate(-1),
          time: "12:21:44 PM",
          filter: "general",
          comment: "new.trainee changed the account status to INACTIVE.",
          color: "black",
        });
        return;
      }

      // creates accounts that have a balance
      if (account.created === true || account.created === "true") {
        return;
      } else if (tran.increase === "1" || tran.increase === 1) {
        account.created = "true";
        account.type = 1;
        return;
      }
    }
  });
});

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
