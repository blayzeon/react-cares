import React from "react";
import Row from "./Row";

export default function Table(props) {
  const data = props.data;
  return (
    <table>
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
