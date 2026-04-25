import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, openLogin }) => {
  const { userData, loading } = useSelector(state => state.user); // ← add loading

  if (loading) return null; // ← wait until auth check is done

  if (!userData) {
    openLogin();
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;