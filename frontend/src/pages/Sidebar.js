import React, { useEffect, useState } from 'react';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const [path, setPath] = useState();
  useEffect(() => {
    if (path !== '') {
      navigate(path);
    }
  }, [navigate, path]);
  return (
    <div className="sidebar d-flex justify-content-between flex-column bg-dark text-white p-3 vh-100">
      <div>
        <a className="p-3 text-decoration-none text-white">
          <i className="bi bi-code-slash fs-4 me-4" />
          <span className="fs-3">Sidebar </span>
        </a>
        <hr className="text-white mt-2" />
        <ul className="nav nav-pills flex-column mt-3">
          <li className="nav-item p-2" onClick={() => setPath('/')}>
            <span className="p-1">
              <i className="bi bi-speedometer me-3 fs-4" />
              <span className="fs-4">Dashboard</span>
            </span>
          </li>
          <li className="nav-item p-2" onClick={() => setPath('/user')}>
            <span className="p-1">
              <i className="bi bi-people me-3 fs-4" />
              <span className="fs-4">Users</span>
            </span>
          </li>
          <li className="nav-item p-2" onClick={() => setPath('/leaves')}>
            <span className="p-1">
              <i className="bi bi-calendar-check me-3 fs-4" />
              <span className="fs-4">Leave</span>
            </span>
          </li>
        </ul>
      </div>
      <div>
        <hr className="text-white mt" />
        <div className="nav-item">
          <span className="p3 text-decoration-none text-white">
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
