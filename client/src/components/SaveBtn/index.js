import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
  return (
    <button type="button" class="btn btn-info save-btn" {...props} role="button" tabIndex="1">Save</button>
  );
}

export default SaveBtn;
