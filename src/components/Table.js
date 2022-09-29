import React, { useState } from "react";
import Row from "./Row";
import { v4 as uuid } from "uuid";

export default function Table(props) {
  const [isVisible, setVisible] = useState(props.hidden ? "display-none" : "");
  const handleClick = () => {
    setVisible("");
  };
  const data = props.data;
  const propClass = props.page ? props.page.replace(/\s/g, "") : "table";
  const message = props.message
    ? props.message
    : "There are no records to display...";

  return (
    <>
      {props.search ? (
        <div className="flex gap-small pad-small no-border">
          <label>Date Range: </label>{" "}
          <div>
            <input type="date" defaultValue="2020-01-01" />
          </div>
          <div>
            <input type="date" defaultValue="2030-01-01" />
          </div>
          {props.search === "all" ? (
            <>
              <input type="checkbox" /> <label>Show All</label>
            </>
          ) : null}
          <button onClick={handleClick}>Search</button>
          {props.search === "all" ? <button>Export All</button> : null}
        </div>
      ) : null}
      {data.tbody.length > 0 ? (
        <table key={uuid()} className={propClass + " " + isVisible}>
          {props.caption ? props.caption : null}
          {data.thead ? (
            <thead>
              <Row data={data.thead} />
            </thead>
          ) : null}
          {data.tbody ? (
            <tbody>
              <Row data={data.tbody} />
            </tbody>
          ) : null}
        </table>
      ) : (
        message
      )}
    </>
  );
}

/* 
 
*/
