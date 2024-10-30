import React, { useState } from 'react';
import { FaHome, FaClipboardList, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
import './UserDashboard.css';
import ApplyService from './ApplyService';
import UserProfile from './UserProfile';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <h3>Welcome to the User Dashboard!</h3>;
      case 'applyService':
        return <ApplyService />;
      case 'profile':
        return <UserProfile />;
      default:
        return <h3>Select a section from the sidebar.</h3>;
    }
  };

  return (
    <div className="user-dashboard-wrapper">
      <div className={`user-sidebar ${sidebarCollapsed ? 'user-collapsed' : ''}`}>
        <div className="user-sidebar-header">
          <FaBars className="user-toggle-icon" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
          {!sidebarCollapsed && <h2 className="user-brand-name">Dashboard</h2>}
        </div>
        <div className="user-sidebar-links">
          <div className={`user-dashboard-tab ${activeTab === 'home' ? 'user-active-tab' : ''}`} onClick={() => setActiveTab('home')}>
            <FaHome className="user-tab-icon" />
            {!sidebarCollapsed && <span className="user-tab-text">Home</span>}
          </div>
          <div className={`user-dashboard-tab ${activeTab === 'applyService' ? 'user-active-tab' : ''}`} onClick={() => setActiveTab('applyService')}>
            <FaClipboardList className="user-tab-icon" />
            {!sidebarCollapsed && <span className="user-tab-text">Apply Service</span>}
          </div>
          <div className={`user-dashboard-tab ${activeTab === 'profile' ? 'user-active-tab' : ''}`} onClick={() => setActiveTab('profile')}>
            <FaUser className="user-tab-icon" />
            {!sidebarCollapsed && <span className="user-tab-text">Profile</span>}
          </div>
          <div className="user-logout-tab" onClick={() => (window.location.href = '/logout')}>
            <FaSignOutAlt className="user-tab-icon" />
            {!sidebarCollapsed && <span className="user-tab-text">Logout</span>}
          </div>
        </div>
      </div>

      <div className="user-main-content">
        <div className="user-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserDashboard;
