import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import Main from "./components/Main";
import { v4 as uuid } from "uuid";
import facilities from "./data/facilities.json";
import "./style/app.css";
import accountData from "./data/accounts.json";
import transactionData from "./data/transactions.json";

function App() {
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

  function generateData() {
    function returnCall(age, connected = true, facility = false) {
      return {};
    }
  }

  const sidebarLinks = [
    [
      {
        link: "#",
        label: "Advanced Search",
      },
      {
        link: "#",
        label: "LEC Credit",
      },
    ],
    [
      {
        link: "#",
        label: "Master Facility List",
      },
      {
        link: "#",
        label: "Refund Form",
      },
      {
        link: "#",
        label: "Research Page",
      },
      {
        link: "#",
        label: "Connect Network",
      },
      {
        link: "#",
        label: "CN Site Info",
      },
      {
        link: "#",
        label: "Facility Services",
      },
      {
        link: "#",
        label: "CC Deposit",
      },
      {
        link: "#",
        label: "Create Account",
      },
    ],
  ];

  const topLinks = [
    {
      link: "#",
      label: "Home",
    },
    {
      link: "#",
      label: "Billing",
    },
    {
      link: "#",
      label: "Enterprise Tools",
    },
    {
      link: "#",
      label: "Technical Support",
    },
    {
      link: "#",
      label: "Technology Group",
    },
    {
      link: "#",
      label: "External Links",
    },
    {
      link: "#",
      label: "Site Configuration",
    },
  ];

  const nav = [
    {
      link: "#",
      label: "Account Summary",
      id: "page-account-summary",
      click: function (e) {
        updatePage(e);
      },
    },
    {
      link: "#",
      label: "Transactions",
      id: "page-transactions",
      click: function (e) {
        updatePage(e);
      },
    },
    {
      link: "#",
      label: "Refund",
      id: "page-refund",
      click: function (e) {
        updatePage(e);
      },
    },
    {
      link: "#",
      label: "Transaction Summary",
      id: "page-transaction-summary",
      click: function (e) {
        updatePage(e);
      },
    },
    {
      link: "#",
      label: "CC Auths",
      id: "page-cc-auths",
      click: function (e) {
        console.log("todo... cc auths");
      },
    },
    {
      link: "#",
      label: "Call Records",
      id: "page-call-records",
      click: function (e) {
        updatePage(e);
      },
    },
    {
      link: "#",
      label: "TAG Comments",
      id: "page-tag-comments",
      click: function (e) {
        updatePage(e);
      },
    },
    {
      link: "#",
      label: "Statements",
      id: "page-statements",
      click: function (e) {
        updatePage(e);
      },
    },
    {
      link: "#",
      label: "Auto Reload",
      id: "page-auto-reload",
      click: function (e) {
        updatePage(e);
      },
    },
    {
      link: "#",
      label: "Alerts",
      id: "page-alerts",
      click: function (e) {
        updatePage(e);
      },
    },
  ];

  function tableGroup(labelObj) {
    const result = [];
    const type = isNaN(labelObj.type) ? labelObj.type : false;

    result.push(
      <label key={uuid()} htmlFor={labelObj.id}>
        {labelObj.label}
      </label>
    );

    if (type) {
      const toPush =
        type === "textarea" ? (
          <textarea
            key={uuid()}
            defaultValue={labelObj.value}
            data={labelObj.data}
          ></textarea>
        ) : (
          <input
            style={labelObj.style ? labelObj.style : { display: "block" }}
            key={uuid()}
            id={labelObj.id}
            type={labelObj.type}
            defaultValue={labelObj.value}
            defaultChecked={labelObj.value}
            data-form={labelObj.data}
          />
        );
      result.push(toPush);
    } else {
      for (let i = 0; i < labelObj.type; i += 1) {
        const tempId = i === 0 ? labelObj.id : `${labelObj.id}-${i}`;
        const tempStyle = i === 0 ? { display: "block" } : { width: 40 + "px" };
        result.push(
          <input
            key={uuid()}
            id={tempId}
            type="text"
            style={tempStyle}
            defaultValue={labelObj.value[i]}
            data-form={labelObj.data[i]}
          />
        );
      }
    }

    return result;
  }

  function tableArray(array) {
    const result = [];
    for (let i = 0; i < array.length; i += 1) {
      result.push(tableGroup(array[i]));
    }

    return result;
  }
  const defaultAccount = {
    index: 0,
    account: "",
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

  const [transactions, setTransactions] = useState(transactionData);
  const [accounts, setAccounts] = useState(accountData); // account data from accounts.json
  const [index, setIndex] = useState(0); // current account that the user is on
  const [page, setPage] = useState("Account Summary"); // current page that the user is on
  const [alertMsg, setAlert] = useState({
    style: "green-blue-bg pad-left blue-text bold-text",
    msg: <span>&nbsp;</span>,
  });

  /* data management */
  const returnTransaction = {
    add: function (depositArray, old) {
      const current = old ? old : transactions;

      setTransactions([...current, ...depositArray]);
      return transactions;
    },
  };

  const returnAccount = {
    update: function (data, accountIndex = index) {
      const result = accounts;
      result[accountIndex] = { ...result[accountIndex], ...data };
      return result;
    },
    new: function (number) {
      const result = defaultAccount;
      result.type = "1";
      result.phone.one = number;
      result.index = accounts.length;
      result.account = number;

      return result;
    },
    comment: function (comment, accountIndex = index) {
      const result = accounts;
      const account = accounts[accountIndex];
      account.comments.push(comment);

      result[accountIndex] = account;

      return result;
    },
  };

  function returnSavedAccount() {
    const userInput = [...document.querySelectorAll("[data-form]")];
    let result = {};
    userInput.forEach((elm) => {
      if (elm.value === "") {
        return;
      }

      const dataValue = elm.getAttribute("data-form");

      // nested items
      const split = dataValue.includes(".") ? dataValue.split(".") : false;

      if (split) {
        if (split[0] in result) {
          result[split[0]][split[1]] = elm.value;
        } else {
          result[split[0]] = { [split[1]]: elm.value };
        }
      } else {
        result[dataValue] = elm.value;
      }
    });

    return result;
  }

  function createAccount() {
    const isCreated = document.querySelector("#as-account-type-select").value;
    const number = document.querySelector("#lookup-number").value;

    if (isCreated === "") {
      // determine account type popup
      alert(
        "Select an account type before clicking the 'Create Account' button."
      );
      return;
    }

    const accountsCopy = accounts;
    const newAccount = returnAccount.new(number);
    newAccount.created = "true";
    setIndex(newAccount.index);
    setAccounts([...accountsCopy, newAccount]);

    setAlert(returnLoadAlert(newAccount.account));
  }

  const updateAlert = (alertMsg, classColor = "blue-text bold-text") => {
    const newAlert = {
      style: `green-blue-bg pad-left ${classColor}`,
      msg: alertMsg,
    };

    setAlert(newAlert);
  };

  const createAccountAlert = {
    style: "green-blue-bg pad-left blue-text bold-text",
    msg: (
      <span>
        Account not found. Would you like to create one?{" "}
        <button type="button" onClick={createAccount}>
          Create Account
        </button>
      </span>
    ),
  };

  const returnLoadAlert = (number, state = "loaded") => {
    return {
      style: "green-blue-bg pad-left blue-text bold-text",
      msg: `The Advance Pay account ${number} ${state} successfully.`,
    };
  };

  const loadAccount = (number) => {
    // check if there is a matching account
    const result = accounts.find((account) => account.account === number);
    const match = result ? result : false;

    // set the page
    setPage("Account Summary");

    if (match) {
      // Match found
      if (match.index === index) {
        // @todo - add prompt to override unsaved changes
        return;
      }

      setIndex(match.index);
      if (match.created) {
        setAlert(returnLoadAlert(number));
        return;
      }
    }

    // New account
    setAlert(createAccountAlert);

    // no existing account, we will load a blank account
    if (!match) {
      setIndex(0);
    }
  };

  /* data management */

  function updatePage(target) {
    if (accounts[index].account === "") {
      document.querySelector(".nav").classList.add("active");
      alert(
        "Please enter a valid account number and click on 'Lookup' before attempting this action."
      );
      return;
    }

    const active = target ? target : document.querySelector(".nav");

    setPage(active.innerText);
    updatePageCss(active.innerText);

    if (accounts[index].account) {
      if (active.innerText === "Account Summary") {
        if (!accounts[index].created) {
          setAlert(createAccountAlert);
        }
      } else {
        setAlert(false);
      }
    }
  }

  const updatePageCss = (link) => {
    const links = document.querySelectorAll(".nav");
    links.forEach((link) => {
      link.classList.remove("active");
      if (link.innerText === page) {
        link.classList.add("active");
      }
    });
  };

  const addComment = (commentObj) => {
    const currentTime = formatTime();

    const result = returnAccount.comment(commentObj);
    setAccounts([...result]);
  };

  /* data */
  const formItems1 = () => {
    const valueData = accounts[index]
      ? accounts[index]
      : accounts[accounts.length - 1];
    return [
      {
        label: "First Name: ",
        id: "as-first-name",
        placeholder: false,
        style: false,
        type: "text",
        value: valueData.name.first,
        data: "name.first",
      },
      {
        label: "Last Name: ",
        id: "as-last-name",
        placeholder: false,
        style: false,
        type: "text",
        value: valueData.name.last,
        data: "name.last",
      },
      {
        label: "Address 1: ",
        id: "as-address-1",
        placeholder: false,
        style: false,
        type: "text",
        value: valueData.address.one,
        data: "address.one",
      },
      {
        label: "Address 2: ",
        id: "as-address-2",
        placeholder: false,
        style: false,
        type: "text",
        value: valueData.address.two,
        data: "address.two",
      },
      {
        label: "Zip Code: ",
        id: "as-zip-code",
        placeholder: false,
        style: { width: 80 + "px" },
        type: "text",
        value: valueData.address.zip,
        data: "address.zip",
      },
      {
        label: "City, State: ",
        id: "as-city-state",
        placeholder: false,
        style: "form-city-state",
        type: 2,
        value: [valueData.address.city, valueData.address.state],
        data: ["address.city", "address.state"],
      },
      {
        label: "Phone Number: ",
        id: "as-phone-number",
        placeholder: false,
        style: false,
        type: "text",
        value: valueData.phone.one,
        data: "phone.one",
      },
      {
        label: "Alt Number: ",
        id: "as-alt-number",
        placeholder: false,
        style: false,
        type: "text",
        value: valueData.phone.two,
        data: "phone.two",
      },
      {
        label: "Email: ",
        id: "as-email",
        placeholder: false,
        style: false,
        type: "text",
        value: valueData.email,
        data: "email",
      },
      {
        label: "Federal Tax ID: ",
        id: "as-fed-tax",
        placeholder: false,
        style: false,
        type: "text",
        value: valueData.tax,
        data: "tax",
      },
      {
        label: "IVR Passcode: ",
        id: "as-passcode",
        placeholder: false,
        style: false,
        type: "text",
        value: valueData.ivrPc,
        data: "ivrPc",
      },
    ];
  };

  const formItems2 = () => {
    const valueData = accounts[index] ? accounts[index] : accounts[0];
    return [
      {
        label: "Tax Exempt: ",
        id: "as-tax-exempt",
        placeholder: false,
        style: false,
        type: "checkbox",
        value: valueData.exempt,
      },
      {
        label: "Notes: ",
        id: "as-notes",
        placeholder: false,
        style: false,
        type: "textarea",
        value: valueData.notes,
      },
      {
        label: "Authorized User: ",
        id: "as-authorized-user",
        placeholder: false,
        style: false,
        type: "text",
        value: valueData.au,
      },
      {
        label: "Original LEC: ",
        id: "as-original-lec",
        placeholder: false,
        style: false,
        type: "text",
        value: valueData.lec,
      },
      {
        label: "Last Facility Called: ",
        id: "as-last-fac",
        placeholder: false,
        style: false,
        type: "text",
        value: facilities[valueData.facility].public,
      },
    ];
  };

  function handleSave() {
    const msg = returnLoadAlert(accounts[index].account, "updated");
    setAlert(msg);
    const data = returnSavedAccount();
    const result = returnAccount.update(data, index);
    setAccounts([...result]);
  }

  const formItems = { left: formItems1(), right: formItems2() };
  const asLeft = tableArray(formItems.left);
  asLeft.push([
    <button type="button" onClick={handleSave}>
      Save Changes
    </button>,
    <button type="button">BNA This Number</button>,
  ]);

  const asRight = tableArray(formItems.right);
  asRight.push([
    <label key="as-select-label" htmlFor="as-select">
      Originating Facilities:
    </label>,
    <select
      size="4"
      key="as-select"
      id="as-select"
      style={{ width: 350 + "px" }}
    >
      {accounts[index].facilities.map((facility) => (
        <option key={facility}>{facility}</option>
      ))}
    </select>,
  ]);
  asRight.push([<button type="button">Policy Check List</button>]);

  const as = {
    thead: false,
    tbody: [{ tbody: asLeft }, { tbody: asRight }],
  };

  /* sets account summary default page */
  useEffect(() => {
    //setIndex(index);
    updatePageCss(page);
  }, [index]);

  useEffect(() => {
    updatePageCss(page);
  }, [page]);

  return (
    <>
      <aside>
        <Sidebar
          logo="../images/simulator-logo.png"
          brand="CARES Simulator"
          links={sidebarLinks}
          account={accounts[index]}
          loadAccount={loadAccount}
        />
      </aside>
      <div className="small-pad">
        <div id="content" className="flex-grow border-parent gray-border">
          <Nav
            topLinks={topLinks}
            nav={nav}
            updatePage={updatePage}
            account={accounts[index]}
            page={page}
            message={alertMsg}
          />
          <Main
            page={page}
            account={accounts[index]}
            index={index}
            data={as}
            date={formattedDate}
            time={formatTime}
            transactions={transactions}
            updateAlert={updateAlert}
            addComment={addComment}
            addTransaction={returnTransaction.add}
          />
        </div>
      </div>
    </>
  );
}

export default App;
