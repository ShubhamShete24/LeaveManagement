import React from 'react';
import './dashboard.css';

function Dashboard() {
  return (
    <div>
      Dashboard
      <div className="nav-is-default">
        <header className="nav-top">
          <button type="button" className="nav-toggle" id="navSideToggle">
            <span className="sr-only">Menu</span>
            <span className="ham-bars">.</span>
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
            <li className="nav-side-button">
              <a className="button" href="#">
                <span className="icon material-icons">add</span>
                <span className="link-text">Add new goal</span>
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
          <div className="content-block">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">.</div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="module-row row">
              <div className="module col-sm-6">
                <div className="content-block">.</div>
              </div>
              <div className="module col-sm-6">
                <div className="content-block">.</div>
              </div>
            </div>
            <div className="module-row row">
              <div className="module col-md-4">
                <div className="content-block">.</div>
              </div>
              <div className="module col-md-4">
                <div className="content-block">.</div>
              </div>
              <div className="module col-md-4">
                <div className="content-block">.</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
