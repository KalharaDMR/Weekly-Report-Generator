import { useEffect, useState } from "react";
import { UserService } from "../../services/user.service";

import "./UsersPage.css"; // <-- import the CSS

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const res = await UserService.getAll();
    setUsers(res.data.data);
  }

  return (
    <div className="users-page">
      <div className="users-header">
        <h2>👥 Users</h2>
      </div>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="users-empty">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => {
                let statusClass = "";
                if (user.status === "PENDING") statusClass = "status-pending";
                else if (user.status === "ACTIVE") statusClass = "status-active";
                else if (user.status === "DEACTIVATED") statusClass = "status-deactivated";

                let roleClass = "";
                if (user.role === "ADMIN") roleClass = "role-admin";
                else if (user.role === "MANAGER") roleClass = "role-manager";
                else if (user.role === "TEAM_MEMBER") roleClass = "role-team-member";

                return (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        className="users-select"
                        value={user.role}
                        onChange={async (e) => {
                          await UserService.updateRole(user.id, e.target.value);
                          loadUsers();
                        }}
                      >
                        <option>ADMIN</option>
                        <option>MANAGER</option>
                        <option>TEAM_MEMBER</option>
                      </select>
                    </td>
                    <td>
                      <select
                        className="users-select"
                        value={user.status}
                        onChange={async (e) => {
                          await UserService.updateStatus(user.id, e.target.value);
                          loadUsers();
                        }}
                      >
                        <option>PENDING</option>
                        <option>ACTIVE</option>
                        <option>DEACTIVATED</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="users-btn-danger"
                        onClick={async () => {
                          if (!confirm("Delete?")) return;
                          await UserService.remove(user.id);
                          loadUsers();
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}