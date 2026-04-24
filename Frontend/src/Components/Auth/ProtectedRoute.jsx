import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, openLogin }) => {
  const { userData } = useSelector(state => state.user);

  useEffect(() => {
    if (!userData) openLogin(); 
  }, []);

  return userData ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;