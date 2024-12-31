import React from 'react';
    import { Navigate } from 'react-router-dom';

    const ProtectedRoute = ({ children }) => {
      const isAuthenticated = !!sessionStorage.getItem('user');
      return isAuthenticated ? children : <Navigate to="/login" />;
    };

    export default ProtectedRoute;
