
import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';

import Dashboard from './Dashboard';
import Footer from './Footer';
import Profile from './Profile';

function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="main-container">

      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        width="240px"
        collapsedWidth="70px"
        transitionDuration={300}
        className="sidebar"
      >

        <Menu>

          {/* MENU BUTTON */}
          <MenuItem
            onClick={() => setCollapsed(!collapsed)}
            className="sidebar-header"
          >
            ☰
            {!collapsed && (
              <span className="logo-text">
                Quiz App
              </span>
            )}
          </MenuItem>

          {/* DASHBOARD */}
          <MenuItem
            active={location.pathname === '/dashboard'}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </MenuItem>

          {/* PROFILE */}
          <MenuItem
            active={location.pathname === '/profile'}
            onClick={() => navigate('/profile')}
          >
            Profile
          </MenuItem>

          {/* SETTINGS */}
          <MenuItem
            active={location.pathname === '/settings'}
            onClick={() => navigate('/settings')}
          >
            Settings
          </MenuItem>

        </Menu>

      </Sidebar>

      {/* RIGHT SIDE */}
      <div className="content-container">

        <main className="main">

          <Routes>

            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/settings"
              element={<div><h1>Settings</h1></div>}
            />

          </Routes>

        </main>

        <Footer />

      </div>

    </div>
  );
}

export default Main;
