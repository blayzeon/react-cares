import React from "react";
import Linklist from "./Linklist";
import { v4 as uuid } from "uuid";

export default function As(props) {
  const controls = [
    {
      link: "#",
      label: "CC Deposit |",
    },
    {
      link: "#",
      label: "Other Deposit |",
    },
    {
      link: "#",
      label: "Withdrawal |",
    },
    {
      link: "#",
      label: "Funds Transfer |",
    },
    {
      link: "#",
      label: "Adj Increase |",
    },
    {
      link: "#",
      label: "Adj Decrease |",
    },
    {
      link: "#",
      label: "Chargeback |",
    },
    {
      link: "#",
      label: "Ret Check",
    },
  ];
  return (
    <>
      <span id="adjustment-controls" className="no-link" key={uuid()}>
        <Linklist
          links={controls}
          propClass="flex"
          childClass="no-pad"
          start="Add ("
          end=")"
        />
      </span>
    </>
  );
}
