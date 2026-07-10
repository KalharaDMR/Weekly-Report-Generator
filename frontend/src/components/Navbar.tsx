import useAuth from "../hooks/useAuth";

import "./Navbar.css"; // <-- import the CSS

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <h2 className="navbar-brand">📊 Dashboard</h2>

      <div className="navbar-user">
        {user?.name && <span className="navbar-user-name">{user.name}</span>}
        <button className="navbar-logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}