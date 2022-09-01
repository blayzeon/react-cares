import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import accounts from "./data/accounts.json";
import transactions from "./data/transactions.json";

const root = ReactDOM.createRoot(document.getElementById("root"));
const updateAccount = (index, key, value) => {
  if (key === "comments") {
    value.forEach((comment) => {
      accounts[index].comments.push(comment);
    });
  } else {
    accounts[index][key] = value;
  }
};

root.render(
  <React.StrictMode>
    <App
      accounts={accounts}
      saveAccount={updateAccount}
      transactions={transactions}
    />
  </React.StrictMode>
);
