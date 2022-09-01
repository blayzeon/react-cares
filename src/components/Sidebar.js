import React, { useState } from "react";
import Linklist from "./Linklist";

export default function Sidebar(props) {
  const [account, setAccount] = useState(props.account.account);

  const handleChange = (e) => {
    const value = e.target.value;

    if (isNaN(value)) {
      return;
    } else {
      if (value !== "") {
        setAccount(value);
      }
    }
  };

  const handleSubmit = () => {
    props.loadAccount(account);
    console.log(props.account);
  };

  return (
    <div id="sidebar">
      <img src={props.logo} alt={props.brand} />
      <div className="input-group">
        <label htmlFor="lookup-number">Phone Number:</label>
        <input type="text" id="lookup-number" onChange={handleChange} />
        <button type="button" onClick={handleSubmit}>
          Lookup
        </button>
      </div>
      <Linklist links={props.links[0]} />
      <h4 className="navy-bg">Links</h4>
      <Linklist links={props.links[1]} />
    </div>
  );
}
