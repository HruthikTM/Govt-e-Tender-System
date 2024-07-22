import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function govtadmin() {
  return (
    <div>
      <nav className="navbar navbar-success bg-secondary mb-4 mt-2">
        <a href="#" className="navbar-brand text-light">
          Government Dashboard
        </a>
        <ul className="nav">
          <li className="nav-item">
            <Link to="adddept" className="nav-link text-light">
              AddDepartment
            </Link>
          </li>
          <li className="nav-item">
            <Link to="adddepthead" className="nav-link text-light">
              AddDepartmentHead
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
