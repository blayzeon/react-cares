import React from "react";
import { v4 as uuid } from "uuid";

export default function Linklist(props) {
  return (
    <ul className={props.propClass} key={uuid()}>
      {props.start ? <span key={uuid()}>{props.start}</span> : null}
      {props.links.map((item) => {
        const key = uuid();
        const handleClick = (e) => {
          console.log(item);
          if (item.click) {
            item.click(e.target);
          }
        };
        return (
          <li key={key} id={item.id ? item.id : key}>
            <a
              className={props.childClass}
              href={item.link}
              onClick={handleClick}
            >
              {item.label}
            </a>
            {props.between ? <span>{props.between}</span> : null}
          </li>
        );
      })}
      {props.end ? <span key={uuid()}>{props.end}</span> : null}
    </ul>
  );
}
