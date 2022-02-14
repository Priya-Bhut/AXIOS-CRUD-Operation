import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  return (
    <div className="main">
      <div className="wrapper">
        <nav className="sidebar">
          <h2>DATA</h2>
          <Link className="link" to="/Home">
            Home
          </Link>
          <br />
          <Link className="link" to="/ReadData">
            ReadData
          </Link>
          <br />
          <Link className="link" to="/AddData">
            AddData
          </Link>
          <br />
          {/* <Link className="link" to="/UpdateData">
            UpdateData
          </Link> */}
          <br />
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
