import React from "react";
import "./style.css";

function Wrapper(props) {
  return <div className="container-fluid" {...props} />;
}

export default Wrapper;