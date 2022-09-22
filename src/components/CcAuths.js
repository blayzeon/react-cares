import React, { useState } from "react";
import Table from "./Table";

export default function CcAuths(props) {
  const allTrans = props.transactions;
  const defaultAccount = props.accounts[props.index].account;

  const searchTrans = {
    destination: function (number = defaultAccount) {
      const items = {
        labels: [
          "Calling System",
          "Date",
          "CC Num",
          "Status",
          "Amount",
          "Code",
          "Order ID",
          "Reject Code",
          "Vendor",
          "Transaction Type",
        ],
        values: [
          "system",
          "date",
          "cc",
          "status",
          "amount",
          "code",
          "order",
          "reject",
          "vendor",
          "transaction",
        ],
      };

      const result = [];
      allTrans.forEach((trans) => {
        if (trans.account == number) {
          if (trans.cc) {
            const row = [];
            const row2 = [];
            items.values.forEach((item) => {
              if (
                !Array.isArray(trans[item]) ||
                item === "exp" ||
                item === "cc" ||
                item === "date"
              ) {
                const value =
                  item === "amount"
                    ? `$${trans[item]}`
                    : item === "date"
                    ? `${trans[item][0]} ${trans[item][1]}`
                    : trans[item];
                row.push(value);
                row2.push(value);
              } else {
                row.push(trans[item][0]);
                row2.push(trans[item][1]);
              }
            });

            result.push(row);
            result.push(row2);
          }
        }
      });
      return {
        thead: [items.labels],
        tbody: result,
      };
    },
  };

  const [search, setSearch] = useState(props.accounts.account);

  const handleClose = () => {
    props.setIsOpen(false);
  };

  const handleSubmit = () => {
    const searchQuery = document.querySelector("#cc-auths-search-value");
    setSearch(searchQuery.value);
  };

  return props.visible ? (
    <div className="popup-cc flex-column">
      <div className="flex gap-tiny close-bar">
        <div className="flex">
          <div className="cc-tab" onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>{" "}
            CARES Web Interface
          </div>
          <div className="cc-tab bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>{" "}
            Global Tel*Link CCWebManagement{" "}
            <button onClick={handleClose}>x</button>
          </div>
        </div>
        <button type="button" onClick={handleClose}>
          x
        </button>
      </div>
      <header className="flex gap-small blue-gradient-bg">
        <img src={props.logo} alt={props.brand} />
        <em>CCWeb Management System</em>
      </header>
      <div className="flex flex-grow">
        <ul>
          <li className="blue-gradient-bg">Welcome</li>
          <li className="blue-gradient-bg">PaymentPlans UI</li>
          <li className="blue-gradient-bg">Fraud Rules Config</li>
          <li className="blue-gradient-bg">Vendor Monitor Override</li>
          <li className="blue-gradient-bg">Credit Card Search</li>
        </ul>
        <div className="flex-grow">
          <fieldset className="margin-bottom">
            <legend>Search Options</legend>
            <div className="flex gap-small margin-bottom">
              <div>
                <label>Search Type: </label>{" "}
                <select id="cc-auths-search-type">
                  <option>Destination</option>
                  <option>Last 4 CC</option>
                  <option>First 4 + Last 4 CC</option>
                  <option>First 6 + Last 4 CC</option>
                </select>
              </div>
              <div>
                <label>Search Text: </label>
                <input
                  type="text"
                  id="cc-auths-search-value"
                  defaultValue={defaultAccount}
                />
              </div>
              <div>
                <label>Start Date: </label>
                <input type="date" />
              </div>
              <div>
                <label>End Date: </label>
                <input type="date" />
              </div>
            </div>
            <div className="flex gap-small margin-bottom">
              <button onClick={handleSubmit}>Search</button>
              <button>Export Excel</button>
            </div>
          </fieldset>
          <div className="cc-auths-container">
            <Table data={searchTrans.destination(search)} page={"cc-auths"} />
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
