import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import accounts from "./data/accounts.json";
import transactions from "./data/transactions.json";

const root = ReactDOM.createRoot(document.getElementById("root"));
const updateAccount = (index, data) => {
  const newAccount = { ...accounts[index], ...data };
  accounts[index] = newAccount;
};

root.render(
  <React.StrictMode>
    <App accounts={accounts} transactions={transactions} />
  </React.StrictMode>
);
