import React from "react";

function FormButton(props) {
  return (
    <>
      <button
        className={props.btnClassName}
        variant={props.variant}
        onClick={props.onClick}
      >
        <span className={`text-dark fs-20 ${props.icon}`}></span>
        {props.btnText}
      </button>
    </>
  );
}

export default FormButton;
