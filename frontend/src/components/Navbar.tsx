import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div
      style={{
        height: 70,
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
      }}
    >
      <h2>Dashboard</h2>

      <div>
        {user?.name}

        <button
          style={{
            marginLeft: 20,
          }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}