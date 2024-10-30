import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';
import CreateService from './components/Admin/CreateService';
import ManageServices from './components/Admin/ManageServices';
import UpdateApplicationStatus from './components/Admin/UpdateApplicationStatus';
import UserDashboard from './components/User/UserDashboard';
import ApplyService from './components/User/ApplyService';
import UserProfile from './components/User/UserProfile';
import StaffUpdateApplicationStatus1 from './components/Staff/StaffUpdateApplicationStatus';
import StaffDashboard from './components/Staff/StaffDashboard';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Unified login and registration page */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Admin protected routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/create-service"
        element={
          <ProtectedRoute>
            <CreateService />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-services"
        element={
          <ProtectedRoute>
            <ManageServices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/update-status"
        element={
          <ProtectedRoute>
            <UpdateApplicationStatus />
          </ProtectedRoute>
        }
      />

      {/* Staff protected routes */}
      <Route
        path="/staff/dashboard"
        element={
          <ProtectedRoute>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/update-status"
        element={
          <ProtectedRoute>
            <StaffUpdateApplicationStatus1 />
          </ProtectedRoute>
        }
      />

      {/* User protected routes */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/apply-service"
        element={
          <ProtectedRoute>
            <ApplyService />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* Logout route */}
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
