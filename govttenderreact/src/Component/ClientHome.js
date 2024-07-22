import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function ClientHome() {
  return (
    <div>
      <nav className="navbar navbar-success bg-secondary mb-4 mt-2">
        <a href="#" className="navbar-brand text-light">
          Client Menu
        </a>
        <ul className="nav">
          <li className="nav-item">
            <Link to="viewproject" className="nav-link text-light">
              View Project
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
