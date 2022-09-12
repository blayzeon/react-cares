import React, { useState } from "react";
import Linklist from "./Linklist";

export default function Sidebar(props) {
  const [account, setAccount] = useState(props.account.account);

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
      newVal.toString();
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
      <img src={props.logo} alt={props.brand} />
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
