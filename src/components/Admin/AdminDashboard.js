import React, { useState } from 'react';
import { FaCogs, FaTasks, FaEdit, FaSignOutAlt, FaBars, FaUserCircle } from 'react-icons/fa';
import './AdminDashboard.css';
import CreateService from './CreateService';
import ManageServices from './ManageServices';
import UpdateApplicationStatus from './UpdateApplicationStatus';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('createService');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'createService':
        return <CreateService />;
      case 'manageServices':
        return <ManageServices />;
      case 'updateStatus':
        return <UpdateApplicationStatus />;
      default:
        return <CreateService />;
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar Navigation */} 
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <span className="brand-logo">
          <img src="https://cdn.pixabay.com/photo/2022/05/26/22/08/satyamev-jayate-7223886_640.png" alt="Cube" className=" " />

          </span>
          {!sidebarCollapsed}
          <button className="toggle-button" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            <FaBars />
          </button>
        </div>
        <div className="sidebar-links">
          <div
            className={`dashboard-tab ${activeTab === 'createService' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('createService')}
          >
            <FaCogs className="tab-icon" />
            {!sidebarCollapsed && <span className="tab-text">Create Service</span>}
          </div>
          <div
            className={`dashboard-tab ${activeTab === 'manageServices' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('manageServices')}
          >
            <FaTasks className="tab-icon" />
            {!sidebarCollapsed && <span className="tab-text">Manage Services</span>}
          </div>
          <div
            className={`dashboard-tab ${activeTab === 'updateStatus' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('updateStatus')}
          >
            <FaEdit className="tab-icon" />
            {!sidebarCollapsed && <span className="tab-text">Update Status</span>}
          </div>
        </div>
        <div className="logout-tab" onClick={() => (window.location.href = '/logout')}>
          <FaSignOutAlt className="tab-icon" />
          {!sidebarCollapsed && <span className="tab-text">Logout</span>}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="top-navbar">
          <div className="user-dropdown">
            <FaUserCircle className="user-icon" />
            <span>User</span>
            <div className="dropdown-content">
              <a href="#profile">Profile</a>
              <a href="#settings">Settings</a>
              <a href="#logout">Log Out</a>
            </div>
          </div>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
