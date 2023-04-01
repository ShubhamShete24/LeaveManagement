import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import Dashboard from './pages/Dashboard';
import Home from './components/Home';
import Contact from './components/Contact';
import User from './components/User';
import Leaves from './components/Leaves';

function App() {
  const [toggle, setToggle] = useState(false);
  function Toggle() {
    setToggle(!toggle);
  }

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth > 768) {
        setToggle(false);
      }
    };
    window.addEventListener('resize', handleSize);
    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="d-flex">
        <div className={toggle ? 'd-none' : 'w-auto position-fixed'}>
          <Sidebar />
        </div>
        <div className={toggle ? 'd-none' : 'invisible'}>
          <Sidebar />
        </div>
        <div className="col overflow-auto">
          <Dashboard
            Toggle={() => {
              Toggle();
            }}
          />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user" element={<User />} />
            <Route path="/leaves" element={<Leaves />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
