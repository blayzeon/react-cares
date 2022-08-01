import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Linklist from "./components/Linklist";
import "./style/app.css";

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

function App() {
  const [page, setPage] = useState("Account Summary");

  const updatePage = (newPage) => {
    setPage(newPage);
    console.log(page);
  };

  return (
    <>
      <aside>
        <Sidebar
          logo="../images/simulator-logo.png"
          brand="CARES Simulator"
          links={sidebarLinks}
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
            propClass="flex no-link bold"
            links={nav}
            click={updatePage}
          />
        </header>
        <main></main>
      </div>
    </>
  );
}

export default App;
