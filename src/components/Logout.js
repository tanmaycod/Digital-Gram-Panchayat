import React, { useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      await signOut(auth);
      navigate('/'); 
    };
    logoutUser();
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
