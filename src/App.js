import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import Main from "./components/Main";
import { v4 as uuid } from "uuid";
import "./style/app.css";
import CcAuths from "./components/CcAuths";
import Popup2 from "./components/Popup2";
import Popup4 from "./components/Popup4";
import facilities from "./data/facilities.json";

function App(props) {
  const date = props.date;
  const formattedDate = props.formattedDate;

  const sidebarLinks = [
    [
      {
        link: "http://hcares/CARES/AdvancedSearch/Default.aspx",
        label: "Advanced Search",
      },
      {
        link: "http://hcares/CARES/LECCredit/Default.aspx",
        label: "LEC Credit",
      },
    ],
    [
      {
        link: "https://gtlcorp.sharepoint.com/:x:/r/BillingCustomerService/_layouts/15/Doc.aspx?sourcedoc=%7B07EA5B1D-02F4-4D6F-B70C-EF925797EF42%7D&file=Master%20Facility%20Blocking%20List.xls&action=default&mobileredirect=true",
        label: "Master Facility List",
      },
      {
        link: "https://gtlcorp.sharepoint.com/BillingCustomerService/Shared%20Documents/Forms/AllItems.aspx?viewpath=%2FBillingCustomerService%2FShared%20Documents%2FForms%2FAllItems.aspx",
        label: "Refund Form",
      },
      {
        link: "http://hcares/csguide/default.aspx",
        label: "Research Page",
      },
      {
        link: "http://hcares/OCBOT/Default.aspx",
        label: "Connect Network",
      },
      {
        link: "https://web.connectnetwork.com/",
        label: "CN Site Info",
      },
      {
        link: "https://gtlcorp.sharepoint.com/BillingCustomerService/Shared%20Documents/Facility%20Services.xlsx",
        label: "Facility Services",
      },
      {
        link: "#",
        label: "CC Deposit",
      },
      {
        link: "http://hcares/CARES/Account/Default.aspx",
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
      click: function () {
        if (index === 0) {
          alert("please enter a phone number");
          return;
        }
        setCcOpen(true);
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

  const [isCcOpen, setCcOpen] = useState(false);
  const [isPolOpen, setPolOpen] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [transactions, setTransactions] = useState(props.transactionData);
  const [accounts, setAccounts] = useState(props.accountData); // account data from accounts.json
  const [index, setIndex] = useState(0); // current account that the user is on
  const [page, setPage] = useState("Account Summary"); // current page that the user is on
  const [polBtnClass, setPolBtnClass] = useState("");
  const [alertMsg, setAlert] = useState({
    style: "green-blue-bg pad-left blue-text bold-text",
    msg: <span>&nbsp;</span>,
  });

  /* data management */
  const returnTransaction = {
    reset: function () {
      const newTrans = transactions;
      newTrans.forEach((tran) => {
        if (tran.forClosure) {
          if (tran.refunded === "false") {
            tran.forClosure = false;
          }
        }
        setTransactions([...newTrans]);
      });
    },
    add: function (depositArray, old) {
      const current = old ? old : transactions;

      setTransactions([...current, ...depositArray]);
      console.log(depositArray);
      return transactions;
    },
    ccTable: function (number = accounts[index].account) {
      // provide a number for a destination search and an array for cc search
      const destinationSearch = !Array.isArray(number) ? true : false;

      // labels change depending on how we're searching
      const items = destinationSearch
        ? {
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
          }
        : {
            labels: [
              "Calling System",
              "Status",
              "Destination",
              "CC Number",
              "Exp",
              "Amount",
              "Auth Code",
              "Order ID",
              "Add Date",
              "Vendor",
              "Transaction Type",
            ],
            values: [
              "system",
              "status",
              "account",
              "cc",
              "exp",
              "amount",
              "code",
              "order",
              "date",
              "vendor",
              "transaction",
            ],
          };

      const result = [];
      transactions.forEach((trans) => {
        if (trans.cc) {
          let match = true;

          // check to make sure the transaction is a match
          if (destinationSearch) {
            if (trans.account !== number) {
              match = false;
            }
          } else {
            // compare last 4
            if (number[1] !== trans.cc[1]) {
              match = false;
            } else {
              if (number[0]) {
                const input = number[0].toString().split("");
                const data = trans.cc[0].toString().split("");
                for (let i = 0; i < input.length; i += 1) {
                  if (input[i] !== data[i]) {
                    match = false;
                  }
                }
              }
            }
          }

          if (match === true) {
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
                    : item === "cc"
                    ? `${trans[item][0]}******${trans[item][1]}`
                    : trans[item];
                row.push(value);
                row2.push(value);
              } else {
                row.push(trans[item][0]);
                row2.push(trans[item][1]);
              }
            });

            result.unshift(row);
            result.unshift(row2);
          }
        }
      });
      return {
        thead: result.length > 0 ? [items.labels] : false,
        tbody: result.length > 0 ? result : false,
      };
    },
    filterRefundable: function (number = accounts[index].account) {
      const result = transactions.filter(
        (trans) => trans.account == number && trans.refundable === "true"
      );
      return result;
    },
    refund: function (transArray, closure) {
      const current = transactions;
      const refunds = [];
      let sum = 0;

      let commentObj = false;
      if (transArray[0] === "noCC") {
        const balance = transArray[1];
        transArray = [
          {
            account: accounts[index].account,
            system: "CARES",
            date: [formattedDate, props.formatTime()],
            amount: balance,
            type: "Refund",
            added: "CARES",
            comment: "",
            refunded: "false",
            refundable: false,
            increase: -1,
            summary: "Close Acct",
          },
        ];
        accounts[index].status = 3;

        // no cc
        commentObj = {
          date: formattedDate,
          time: props.formatTime(date),
          filter: "General",
          comment: `new.trainee submitted non-credit card check refund for $${balance}. New available balance $0.00. Account status set to Blocked.`,
          color: "black",
        };
        closure = false;
      }

      if (transArray.target) {
        transactions.forEach((tran) => {
          if (tran.forClosure) {
            if (tran.refunded === false || tran.refunded === "false") {
              sum = sum += parseFloat(tran.amount);
              tran.refunded = true;
            }
          }
        });

        accounts[index].status = 3;
        // account closure
        commentObj = commentObj
          ? commentObj
          : (commentObj = {
              date: formattedDate,
              time: props.formatTime(date),
              filter: "General",
              comment: `new.trainee added Account Closure request for amount $${sum.toFixed(
                2
              )} Transaction date: ${transArray[0].date[0]} ${
                transArray[0].date[1]
              }.`,
              color: "black",
            });
      } else {
        transArray.forEach((tran) => {
          if (closure) {
            tran.forClosure = true;
          } else {
            const refund = {
              refundable: false,
              increase: -1,
              type: "Refund",
              summary: "Close Acct",
            };

            refunds.push({ ...tran, ...refund });
            tran.refunded = true;
          }

          // refund
          commentObj = commentObj
            ? commentObj
            : (commentObj = {
                date: formattedDate,
                time: props.formatTime(date),
                filter: "General",
                comment: `new.trainee added refund request amount for ${tran.amount}. Transaction date: ${tran.date[0]} ${tran.date[1]}.`,
                color: "black",
              });
        });
      }

      returnAccount.comment(commentObj);
      if (closure) {
        return current;
      } else {
        const result = setTransactions([...current, ...refunds]);
      }
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

      if (elm.selectedIndex) {
      } else {
        if (split) {
          if (split[0] in result) {
            result[split[0]][split[1]] = elm.value;
          } else {
            result[split[0]] = { [split[1]]: elm.value };
          }
        } else {
          result[dataValue] = elm.value;
        }
      }
    });

    return result;
  }

  function createAccount() {
    const isCreated = document.querySelector("#as-account-type-select").value;
    const number = document.querySelector("#lookup-number").value;

    if (isCreated === "") {
      // determine account type popup
      setCreateOpen(true);
      return;
    }

    const accountsCopy = accounts;
    const newAccount = returnAccount.new(number);
    newAccount.created = "true";
    setIndex(newAccount.index);
    returnTransaction.add([
      {
        account: number,
        system: "CARES",
        date: [formattedDate, props.formatTime()],
        status: "APPROVED",
        amount: "0.00",
        type: "NewAccount",
        added: "new.trainee",
        comment: "",
        refunded: "true",
        refundable: "false",
        increase: "1",
        summary: false,
      },
    ]);
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

    // @todo - add prompt to override unsaved changes
    if (match) {
      // Match found
      if (match.index === index) {
        // same account
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
    if (page === "Account Summary") {
      const isTrue = (value) => value === true;
      const policyCopy = { ...accounts[index].policies, exp90: true };
      const setActive = Object.values(policyCopy).every(isTrue);

      if (setActive === true) {
        setPolBtnClass("active");
      } else {
        setPolBtnClass("");
      }
    }

    const links = document.querySelectorAll(".nav");
    links.forEach((link) => {
      link.classList.remove("active");
      if (link.innerText === page) {
        link.classList.add("active");
      }
    });
  };

  const addComment = (commentObj) => {
    const currentTime = props.formatTime();

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
    if (index === 0) {
      return;
    }

    const currStatus = document.querySelector('[data-form="status"]');
    if (accounts[index].status === currStatus.selectedIndex) {
      // nothing has changed
    } else {
      accounts[index].comments.push({
        date: formattedDate,
        time: props.formatTime(),
        filter: "general",
        comment: `new.trainee changed the account status to ${currStatus.value.toUpperCase()}.`,
        color: "black",
      });
    }

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

  const openPol = () => {
    setPolOpen(true);
  };

  const onReloadToggle = () => {
    const newAccounts = accounts;
    const newReload = {
      enabled: false,
      cancel: formattedDate,
      credit: "0.00",
    };

    newAccounts[index].autoReload = {
      ...newAccounts[index].autoReload,
      ...newReload,
    };

    setAccounts([...accounts, ...newAccounts]);
  };

  const onPolSubmit = (polObj) => {
    if (index === 0) {
      return false;
    } else {
      const pols = [
        {
          label: "cell",
          value: polObj.cell,
          isChanged: accounts[index].policies.cell !== polObj.cell,
          msg: "PCCellPhone",
        },
        {
          label: "fees",
          value: polObj.fees,
          isChanged: accounts[index].policies.fees !== polObj.fees,
          msg: "PCServiceFees",
        },
        {
          label: "exp90",
          value: polObj.exp90,
          isChanged: accounts[index].policies.exp90 !== polObj.exp90,
          msg: "PC90DaysAccountExpiration",
        },
        {
          label: "exp180",
          value: polObj.exp180,
          isChanged: accounts[index].policies.exp180 !== polObj.exp180,
          msg: "PC180DaysAccountExpiration",
        },
      ];

      // add comments
      const result = accounts;
      const account = result[index];
      for (let i = 0; i < pols.length; i += 1) {
        if (pols[i].isChanged) {
          // add comment
          const commentObj = {
            date: formattedDate,
            time: props.formatTime(date),
            filter: "General",
            comment: `new.trainee updated the account attribute for ${pols[i].msg} to ${pols[i].value}.`,
            color: "black",
          };

          account.comments.push(commentObj);

          // update policies
          account.policies[pols[i].label] = pols[i].value;
        }
      }

      // update obj
      setAccounts(result);

      // set as alert
      setAlert(
        returnLoadAlert(
          accounts[index].account,
          "policy check list(s) were updated"
        )
      );
    }
    return true;
  };

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
  asRight.push([
    <button
      type="button"
      id="as-pol-button"
      className={polBtnClass}
      onClick={openPol}
    >
      Policy Check List
    </button>,
  ]);

  const as = {
    thead: false,
    tbody: [{ tbody: asLeft }, { tbody: asRight }],
  };

  /* sets account summary default page */
  useEffect(() => {
    //setIndex(index);
    updatePageCss(page);
  }, [index, page, accounts]);

  const polContentObj = {
    top: "Policy Check List",
    content: (
      <div>
        <div>
          <input
            type="checkbox"
            id="as-pol-check-cell"
            defaultChecked={accounts[index].policies.cell}
          />
          <label>Cell phone/VOIP at own risk</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="as-pol-check-fees"
            defaultChecked={accounts[index].policies.fees}
          />
          <label>Service Fees</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="as-pol-check-exp90"
            defaultChecked={accounts[index].policies.exp90}
          />
          <label>90 Days Account Expiration</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="as-pol-check-exp180"
            defaultChecked={accounts[index].policies.exp180}
          />
          <label>180 Days Account Expiration</label>
        </div>
      </div>
    ),
    submit: "Save",
    close: "Close",
    grabData: function () {
      return {
        cell: document.getElementById("as-pol-check-cell").checked,
        fees: document.getElementById("as-pol-check-fees").checked,
        exp90: document.getElementById("as-pol-check-exp90").checked,
        exp180: document.getElementById("as-pol-check-exp180").checked,
      };
    },
    onSubmit: onPolSubmit,
  };

  const logo = `${process.env.PUBLIC_URL}/images/simulator-logo.png`;
  return (
    <>
      <CcAuths
        visible={isCcOpen}
        logo={logo}
        brand="CARES Simulator"
        setIsOpen={setCcOpen}
        transactions={transactions}
        searchTrans={returnTransaction}
        accounts={accounts}
        index={index}
        date={formattedDate}
      />
      <Popup2
        visible={isPolOpen}
        setIsOpen={setPolOpen}
        contentObj={polContentObj}
      />
      <Popup4 visible={isCreateOpen} setIsOpen={setCreateOpen} />
      <aside>
        <Sidebar
          logo={logo}
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
            facilities={facilities}
            fee={facilities[accounts[index].facility].fees[0]}
            index={index}
            data={as}
            date={formattedDate}
            time={props.formatTime}
            transactions={transactions}
            updateAlert={updateAlert}
            addComment={addComment}
            updateAccount={returnAccount.update}
            addTransaction={returnTransaction.add}
            returnRefundable={returnTransaction.filterRefundable}
            refund={returnTransaction.refund}
            resetClosure={returnTransaction.reset}
            returnRandomInt={props.returnRandomInt}
            returnMixedInt={props.returnMixedInt}
            cancelAutoReload={onReloadToggle}
          />
        </div>
      </div>
    </>
  );
}

export default App;
