import React from "react";
import Table from "./Table";
import transactions from "../data/transactions.json";

function returnTransactions(account) {}

export default function Main(props) {
  //console.log(transactions);
  return <Table data={props.data} />;
}
