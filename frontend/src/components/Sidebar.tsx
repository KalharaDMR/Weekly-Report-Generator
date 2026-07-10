import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import "./Sidebar.css"; // <-- import the CSS

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <h2 className="sidebar-brand">📋 Weekly Reports</h2>
      <hr className="sidebar-divider" />

      <div className="sidebar-user">
        <span className="sidebar-user-name">{user?.name}</span>
        <span className="sidebar-user-role">{user?.role?.replace("_", " ")}</span>
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
        <Link to="/reports" className="sidebar-link">Reports</Link>

        {user?.role !== "TEAM_MEMBER" && (
          <>
            <Link to="/projects" className="sidebar-link">Projects</Link>
            <Link to="/assignments" className="sidebar-link">Assignments</Link>
          </>
        )}

        {user?.role === "ADMIN" && (
          <Link to="/users" className="sidebar-link">Users</Link>
        )}
      </nav>
    </div>
  );
}