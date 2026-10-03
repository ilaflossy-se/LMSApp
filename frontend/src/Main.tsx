import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";

import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Deadlines from "./Deadlines";
import Schedule from "./Schedule";
import Profile from "./Profile";
import Settings from "./Settings";
import Footer from "./Footer";

const NAV = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/courses", label: "Courses" },
  { path: "/deadlines", label: "Deadlines" },
  { path: "/schedule", label: "Schedule" },
  { path: "/profile", label: "Profile" },
  { path: "/settings", label: "Settings" },
];

function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!localStorage.getItem("token")) return <Navigate to="/login" replace />;

  return (
    <div className="main-container">
      <Sidebar collapsed={collapsed} width="240px" collapsedWidth="70px" transitionDuration={300} className="sidebar">
        <Menu>
          <MenuItem onClick={() => setCollapsed(!collapsed)} className="sidebar-header">
            ☰{!collapsed && <span className="logo-text"> LMS</span>}
          </MenuItem>

          {NAV.map(item => (
            <MenuItem
              key={item.path}
              active={location.pathname === item.path}
              icon={<span className="nav-icon">{item.label[0]}</span>}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>

      <div className="content-container">
        <main className="main">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/deadlines" element={<Deadlines />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Main;