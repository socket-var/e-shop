import React from "react";

const PaginationFooter = props => {
  const buttons = [];
  buttons.push(
    <button key={"<<"} onClick={props.onSliderClick} value={"<<"} disabled={(props.buttons[1] === 2 ? "disabled" : "")}>
      {"<<"}
    </button>
  );
  for (let index = 0; index < props.buttons.length; index++) {
    buttons.push(
      <button
        key={props.buttons[index]}
        onClick={props.onPaginationButtonClick}
        value={props.buttons[index]}
      >
        {props.buttons[index]}
      </button>
    );
  }
  buttons.push(
    <button key={">>"} onClick={props.onSliderClick} value={">>"} disabled={(props.buttons[props.buttons.length-1] === props.lastPageNumber ? "disabled" : "")}> 
      {">>"}
    </button>
  );

  return <div className="pagination">{buttons}</div>;
};

export default PaginationFooter;
