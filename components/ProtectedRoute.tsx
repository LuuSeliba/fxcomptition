import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  // FIX: Use React.ReactElement instead of JSX.Element to avoid a JSX namespace error.
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser?.isAdmin) {
    // Redirect to the dedicated admin login page
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;