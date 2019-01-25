import React from "react";
import "./PaginationFooter.css";

const PaginationFooter = props => {
  const buttons = [];
  buttons.push(
    <button key={"<<"} onClick={props.onPaginationClick} value={"<<"} disabled={(props.buttons[1] === 2 ? "disabled" : "")}>
      {"<<"}
    </button>
  );
  for (let index = 0; index < props.buttons.length; index++) {
    
    buttons.push(
      <button
        key={index+1}
        data-key={index}
        onClick={props.onPaginationClick}
        value={props.buttons[index]}
        className={props.activeButton === index ? "active" : ""}
      >
        {props.buttons[index]}
      </button>
    );
  }

  buttons.push(
    <button key={">>"} onClick={props.onPaginationClick} value={">>"} disabled={(props.buttons[props.buttons.length-1] === props.lastPageNumber ? "disabled" : "")}> 
      {">>"}
    </button>
  );

  return <div className="pagination">{buttons}</div>;
};

export default PaginationFooter;
