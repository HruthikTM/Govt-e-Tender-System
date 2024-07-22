import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function DeptHead() {
  return (
    <div>
      <nav className="navbar navbar-success bg-secondary mb-4 mt-2">
        <a href="#" className="navbar-brand text-light">
          Department Head Menu
        </a>
        <ul className="nav">
          <li className="nav-item">
            <Link to="workdetails" className="nav-link text-light">
              Work Details
            </Link>
          </li>
          <li className="nav-item">
            <Link to="createtender" className="nav-link text-light">
              Create Tender
            </Link>
          </li>
          <li className="nav-item">
            <Link to="viewtenderdetails" className="nav-link text-light">
              View Tender Details
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link text-light">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <div className="container"></div>
    </div>
  );
}
