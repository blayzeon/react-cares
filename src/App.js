import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Linklist from "./components/Linklist";
import Main from "./components/Main";
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

const as = {
  thead: [[1, 2, 3]],
  tbody: [
    ["body1", "body2", "aa"],
    ["body3", "body4", "aa"],
  ],
};

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
