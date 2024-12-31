import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/feed" />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProtectedRoute;
