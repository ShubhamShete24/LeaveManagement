import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import LeavePage from '../components/Leaves';

function Paths() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leave" element={<LeavePage />} />
      </Routes>
    </div>
  );
}

export default Paths;
