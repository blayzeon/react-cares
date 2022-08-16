import React from "react";
import { v4 as uuid } from "uuid";

export default function Data(props) {
  return props.data.map((item) => {
    return <td key={uuid()}>{item}</td>;
  });
}
