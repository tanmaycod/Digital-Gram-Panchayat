import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import './UpdateApplicationStatus.css';

const UpdateApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('Pending'); 
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch applications based on the selected status filter
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
    alert(`Application status updated to ${newStatus}`);

    // Remove updated application from the current list
    setApplications(applications.filter((app) => app.id !== appId));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const filteredApplications = applications.filter(
    (app) =>
      (app.serviceName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (app.userName?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  return (
    <div className="update-status-background">
      <div className="update-status-container">
        <h1 className="title">Update Application Status</h1>
        
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        
        <select onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        
        <div className="applications-list">
          {paginatedApplications.map((app) => (
            <div className="application-card" key={app.id}>
              <h3 className="icon-title">
                <span className="icon">📄</span> {app.serviceName}
              </h3>
              <p><strong>User Name:</strong> {app.userName}</p>
              <p><strong>Phone Number:</strong> {app.userPhone}</p>
              <p><strong>Status:</strong> {app.status}</p>
              {filter === 'Pending' && (
                <div className="status-buttons">
                  <button className="approve-button" onClick={() => handleStatusUpdate(app.id, 'Approved')}>
                    Approve
                  </button>
                  <button className="reject-button" onClick={() => handleStatusUpdate(app.id, 'Rejected')}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="pagination">
          {[...Array(totalPages).keys()].map((_, index) => (
            <button
              key={index}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdateApplicationStatus;
