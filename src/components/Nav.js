import React from "react";
import Linklist from "./Linklist";

export default function Nav(props) {
  return (
    <header>
      <Linklist
        propClass="navy-bg flex gap-small"
        childClass="blue-hover"
        links={props.topLinks}
      />
      <span>
        Current Path: Home {">"} Billing {">"} CARES
      </span>
      <Linklist
        propClass="flex gap-small no-link bold blue-bg"
        childClass="nav"
        links={props.nav}
        click={props.updatePage}
      />
      {!props.account.created && props.page === "Account Summary" ? (
        <div className="green-blue-bg pad-left blue-text">
          Account not Found. Would you like to create one?{" "}
          <button type="button">Create Account</button>
        </div>
      ) : null}
    </header>
  );
}
