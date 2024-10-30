import React, { useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { FaUser, FaLock, FaPhone, FaAddressCard, FaEnvelope, FaTransgender } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        fullName,
        phone,
        gender,
        address,
        role: 'user',
      });
      navigate('/user/dashboard');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-background">
      <div className="form-wrapper">
        <div className="form-container">
          <h2 className="form-title">Welcome</h2>
          <p className="form-subtitle">Complete Your Registration😊.</p>



          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaPhone className="icon" />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaAddressCard className="icon" />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaTransgender className="icon" />
              <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="" disabled hidden>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="submit-button">Login</button>
            <button
              type="button" 
              className="login-button"
              onClick={() => navigate('/')}
            >
              Already have an account? Login
            </button>
          </form>
        </div>
        <div className="illustration-section">
          <img src="https://cdn.pixabay.com/photo/2022/05/26/22/08/satyamev-jayate-7223886_640.png" alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Register;
