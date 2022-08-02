import React from "react";
import Linklist from "./components/Linklist";

export default function As(props) {
  const controls = [
    {
      link: "#",
      label: "CC Deposit",
    },
    {
      link: "#",
      label: "Other Deposit",
    },
    {
      link: "#",
      label: "Withdrawal",
    },
    {
      link: "#",
      label: "Funds Transfer",
    },
    {
      link: "#",
      label: "Adj Increase",
    },
    {
      link: "#",
      label: "Adj Decrease",
    },
    {
      link: "#",
      label: "Chargeback",
    },
    {
      link: "#",
      label: "Ret Check",
    },
  ];
  return (
    <>
      <span>{props.status}</span>
      <span>
        Add {"("} <Linklist links={controls} /> {")"}
      </span>
    </>
  );
}
