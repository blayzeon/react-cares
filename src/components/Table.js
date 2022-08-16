import React from "react";
import Row from "./Row";

export default function Table(props) {
  const data = props.data;
  return (
    <table>
      {data.thead ? (
        <thead>
          <tr>
            <Row data={data.thead} />
          </tr>
        </thead>
      ) : null}
      {data.tbody ? (
        <tbody>
          <tr>
            <Row data={data.tbody} />
          </tr>
        </tbody>
      ) : null}
    </table>
  );
}
