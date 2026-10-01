
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Login';
import Main from './Main';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Главная страница */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Основное приложение */}
        <Route path="/*" element={<Main />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
