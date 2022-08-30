import React from "react";
import Row from "./Row";
import { v4 as uuid } from "uuid";

export default function Table(props) {
  const data = props.data;
  const propClass = props.page ? props.page.replace(/\s/g, "") : "table";
  return (
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
  );
}
