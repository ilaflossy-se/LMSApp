import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
