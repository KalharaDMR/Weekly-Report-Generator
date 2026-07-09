import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import ReportsPage from "../pages/reports/ReportsPage";
import ProjectsPage from "../pages/projects/ProjectsPage";
import UsersPage from "../pages/users/UsersPage";
import AssignmentsPage from "../pages/assignments/AssignmentsPage";
import CreateReportPage from "../pages/reports/CreateReportPage";
import EditReportPage from "../pages/reports/EditReportPage";


import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/reports"
          element={<ReportsPage />}
        />

        <Route
          path="/projects"
          element={<ProjectsPage />}
        />

        <Route
          path="/users"
          element={<UsersPage />}
        />

        <Route
          path="/assignments"
          element={<AssignmentsPage />}
        />

        <Route
    path="/reports/create"
    element={<CreateReportPage />}
/>

<Route
    path="/reports/edit/:id"
    element={<EditReportPage />}
/>
      </Route>
    </Routes>
  );
}