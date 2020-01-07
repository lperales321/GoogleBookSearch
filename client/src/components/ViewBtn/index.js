import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function ViewBtn({children}) {
  return (
    <a href={children} type="button" class="btn btn-info view-btn active" role="button" tabIndex="0">View</a>
  );
}

export default ViewBtn;
