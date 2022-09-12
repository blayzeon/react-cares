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
      {props.message ? (
        <div className={props.message.style}>{props.message.msg}</div>
      ) : null}
    </header>
  );
}
