import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function BidderHome() {
  return (
    <div>
      <nav className="navbar navbar-success bg-secondary mb-4 mt-2">
        <a href="#" className="navbar-brand text-light">
          Bidder Menu
        </a>
        <ul className="nav">
          <li className="nav-item">
            <Link to="clientbasic" className="nav-link text-light">
              Client Basic
            </Link>
          </li>
          <li className="nav-item">
            <Link to="clientproject" className="nav-link text-light">
              Client Project
            </Link>
          </li>
          <li className="nav-item">
            <Link to="updateproject" className="nav-link text-light">
              Update Project
            </Link>
          </li>
          <li className="nav-item">
            <Link to="qutation" className="nav-link text-light">
              Qutation Details
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
