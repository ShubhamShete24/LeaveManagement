import React, { useEffect } from 'react';
import './dashboard.css';

function Dashboard() {
  useEffect(() => {
    const navSideBtn = document.getElementById('navSideToggle');
    navSideBtn.addEventListener('click', () => {
      document.body.classList.toggle('nav-is-toggled');
      document.body.classList.toggle('nav-is-default');
    });

    return () => {
      navSideBtn.removeEventListener('click');
    };
  }, []);
  return (
    <div>
      Dashboard
      <body className="nav-is-default">
        <header className="nav-top">
          <button type="button" className="nav-toggle" id="navSideToggle">
            <span className="ham-bars" />
          </button>
        </header>
        <aside className="nav-side">
          <ul className="nav-side-links">
            <li className="nav-side-item">
              <a className="nav-link active" href="#">
                <span className="icon material-icons">dashboard</span>
                <span className="link-text">Dashboard</span>
              </a>
            </li>
            <li className="nav-side-item">
              <a className="nav-link" href="#">
                <span className="icon material-icons">settings</span>
                <span className="link-text">Accounts</span>
              </a>
            </li>
            <li className="nav-side-item">
              <a className="nav-link" href="#">
                <span className="icon material-icons">flag</span>
                <span className="link-text">Goals</span>
              </a>
            </li>
            <li className="nav-side-item">
              <a className="nav-link" href="#">
                <span className="icon material-icons">show_chart</span>
                <span className="link-text">Funds</span>
              </a>
            </li>
            <li className="nav-side-item">
              <a className="nav-link" href="#">
                <span className="icon material-icons">inbox</span>
                <span className="link-text">Inbox</span>
              </a>
            </li>
          </ul>
        </aside>
        <section className="main-content">
          <div className="hero">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <h1>Welcome back!</h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </body>
    </div>
  );
}

export default Dashboard;
