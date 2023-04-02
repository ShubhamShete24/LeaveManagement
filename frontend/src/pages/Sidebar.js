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
    <div className="sidebar d-flex justify-content-between flex-column bg-grey text-white p-3 vh-100">
      <div>
        <a className="p-3 text-decoration-none">
          {/* <i className="bi bi-code-slash fs-4 me-4" /> */}
          <span className="fs-3" style={{ color: '#f29105' }}>
            Steelsoft
          </span>
        </a>
        <hr className="mt-2 hr-color" />
        <ul className="nav nav-pills flex-column mt-3">
          <li className="nav-item p-2" onClick={() => setPath('/')}>
            <span className="p-1">
              <i className="bi bi-speedometer me-3 fs-4 icon-dark" />
              <span className="fs-4" style={{ color: '#f29105' }}>
                Dashboard
              </span>
            </span>
          </li>
          <li className="nav-item p-2" onClick={() => setPath('/user')}>
            <span className="p-1">
              <i className="bi bi-people me-3 fs-4 icon-dark" />
              <span className="fs-4" style={{ color: '#f29105' }}>
                Users
              </span>
            </span>
          </li>
          <li className="nav-item p-2" onClick={() => setPath('/leaves')}>
            <span className="p-1">
              <i className="bi bi-calendar-check me-3 fs-4 icon-dark" />
              <span className="fs-4" style={{ color: '#f29105' }}>
                Leave
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div>
        <hr className="mt hr-color" />
        <div className="nav-item">
          <span className="p3 text-decoration-none">
            <i className="bi bi-people-circle me-3 fs-4 icon-dark" />
            <span className="fs-4">
              <strong style={{ color: '#f29105' }}>you</strong>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
