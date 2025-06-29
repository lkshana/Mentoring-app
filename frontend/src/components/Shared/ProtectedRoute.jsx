import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ role }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!user || user.role !== role) {
    return <Navigate to={`/${role}/login`} replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;