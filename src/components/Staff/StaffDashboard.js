import React, { useState } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FaSyncAlt, FaSignOutAlt, FaHome, FaUser } from 'react-icons/fa';
import './StaffDashboard.css';

import UpdateApplicationStatus from './StaffUpdateApplicationStatus';

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <h5 className="welcome-message">Welcome to the Staff Dashboard!</h5>;
      case 'updateStatus':
        return <UpdateApplicationStatus />;
      default:
        return <h5>Select a tab from the navbar.</h5>;
    }
  };

  return (
    <div className="staff-dashboard">
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand className="navbar-brand">
            <FaHome className="brand-icon" /> Staff Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link onClick={() => setActiveTab('home')} className="nav-item">
                <FaHome className="nav-icon" /> Home
              </Nav.Link>
              <Nav.Link onClick={() => setActiveTab('updateStatus')} className="nav-item">
                <FaSyncAlt className="nav-icon" /> Update Status
              </Nav.Link>
              <Nav.Link href="/logout" className="nav-item logout">
                <FaSignOutAlt className="nav-icon" /> Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="dashboard-content mt-4">
        {renderContent()}
      </Container>
    </div>
  );
};

export default StaffDashboard;
