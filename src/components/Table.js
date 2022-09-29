import React from "react";
import Row from "./Row";
import { v4 as uuid } from "uuid";

export default function Table(props) {
  const data = props.data;
  const propClass = props.page ? props.page.replace(/\s/g, "") : "table";

  return data.tbody ? (
    <>
      {props.search ? (
        <div className="flex gap-small pad-small">
          <label>Date Range: </label>{" "}
          <div>
            <label>Start Date: </label>
            <input type="date" defaultValue="2020-01-01" />
          </div>
          <div>
            <label>End Date: </label>
            <input type="date" defaultValue="2030-01-01" />
          </div>
          {props.search === "all" ? (
            <>
              <input type="checkbox" /> <label>Show All</label>
            </>
          ) : null}
          <button>Search</button>
          {props.search === "all" ? <button>Export All</button> : null}
        </div>
      ) : null}
      <table key={uuid()} className={propClass}>
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
    </>
  ) : (
    <>{props.message ? props.message : "There are no records to display..."}</>
  );
}
