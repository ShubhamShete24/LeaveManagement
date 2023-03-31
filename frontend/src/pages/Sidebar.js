import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar d-flex justify-content-between flex-column bg-dark text-white p-3 vh-100">
      <div>
        <a href="">
          <i className="bi bi-code-slash fs-4 me-4" />
          <span className="fs-3">Sidebar </span>
        </a>
        <hr className="text-white mt-2" />
        <ul className="nav nav-pills flex-column mt-3">
          <li className="nav-item p-2">
            <span className="p-1">
              <i className="bi bi-speedometer-2 me-3 fs-4" />
              <span className="fs-4">
                <strong>Dashboard</strong>
              </span>
            </span>
          </li>
          <li>
            <span className="p-1">
              <i className="bi bi-people-2 me-3 fs-4" />
              <span className="fs-4">
                <strong>Users</strong>
              </span>
            </span>
          </li>
          <li>
            <span className="p-1">
              <i className="bi bi-people-2 me-3 fs-4" />
              <span className="fs-4">
                <strong>Orders</strong>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div>
        <hr className="text-white mt" />
        <div className="nav-item">
          <span className="p3">
            <i className="bi bi-people-circle me-3 fs-4" />
            <span className="fs-4">
              <strong>you</strong>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
