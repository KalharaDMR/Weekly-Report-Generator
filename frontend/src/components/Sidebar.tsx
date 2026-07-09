import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <div
      style={{
        width: 250,
        background: "#1f2937",
        color: "white",
        padding: 20,
      }}
    >
      <h2>Weekly Reports</h2>

      <hr />

      <p>{user?.name}</p>

      <p>{user?.role}</p>

      <br />

      <Link to="/dashboard">Dashboard</Link>

      <br />
      <br />

      <Link to="/reports">
        Reports
      </Link>

      <br />
      <br />

      {user?.role !== "TEAM_MEMBER" && (
        <>
          <Link to="/projects">
            Projects
          </Link>

          <br />
          <br />

          <Link to="/assignments">
            Assignments
          </Link>

          <br />
          <br />
        </>
      )}

      {user?.role === "ADMIN" && (
        <Link to="/users">
          Users
        </Link>
      )}
    </div>
  );
}