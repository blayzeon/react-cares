import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import accountData from "./data/accounts.json";
import transactionData from "./data/transactions.json";
import facilities from "./data/facilities.json";

const root = ReactDOM.createRoot(document.getElementById("root"));
const accounts = accountData;

function returnRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// todo - have cc refunds show in cc auths and not disappear
const date = new Date();
const formattedDate = date.toLocaleDateString({
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

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
    const adjectives = ["cute", "hottie", "cool", "army", "gamer", "mizz"];
    const spacers = ["xxx", "_", ".", "2", "", "", "", ""];
    const nouns = ["princess", "af", "gurl", "god"];
    const number = returnRandomInt(0, 9999);
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
    }${nouns[returnRandomInt(0, nouns.length)]}${number > 10 ? number : null}`;

    if (name) {
      generatedEmail =
        returnRandomInt(0, 2) === 0
          ? `${name[0]}${spacers[returnRandomInt(0, spacers.length)]}${name[1]}`
          : generatedEmail;
    }

    return `${generatedEmail}@${domain[returnRandomInt(0, domain.length)]}`;
  };

  const firstNames = ["Robert", "Mary", "Sam"];
  const lastNames = ["Smith", "Jackson", "Martinez"];
  const streets = ["MAIN ST", "CHURCH ST", "ELM ST"];
  const address = [
    { state: "FL", city: "GAINESVILLE", zip: "32641" },
    { state: "OR", city: "ONTARIO", zip: "97914" },
    { state: "ID", city: "FRUITLAND", zip: "83619" },
  ];
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
      one: streets[returnRandomInt(0, streets.length)],
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

  const established = {
    ...partial,
    ...{
      ivrPc: returnRandomInt(1111, 9999),
      policies: {
        cell: true,
        fees: true,
        exp90: false,
        exp180: true,
      },
      comments: [
        {
          date: "9/27/2022",
          time: "11:20:32 PM",
          filter: "general",
          comment: "CARES User kristine.carter accessed account.",
          color: "black",
        },
      ],
    },
  };

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
      transactionData={transactionData}
      date={date}
      formattedDate={formattedDate}
      formatTime={formatTime}
      returnRandomInt={returnRandomInt}
    />
  </React.StrictMode>
);
