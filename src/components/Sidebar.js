import React, { useState } from "react";
import Linklist from "./Linklist";

export default function Sidebar(props) {
  const [account, setAccount] = useState("");

  const handleChange = (e) => {
    console.log(e);
  };

  return (
    <div id="sidebar">
      <img src={props.logo} alt={props.brand} />
      <div className="input-group">
        <label htmlFor="lookup-number">Phone Number:</label>
        <input type="text" id="lookup-number" onChange={handleChange} />
        <button type="button">Lookup</button>
      </div>
      <Linklist links={props.links[0]} />
      <h4 className="navy-bg">Links</h4>
      <Linklist links={props.links[1]} />
    </div>
  );
}
