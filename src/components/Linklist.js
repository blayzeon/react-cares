import React from "react";
import { v4 as uuid } from "uuid";

export default function Linklist(props) {
  const handleClick = (e) => {
    if (props.click) {
      props.click(e.target);
    }
  };
  return (
    <ul className={props.propClass} key={uuid()}>
      {props.start ? <span key={uuid()}>{props.start}</span> : null}
      {props.links.map((item) => {
        return (
          <>
            <li key={uuid()}>
              <a
                key={uuid()}
                className={props.childClass}
                href={item.link}
                onClick={handleClick}
              >
                {item.label}
              </a>
            </li>
            {props.between ? <span key={uuid()}>{props.between}</span> : null}
          </>
        );
      })}
      {props.end ? <span key={uuid()}>{props.end}</span> : null}
    </ul>
  );
}
