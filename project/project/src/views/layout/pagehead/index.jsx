import React from "react";

import "./style.css";

export default function footer(props) {
  return (
    <>
      {/* Begin Page Content */}
      <div className="container-fluid">
        {/* Page Heading */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">{props.header}</h1>
          {props.buttonText && <button
            onClick={props.onClick}
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i className="fas fa-plus fa-sm text-white-50"></i> {props.buttonText}
          </button>}
        </div>
      </div>
      {/* /.container-fluid */}
    </>
  );
}
