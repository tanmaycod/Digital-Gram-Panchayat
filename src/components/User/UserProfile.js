import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/firebaseConfig';
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from 'firebase/firestore';
import { FaUserCircle, FaCheckCircle, FaTimesCircle, FaEdit, FaSave } from 'react-icons/fa';
import { Doughnut, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './UserProfile.css';

const UserProfile = () => {
  const [applications, setApplications] = useState([]);
  const [services, setServices] = useState({});
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [stats, setStats] = useState({
    applied: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        const q = query(collection(db, 'applications'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userApplications = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(userApplications);

        const servicesData = {};
        await Promise.all(
          userApplications.map(async (app) => {
            const serviceDoc = await getDoc(doc(db, 'services', app.serviceId));
            servicesData[app.serviceId] = serviceDoc.data();
          })
        );
        setServices(servicesData);
        calculateStats(userApplications);
      }
    };
    fetchUserData();
  }, []);

  const calculateStats = (applications) => {
    const stats = {
      applied: applications.length,
      approved: applications.filter((app) => app.status === 'Approved').length,
      rejected: applications.filter((app) => app.status === 'Rejected').length,
      pending: applications.filter((app) => app.status === 'Pending').length
    };
    setStats(stats);
  };

  const handleEditToggle = () => setEditMode(!editMode);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), {
        fullName: userData.fullName,
        phone: userData.phone,
        address: userData.address
      });
      setEditMode(false);
    }
  };

  const doughnutData = {
    labels: ['Approved', 'Rejected', 'Pending'],
    datasets: [
      {
        data: [stats.approved, stats.rejected, stats.pending],
        backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
        hoverOffset: 6
      }
    ]
  };

  const lineData = {
    labels: ['Applied', 'Approved', 'Rejected', 'Pending'],
    datasets: [
      {
        label: 'Application Statistics',
        data: [stats.applied, stats.approved, stats.rejected, stats.pending],
        fill: true,
        borderColor: '#6200ea',
        backgroundColor: 'rgba(98, 0, 234, 0.2)',
        pointBackgroundColor: '#6200ea',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-card glass-effect animate-fadeIn">
        <FaUserCircle className="user-profile-icon bounce" />
        <h2 className="profile-title">User Profile</h2>
        {userData && (
          <div className="user-profile-details">
            <p><strong>Full Name:</strong> {editMode ? <input value={userData.fullName} onChange={(e) => setUserData({ ...userData, fullName: e.target.value })} /> : userData.fullName || 'N/A'}</p>
            <p><strong>Email:</strong> {auth.currentUser.email}</p>
            <p><strong>Phone:</strong> {editMode ? <input value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} /> : userData.phone || 'N/A'}</p>
            <p><strong>Address:</strong> {editMode ? <input value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} /> : userData.address || 'N/A'}</p>
            {editMode ? (
              <button className="user-profile-save-btn" onClick={handleSave}><FaSave /> Save</button>
            ) : (
              <button className="user-profile-edit-btn" onClick={handleEditToggle}><FaEdit /> Edit Profile</button>
            )}
          </div>
        )}
      </div>

      <div className="user-profile-stats animate-fadeIn">
        <div className="user-profile-stat-card">
          <p>Applied Services</p>
          <h3>{stats.applied}</h3>
        </div>
        <div className="user-profile-stat-card">
          <p>Approved</p>
          <h3>{stats.approved}</h3>
        </div>
        <div className="user-profile-stat-card">
          <p>Rejected</p>
          <h3>{stats.rejected}</h3>
        </div>
        <div className="user-profile-stat-card">
          <p>Pending</p>
          <h3>{stats.pending}</h3>
        </div>
      </div>

      <div className="user-profile-charts animate-slideIn">
        <div className="user-profile-doughnut neumorphic-card">
          <Doughnut data={doughnutData} />
        </div>
        <div className="user-profile-line neumorphic-card">
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
