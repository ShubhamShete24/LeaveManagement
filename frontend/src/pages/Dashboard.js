import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

// eslint-disable-next-line react/prop-types
function Dashboard({ Toggle }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand d-none d-md-block" href="#" onClick={Toggle}>
            Dashboard
          </a>
          <a className="navbar-brand  d-block d-md-none" href="#" onClick={Toggle}>
            <i className="bi bi-justify" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              Hidden brand
            </a>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2 rounded border">
                <Link className="nav-link active" aria-current="page" to="/user">
                  Account
                </Link>
              </li>
              <li className="nav-item rounded border">
                <a className="nav-link" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Dashboard;
