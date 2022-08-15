import React from "react";

export default function Data(props) {
  return props.data.map((item) => {
    return <td key={item}>{item}</td>;
  });
}
