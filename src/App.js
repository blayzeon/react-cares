import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import Main from "./components/Main";
import { v4 as uuid } from "uuid";
import accounts from "./data/accounts.json";
import "./style/app.css";

const date = new Date();

const formattedDate = date.toLocaleDateString({
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return strTime;
}

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
  },
  {
    link: "#",
    label: "Transactions",
    id: "page-transactions",
  },
  {
    link: "#",
    label: "Refund",
    id: "page-refund",
  },
  {
    link: "#",
    label: "Transaction Summary",
    id: "page-transaction-summary",
  },
  {
    link: "#",
    label: "CC Auths",
    id: "page-cc-auths",
  },
  {
    link: "#",
    label: "Call Records",
    id: "page-call-records",
  },
  {
    link: "#",
    label: "TAG Comments",
    id: "page-tag-comments",
  },
  {
    link: "#",
    label: "Statements",
    id: "page-statements",
  },
  {
    link: "#",
    label: "Auto Reload",
    id: "page-auto-reload",
  },
  {
    link: "#",
    label: "Alerts",
    id: "page-alerts",
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
        <textarea key={uuid()}></textarea>
      ) : (
        <input
          style={labelObj.style ? labelObj.style : { display: "block" }}
          key={uuid()}
          id={labelObj.id}
          type={labelObj.type}
        />
      );
    result.push(toPush);
  } else {
    for (let i = 0; i < labelObj.type; i += 1) {
      const tempId = i === 0 ? labelObj.id : `${labelObj.id}-${i}`;
      const tempStyle = i === 0 ? { display: "block" } : { width: 40 + "px" };
      result.push(
        <input key={uuid()} id={tempId} type="text" style={tempStyle} />
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

function App() {
  const defaultAccount = accounts[0];
  const [page, setPage] = useState("");
  const [account, setAccount] = useState(defaultAccount);

  const loadAccount = (number) => {
    // find an account match on accounts.json
    const match = accounts.find((account) => account.account === number);

    // return either the account or a blank account
    const currentAccount = match ? match : defaultAccount;
    setAccount(currentAccount);
  };

  const updatePage = (target) => {
    const active = target ? target : document.querySelector(".nav");
    setPage(active.innerText);

    // update the css
    const links = document.querySelectorAll(".nav");
    links.forEach((link) => {
      if (link.innerText === page) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  /* data */
  const formItems1 = [
    {
      label: "First Name: ",
      id: "as-first-name",
      placeholder: false,
      style: false,
      type: "text",
    },
    {
      label: "Last Name: ",
      id: "as-last-name",
      placeholder: false,
      style: false,
      type: "text",
    },
    {
      label: "Address 1: ",
      id: "as-address-1",
      placeholder: false,
      style: false,
      type: "text",
    },
    {
      label: "Address 2: ",
      id: "as-address-2",
      placeholder: false,
      style: false,
      type: "text",
    },
    {
      label: "Zip Code: ",
      id: "as-zip-code",
      placeholder: false,
      style: { width: 80 + "px" },
      type: "text",
    },
    {
      label: "City, State: ",
      id: "as-city-state",
      placeholder: false,
      style: "form-city-state",
      type: 2,
    },
    {
      label: "Phone Number: ",
      id: "as-phone-number",
      placeholder: false,
      style: false,
      type: "text",
    },
    {
      label: "Alt Number: ",
      id: "as-alt-number",
      placeholder: false,
      style: false,
      type: "text",
    },
    {
      label: "Email: ",
      id: "as-email",
      placeholder: false,
      style: false,
      type: "text",
    },
    {
      label: "Federal Tax ID: ",
      id: "as-fed-tax",
      placeholder: false,
      style: false,
      type: "text",
    },
    {
      label: "IVR Passcode: ",
      id: "as-passcode",
      placeholder: false,
      style: false,
      type: "text",
    },
  ];

  const formItems2 = [
    {
      label: "Tax Exempt: ",
      id: "as-tax-exempt",
      placeholder: false,
      style: false,
      type: "checkbox",
    },
    {
      label: "Notes: ",
      id: "as-notes",
      placeholder: false,
      style: false,
      type: "textarea",
    },
    {
      label: "Authorized User: ",
      id: "as-authorized-user",
      placeholder: false,
      style: false,
      type: "text",
    },
    {
      label: "Original LEC: ",
      id: "as-original-lec",
      placeholder: false,
      style: false,
      type: "text",
    },
    {
      label: "Last Facility Called: ",
      id: "as-last-fac",
      placeholder: false,
      style: false,
      type: "text",
    },
  ];

  const asLeft = tableArray(formItems1);
  asLeft.push([
    <button type="button">Save Changes</button>,
    <button type="button">BNA This Number</button>,
  ]);

  const asRight = tableArray(formItems2);
  asRight.push([
    <label key="as-select-label" htmlFor="as-select">
      Originating Facilities:
    </label>,
    <select
      size="4"
      key="as-select"
      id="as-select"
      style={{ width: 350 + "px" }}
    ></select>,
  ]);
  asRight.push([<button type="button">Policy Check List</button>]);

  const as = {
    thead: false,
    tbody: [{ tbody: asLeft }, { tbody: asRight }],
  };

  /* sets account summary default page */
  useEffect(() => {
    updatePage();
  }, []);

  return (
    <>
      <aside>
        <Sidebar
          logo="../images/simulator-logo.png"
          brand="CARES Simulator"
          links={sidebarLinks}
          account={account}
          loadAccount={loadAccount}
        />
      </aside>
      <div id="content" className="flex-grow">
        <Nav
          topLinks={topLinks}
          nav={nav}
          updatePage={updatePage}
          account={account}
          page={page}
        />
        <Main
          page={page}
          account={account}
          data={as}
          date={formattedDate}
          time={formatTime}
        />
      </div>
    </>
  );
}

export default App;
