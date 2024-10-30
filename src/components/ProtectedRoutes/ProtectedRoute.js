import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/" />; // Redirect to login if user is not authenticated
  }

  return children; // Render children if user is authenticated
};

export default ProtectedRoute;
