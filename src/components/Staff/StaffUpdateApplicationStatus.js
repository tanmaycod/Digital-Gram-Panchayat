import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { Container, Card, Button, Form } from 'react-bootstrap';
import './StaffUpdateApplicationStatus.css';

const StaffUpdateApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('Pending'); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch applications based on the selected filter status
  useEffect(() => {
    const fetchApplications = async () => {
      const q = query(collection(db, 'applications'), where('status', '==', filter));
      const querySnapshot = await getDocs(q);
      const fetchedApplications = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setApplications(fetchedApplications);
    };

    fetchApplications();
  }, [filter]);

  const handleStatusUpdate = async (appId, newStatus) => {
    const applicationRef = doc(db, 'applications', appId);
    await updateDoc(applicationRef, { status: newStatus });
    setApplications(applications.filter((app) => app.id !== appId));
    alert(`Application status updated to ${newStatus}`);
  };

  const paginatedApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(applications.length / itemsPerPage);

  return (
    <Container className="staff-status-update-container">
      <h2 className="staff-heading">Manage Application Status</h2>

      <Form.Select
        aria-label="Filter by Status"
        className="staff-filter-select mb-4"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      >
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </Form.Select>

      <div className="staff-applications-list">
        {paginatedApplications.map((app) => (
          <Card key={app.id} className="staff-application-card">
            <Card.Body>
              <Card.Title className="staff-service-title">
                <strong>Service Applied:</strong> {app.serviceName || 'N/A'}
              </Card.Title>
              <Card.Text><strong>User Name:</strong> {app.userName || 'N/A'}</Card.Text>
              <Card.Text><strong>Phone Number:</strong> {app.userPhone || 'N/A'}</Card.Text>
              <Card.Text><strong>Current Status:</strong> {app.status}</Card.Text>

              {filter === 'Pending' && (
                <div className="staff-status-buttons">
                  <Button variant="success" className="staff-approve-button" onClick={() => handleStatusUpdate(app.id, 'Approved')}>
                    Approve
                  </Button>
                  <Button variant="danger" className="staff-reject-button" onClick={() => handleStatusUpdate(app.id, 'Rejected')}>
                    Reject
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="staff-pagination">
        {[...Array(totalPages).keys()].map((_, index) => (
          <button
            key={index}
            className={`staff-page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </Container>
  );
};

export default StaffUpdateApplicationStatus;
