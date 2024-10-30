import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/firebaseConfig';
import { collection, getDocs, addDoc, query, where, doc, getDoc } from 'firebase/firestore';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './ApplyService.css';

const ApplyService = () => {
  const [services, setServices] = useState([]); 
  const [appliedServices, setAppliedServices] = useState([]); 
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('available');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const fetchServicesAndApplications = async () => {
      const user = auth.currentUser;
      const servicesQuery = query(collection(db, 'services'), where('status', '==', 'Active'));
      const servicesSnapshot = await getDocs(servicesQuery);
      const servicesList = servicesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const appliedQuery = query(collection(db, 'applications'), where('userId', '==', user?.uid));
      const appliedSnapshot = await getDocs(appliedQuery);
      const appliedList = appliedSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setServices(servicesList.filter((service) => !appliedList.some((a) => a.serviceId === service.id)));
      setAppliedServices(appliedList);
    };

    fetchServicesAndApplications();
  }, []);

  const applyForService = async (serviceId) => {
    if (window.confirm('Are you sure you want to apply for this service?')) {
      try {
        const user = auth.currentUser;
        
        // Fetch user details
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        
        const selectedService = services.find((service) => service.id === serviceId);
        await addDoc(collection(db, 'applications'), {
          userId: user?.uid,
          userName: userData.fullName, 
          userPhone: userData.phone, 
          serviceId: serviceId,
          serviceName: selectedService.name,
          status: 'Pending',
        });
        
        setMessage('Application submitted successfully!');
        setAppliedServices((prev) => [...prev, { serviceId, serviceName: selectedService.name, status: 'Pending' }]);
        setServices((prev) => prev.filter((service) => service.id !== serviceId));
      } catch (error) {
        setMessage('Failed to submit application. Please try again.');
      }
    }
  };

  const filteredAppliedServices = appliedServices.filter(
    (service) => filterStatus === 'All' || service.status === filterStatus
  );

  const paginatedServices =
    activeTab === 'available'
      ? services.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : filteredAppliedServices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(
    activeTab === 'available' ? services.length / itemsPerPage : filteredAppliedServices.length / itemsPerPage
  );

  return (
    <div className="user-service-container">
      <h2 className="user-service-title">Service Portal</h2>
      <div className="user-service-tabs">
        <button className={`user-service-tab ${activeTab === 'available' ? 'active' : ''}`} onClick={() => setActiveTab('available')}>
          Available Services
        </button>
        <button className={`user-service-tab ${activeTab === 'applied' ? 'active' : ''}`} onClick={() => setActiveTab('applied')}>
          Applied Services
        </button>
      </div>
      {activeTab === 'applied' && (
        <div className="user-service-filter">
          <label>Status: </label>
          <select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      )}
      <div className="user-service-grid">
        {paginatedServices.map((service) => (
          <div key={service.serviceId || service.id} className="user-service-card">
            <div className="user-service-details">
              <h3>{service.serviceName || service.name}</h3>
              {service.description && <p>{service.description}</p>}
              {activeTab === 'applied' && (
                <p className={`user-service-status ${service.status.toLowerCase()}`}>
                  Status: {service.status}
                </p>
              )}
            </div>
            {activeTab === 'available' && (
              <button className="user-service-apply-btn" onClick={() => applyForService(service.id)}>
                <FaCheckCircle /> Apply
              </button>
            )}
          </div>
        ))}
      </div>
      {message && <div className="user-service-message">{message}</div>}
      <div className="user-service-pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`user-service-page-btn ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ApplyService;
