import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  // If there is no token in localStorage, the user is not authenticated.
  // Redirect them to the login page.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the token exists, render the protected component.
  return <>{children}</>;
};

export default ProtectedRoute;
