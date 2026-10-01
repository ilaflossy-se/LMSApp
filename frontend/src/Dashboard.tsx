import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        width="240px"
        collapsedWidth="70px"
        transitionDuration={300}
        className="sidebar"
      >
        <Menu>

          {/* Кнопка открытия/закрытия */}
          <MenuItem
            onClick={() => setCollapsed(!collapsed)}
            className="sidebar-header"
          >
            ☰
            {!collapsed && <span className="logo-text"> Quiz App</span>}
          </MenuItem>

          {/* Главная */}
          <MenuItem onClick={() => alert('Home')}>
            Home
          </MenuItem>

          {/* Components */}
          <SubMenu label="Components">
            <MenuItem onClick={() => alert('Component 1')}>
              Component 1
            </MenuItem>

            <MenuItem onClick={() => alert('Component 2')}>
              Component 2
            </MenuItem>
          </SubMenu>

          {/* Профиль */}
          <MenuItem onClick={() => alert('Profile')}>
            Profile
          </MenuItem>

          {/* Настройки */}
          <MenuItem onClick={() => alert('Settings')}>
            Settings
          </MenuItem>

        </Menu>
      </Sidebar>

      {/* MAIN CONTENT */}
      <main className="main">
        <h1>Welcome to Your App</h1>

        <p>
          This is the main content area.
        </p>
      </main>

    </div>
  );
}

export default Dashboard;
