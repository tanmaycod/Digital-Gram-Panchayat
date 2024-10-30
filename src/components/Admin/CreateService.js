import React, { useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './CreateService.css';

const CreateService = () => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'services'), {
        name: serviceName,
        description,
        status: 'Active',
      });
      setServiceName('');
      setDescription('');
      alert('Service Created Successfully');
    } catch (error) {
      console.error('Error creating service: ', error);
    }
  };

  return (
    <div className="create-service-background">
      <div className="create-service-container">
        <div className="create-service-glass">
          <h1 className="title" >Create a New Service</h1>
          <form onSubmit={handleSubmit} className="create-service-form">
            <input
              type="text"
              placeholder="Service Name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              required
              className="input-field"
            />
            <textarea
              placeholder="Service Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
              className="input-field"
            />
            <button type="submit" className="create-button">
              Create Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateService;
