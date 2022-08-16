import React from "react";
import Table from "./Table";
import Data from "./Data";
import { v4 as uuid } from "uuid";

export default function Row(props) {
  const content = [];
  const rows = [];
  props.data.forEach((item) => {
    if (Array.isArray(item)) {
      content.push(<Data data={item} key={uuid()} />);
    } else {
      content.push(
        <td key={uuid()}>
          <Table data={item} />
        </td>
      );
    }
  });

  return (
    <>
      {content.map((item) => {
        return <tr key={uuid()}>{item}</tr>;
      })}
    </>
  );
}

/*
    {props.data.map((row) => {
        return <td key={row}>{row}</td>;
      })}
*/
