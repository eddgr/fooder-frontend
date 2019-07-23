import React from "react";

import { Link } from "react-router-dom";

export default function TabbedBar(props) {
  return (
    <div
      className="navbar bg-light fixed-bottom p-0"
      style={{ height: "50px" }}
    >
      <div className="col-6 text-center">
        <Link
          to="/"
          className="nav-link text-dark"
          onClick={() => props.notInChat()}
        >
          <i className="fas fa-home"></i>
        </Link>
      </div>
      <div className="col-6 text-center">
        <Link
          to="/likes"
          className="nav-link text-dark"
          onClick={() => props.notInChat()}
        >
          <i className="fas fa-heart"></i>
        </Link>
      </div>
    </div>
  );
}
