import React, { useState } from "react";
import Linklist from "./Linklist";

export default function Sidebar(props) {
  const [account, setAccount] = useState(props.account.account);

  const info = () => {
    const msg = `Created by Kristine Carter for ConnectNetwork training purposes. \n
    Pre-made accounts:
    * 2085551100 - 2085554499
    * Last 4 of 1100-1199 are new accounts
    * Last 4 of 2200-2299 are partial accounts
    * Last 4 of 3300-3399 are broken accounts (expired & written off)
    * Last 4 of 4400-4499 are established accounts \n
    * 0114401205551111 international number
    * 2085559911 complete bna with no call history & auto reload
    * 2085559922 - write off under $1
    * 2085559933 - refund pending
    Last major update: October 2022`;
    alert(msg);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    return false;
  };

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;

    if (isNaN(value)) {
      // prevent letters
      let newVal = [...value];
      newVal.pop();
      newVal = newVal.join("");
      e.target.value = newVal;

      return;
    } else {
      if (value !== "") {
        setAccount(value);
      }
    }
  };

  const handleSubmit = () => {
    if (account === "") return;
    props.loadAccount(account);
  };

  return (
    <div id="sidebar">
      <img src={props.logo} alt={props.brand} onClick={info} />
      <form className="input-group" onSubmit={formSubmit}>
        <label htmlFor="lookup-number">Phone Number:</label>
        <input type="text" id="lookup-number" onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>
          Lookup
        </button>
      </form>
      <Linklist links={props.links[0]} propClass="flex-column gap-tiny" />
      <h4 className="navy-bg small-margin margin-top">Links</h4>
      <Linklist links={props.links[1]} propClass="flex-column gap-tiny" />
    </div>
  );
}
