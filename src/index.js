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

const root = ReactDOM.createRoot(document.getElementById("root"));
const accounts = accountData;
const transactions = transactionData;

function returnRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
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
  const generateEmailAddress = (name = false) => {
    const adjectives = [
      "cute",
      "hottie",
      "cool",
      "army",
      "sxc",
      "mc",
      "mamma",
      "phat",
      "former",
      "inmate",
      "blushing",
      "happy",
      "baby",
    ];
    const spacers = ["xxx", "_", ".", "", "", "", ""];
    const nouns = [
      "princess",
      "af",
      "gurl",
      "gamergod",
      "gamer",
      "kitten",
      "bunny",
      "lover",
      "of6",
      "dog",
      "angel",
      "devil",
    ];
    let number = returnRandomInt(0, 10000);
    // make "funny" numbers slightly more likely
    number = number > 59 && number < 70 ? 69 : number;
    number = number > 400 && number < 500 ? 420 : number;
    number = number > 39 && number < 50 ? 42 : number;
    number = number > 1300 && number < 1400 ? 1337 : number;

    const domain = [
      "cox.net",
      "comcast.net",
      "mail.com",
      "aol.com",
      "hotmail.com",
      "outlook.com",
      "gmail.com",
      "icloud.com",
      "yahoo.com",
      "protonmail.com",
      "zoho.com",
      "titan.email",
      "gmx.com",
      "hubspot.com",
      "tutanota.com",
    ];
    let generatedEmail = `${adjectives[returnRandomInt(0, adjectives.length)]}${
      spacers[returnRandomInt(0, spacers.length)]
    }${nouns[returnRandomInt(0, nouns.length)]}${
      number > 9999 ? null : number
    }`;

    if (name) {
      generatedEmail =
        returnRandomInt(0, 2) === 0
          ? `${name[0]}${spacers[returnRandomInt(0, spacers.length)]}${name[1]}`
          : generatedEmail;
    }

    return `${generatedEmail.toLowerCase()}@${
      domain[returnRandomInt(0, domain.length)]
    }`;
  };

  const daysBack =
    type === "broken"
      ? returnRandomInt(180, 999)
      : type === "established"
      ? returnRandomInt(2, 7)
      : returnRandomInt(1, 3);
  const creationDate = getPreviousDate(daysBack);
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
  const fNameIndex = returnRandomInt(0, firstNames.length);
  const lNameIndex = returnRandomInt(0, lastNames.length);
  const addressIndex = returnRandomInt(0, address.length);
  const passcode = returnRandomInt(1111, 9999);
  const depositAmt = returnRandomInt(15, 50);
  const facIndex = returnRandomInt(0, facilities.length);
  const rate = returnRandomInt(5, 7);
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
    lec: lec[returnRandomInt(0, lec.length)],
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
      one: `${returnRandomInt(11, 9999)} ${
        streets[returnRandomInt(0, streets.length)]
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

  const randomHour = returnRandomInt(1, 11);
  const randomMinute = returnRandomInt(10, 34);
  const randomSecond = returnRandomInt(10, 49);
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
          time: `${returnRandomInt(12, 11)}:${randomMinute}:${returnRandomInt(
            10,
            59
          )} PM`,
          filter: "general",
          comment: "CARES User kristine.carter accessed account.",
          color: "black",
        },
        {
          date: creationDate,
          time: `${returnRandomInt(12, 11)}:${randomMinute}:${returnRandomInt(
            10,
            59
          )} PM`,
          filter: "general",
          comment: `kristine.carter updated the account attribute for PCCellPhone to true.`,
          color: "red",
        },
        {
          date: creationDate,
          time: `${returnRandomInt(12, 11)}:${randomMinute}:${returnRandomInt(
            10,
            59
          )} PM`,
          filter: "general",
          comment: `kristine.carter updated the account attribute for PCServiceFees to true.`,
          color: "red",
        },
        {
          date: creationDate,
          time: `${returnRandomInt(12, 11)}:${randomMinute}:${returnRandomInt(
            10,
            59
          )} PM`,
          filter: "general",
          comment: `kristine.carter updated the account attribute for PC180DaysAccountExpiration to true.`,
          color: "red",
        },
        {
          date: creationDate,
          time: `${returnRandomInt(12, 11)}:${
            randomMinute + returnRandomInt(5, 15)
          }:${returnRandomInt(10, 59)} PM`,
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

  const first5 = returnRandomInt(1111, 9999);
  const first1 = returnRandomInt(0, 2) === 0 ? "5" : "4";
  const first6 = first1.toString() + first5.toString();
  const last4 = returnRandomInt(1111, 9999);
  const futureDate = new Date();
  const inmate = {
    id: returnRandomInt(111111, 99999999),
    name: [
      firstNames[returnRandomInt(0, firstNames.length)],
      lastNames[returnRandomInt(0, lastNames.length)],
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
          `${randomHour}:${randomMinute}:${returnRandomInt(10, 59)} PM`,
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
          `0${returnRandomInt(1, 9)}`,
          futureDate.getFullYear().toString().slice(-2),
        ],
        status: "APPROVED",
        amount: depositAmt.toFixed(2),
        code: [
          returnRandomInt(1111111111111, 9999999999999),
          returnRandomInt(111111, 999999),
        ],
        order: [`D${returnRandomInt(1111111111, 9999999999)}`, ""],
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
            randomSecond + returnRandomInt(1, 10)
          } PM`,
        ],
        system: "DepositTransactionFee",
        amount: fee,
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
    let callMinute = returnRandomInt(1, 30);
    for (let i = 0; i < returnRandomInt(1, 10); i += 1) {
      const duration = returnRandomInt(1, 15);
      const amount = facilities[facIndex].rates[rate - 1] * duration;
      transactions.push({
        account: account,
        system: "CallUsage",
        inmate: inmate,
        date: [
          creationDate,
          `${randomHour + 1}:${callMinute}:${returnRandomInt(10, 59)} PM`,
        ],
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

      callMinute += duration;
      if (callMinute > 60) {
        i = 99;
      }
    }
  } else if (type === "partial") {
    const system =
      returnRandomInt(0, 5) === 0 ? "GTL-PINDEBIT-WEB" : "DSI-TRUSTDEPOSIT-WEB";
    const newTransactions = [
      {
        account: account,
        system: "ConnectNetwork",
        date: [
          creationDate,
          `${randomHour}:${randomMinute}:${returnRandomInt(10, 59)} PM`,
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
          `0${returnRandomInt(1, 9)}`,
          futureDate.getFullYear().toString().slice(-2),
        ],
        status: "APPROVED",
        amount: depositAmt.toFixed(2),
        code: [
          returnRandomInt(1111111111111, 9999999999999),
          returnRandomInt(111111, 999999),
        ],
        order: [`D${returnRandomInt(1111111111, 9999999999)}`, ""],
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
        getPreviousDate(),
        `${returnRandomInt(6, 11)}:${returnRandomInt(10, 59)}:${returnRandomInt(
          10,
          59
        )} AM`,
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
    if (i > 99) {
      section += 11;
      i = 0;
    }
  }
};

returnAccounts();
console.log(accounts);
root.render(
  <React.StrictMode>
    <App
      accountData={accounts}
      transactionData={transactions}
      date={date}
      formattedDate={formattedDate}
      formatTime={formatTime}
      returnRandomInt={returnRandomInt}
    />
  </React.StrictMode>
);
