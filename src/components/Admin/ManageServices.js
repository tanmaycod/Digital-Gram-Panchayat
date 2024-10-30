import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './ManageServices.css';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchServices = async () => {
      const servicesCollection = await getDocs(collection(db, 'services'));
      setServices(servicesCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'services', id));
    setServices(services.filter((service) => service.id !== id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  return (
    <div className="manage-services-background">
      <div className="manage-services-container">
        <h1 className="title">Manage Services</h1>
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <div className="services-list">
          <table className="services-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedServices.map((service) => (
                <tr key={service.id} className="service-item">
                  <td>{service.name}</td>
                  <td>{service.description}</td>
                  <td>{service.status}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(service.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default ManageServices;
