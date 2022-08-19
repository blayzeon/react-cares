import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Linklist from "./components/Linklist";
import Main from "./components/Main";
import { v4 as uuid } from "uuid";
import "./style/app.css";

function generateData() {
  const date = new Date();

  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

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
  },
  {
    link: "#",
    label: "Transactions",
  },
  {
    link: "#",
    label: "Refund",
  },
  {
    link: "#",
    label: "Transaction Summary",
  },
  {
    link: "#",
    label: "CC Auths",
  },
  {
    link: "#",
    label: "Call Records",
  },
  {
    link: "#",
    label: "TAG Comments",
  },
  {
    link: "#",
    label: "Statements",
  },
  {
    link: "#",
    label: "Auto Reload",
  },
  {
    link: "#",
    label: "Alerts",
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

/*
  const as = {
  thead: [[1, 2]],
  tbody: [
    { thead: false, tbody: [["text", "text"]] },
    { thead: false, tbody: [["text", "text"]] },
  ],
};

*/

function App() {
  const [page, setPage] = useState("Account Summary");
  const [account, setAccount] = useState("");

  const loadAccount = (number) => {
    setAccount(number);
  };

  const updatePage = (target) => {
    setPage(target.innerText);
    const links = document.querySelectorAll(".nav");
    links.forEach((item) => {
      item.classList.remove("active");
    });

    target.classList.add("active");
  };

  return (
    <>
      <aside>
        <Sidebar
          logo="../images/simulator-logo.png"
          brand="CARES Simulator"
          links={sidebarLinks}
          loadAccount={loadAccount}
        />
      </aside>
      <div id="content" className="flex-grow">
        <header>
          <Linklist
            propClass="navy-bg flex"
            childClass="blue-hover"
            links={topLinks}
          />
          <span>
            Current Path: Home {">"} Billing {">"} CARES
          </span>
          <Linklist
            propClass="flex no-link bold blue-bg"
            childClass="nav"
            links={nav}
            click={updatePage}
          />
        </header>
        <Main page={page} account={account} data={as} />
      </div>
    </>
  );
}

export default App;
