import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          background: "#f5f7fb",
        }}
      >
        <Navbar />

        <div
          style={{
            padding: "30px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}