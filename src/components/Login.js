import React, { useState } from 'react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { auth, db } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        // Navigate based on role
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'staff') {
          navigate('/staff/dashboard');
        } else if (role === 'user') {
          navigate('/user/dashboard');
        } else {
          setError('User role not recognized');
        }
      } else {
        setError('User data not found');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials');
    }
  };

  return (
    <div className="login-background">
      <div className="login__wrapper">
        <div className="login__container">
          <div className="login__form-section">
            <h2 className="login__title">Welcome</h2>
            <form onSubmit={handleSubmit} className="login__form">
              <div className="login__input-group">
                <FaUserAlt className="login__input-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="login__input"
                />
              </div>
              <div className="login__input-group">
                <FaLock className="login__input-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="login__input"
                />
              </div>
              {error && <p className="login__error-message">{error}</p>}
              <button type="submit" className="login__button">Log In</button>
              <p className="login__signup-link">
                Don't have an account? <a href="/register" className="login__signup-link-anchor">Sign up!</a>
              </p>
            </form>
          </div>
          <div className="login__visual-section">
            <img src="https://png.pngtree.com/png-vector/20240121/ourmid/pngtree-watercolor-india-flag-color-and-ashok-chakra-png-image_11503329.png" alt="Cube" className="login__visual-3d-cube" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
