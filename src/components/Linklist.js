import React from "react";

export default function Linklist(props) {
  const handleClick = (e) => {
    if (props.click) {
      props.click(e.target.innerText);
    }
  };
  return (
    <ul className={props.propClass}>
      {props.links.map((item) => {
        return (
          <li key={item.label}>
            <a
              className={props.childClass}
              href={item.link}
              onClick={handleClick}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
