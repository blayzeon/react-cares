import React from "react";
import Table from "./Table";
import Data from "./Data";

export default function Row(props) {
  return (
    <>
      {props.data.map((row) => {
        return (
          <tr key={row}>
            <Data data={row} />
          </tr>
        );
      })}
    </>
  );
}

/*
    {props.data.map((row) => {
        return <td key={row}>{row}</td>;
      })}
*/
