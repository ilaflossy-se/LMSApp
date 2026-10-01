
import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './Home';

function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

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


          {/* HOME */}
          <MenuItem onClick={() => navigate('/home')}>
            Home
          </MenuItem>


          {/* COMPONENTS */}
          <SubMenu label="Components">

            <MenuItem>
              Component 1
            </MenuItem>

            <MenuItem>
              Component 2
            </MenuItem>

          </SubMenu>


          {/* PROFILE */}
          <MenuItem>
            Profile
          </MenuItem>


          {/* SETTINGS */}
          <MenuItem>
            Settings
          </MenuItem>

        </Menu>

      </Sidebar>


      {/* CONTENT */}
      <main className="main">

        <Routes>

          <Route
            path="/home"
            element={<Home />}
          />

        </Routes>

      </main>

    </div>
  );
}

export default Main;