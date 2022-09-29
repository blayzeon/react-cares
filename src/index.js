import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import accountData from "./data/accounts.json";
import transactionData from "./data/transactions.json";

const root = ReactDOM.createRoot(document.getElementById("root"));
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

function generateData(index, account) {
  const generateEmailAddress = () => {
    const adjectives = ["cute", "hottie", "cool", "army", "gamer", "mizz"];
    const spacers = ["xxx", "_", ".", "2", ""];
    const nouns = ["princess", "af", "gurl", "god"];
    const number = returnRandomInt(0, 9999);
    return `${adjectives[returnRandomInt(0, adjectives.length)]}${
      spacers[returnRandomInt(0, spacers.length)]
    }${nouns[returnRandomInt(0, nouns.length)]}${
      number > 10 ? number : null
    }@customer.com`;
  };

  const firstNames = ["Robert", "Mary", "Sam"];
  const lastNames = ["Smith", "Jackson", "Martinez"];
  const streets = ["MAIN ST", "CHURCH ST", "ELM ST"];
  const address = [
    { state: "FL", city: "GAINESVILLE", zip: "32641" },
    { state: "OR", city: "ONTARIO", zip: "97914" },
    { state: "ID", city: "FRUITLAND", zip: "83619" },
  ];

  const addressIndex = returnRandomInt(0, address.length);

  return {
    index: index,
    account: account,
    name: {
      first: firstNames[returnRandomInt(0, firstNames.length)],
      last: lastNames[returnRandomInt(0, lastNames.length)],
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
    email: generateEmailAddress(),
    tax: "",
    ivrPc: returnRandomInt(1111, 9999),
    exempt: false,
    notes: "",
    au: "",
    lec: "",
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
}

root.render(
  <React.StrictMode>
    <App
      accountData={accountData}
      transactionData={transactionData}
      date={date}
      formattedDate={formattedDate}
      formatTime={formatTime}
      returnRandomInt={returnRandomInt}
    />
  </React.StrictMode>
);
