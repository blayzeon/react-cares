import React from "react";
import Table from "./Table";
import transactions from "../data/transactions.json";

function returnTransactions(account) {}

const table = [
  {
    type: "table",
    thead: ["Date", "Type", "Added By", "Amount", "Balance", "Comment"],
    tbody: [
      [1, 2, 3, 0, 9, 8],
      [4, 5, 6, 7, 6, 5],
      [7, 8, 9, 4, 3, 2],
    ],
  },
];

export default function Main(props) {
  //console.log(transactions);
  return <Table data={table} />;
}
