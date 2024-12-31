import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!sessionStorage.getItem('user');
  return isAuthenticated ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
