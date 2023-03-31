import React from 'react';
import Sidebar from './pages/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="d-flex">
      <div className="w-auto">
        <Sidebar />
      </div>
      <div className="col">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
