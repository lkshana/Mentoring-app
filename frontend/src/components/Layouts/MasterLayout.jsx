import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Shared/Navbar';

const MasterLayout = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Additional role check for extra security
    if (!user || user.role !== 'master') {
      navigate('/master/login');
    }
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-blue-900 transition-colors duration-300">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default MasterLayout;