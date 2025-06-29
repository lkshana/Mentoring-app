import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchRegistrations } from '../../api/competitions';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { Users, Calendar, Tag } from 'lucide-react';

const MentorCompDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const loadRegistrations = async () => {
      try {
        const response = await fetchRegistrations();
        // Filter registrations where this mentor is assigned
        const mentorRegistrations = response.data.filter(reg => reg.mentor_id === user.id);
        setRegistrations(mentorRegistrations);
      } catch (err) {
        console.error('Error loading registrations:', err);
        setError('Failed to load your assigned teams. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadRegistrations();
  }, [user.id]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Competition Mentoring Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          View and manage the teams you're mentoring for various competitions.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registrations.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              You haven't been assigned to mentor any competition teams yet.
            </p>
          </div>
        ) : (
          registrations.map((registration) => (
            <div
              key={registration.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {registration.event.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    registration.department_approved && registration.admin_approved
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                  }`}>
                    {registration.department_approved && registration.admin_approved
                      ? 'Approved'
                      : 'Pending Approval'}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Team Lead: {registration.team_lead.name}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(registration.event.event_date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Tag className="h-4 w-4 mr-2" />
                    <span>{registration.event.category}</span>
                  </div>
                </div>

                <div className="border-t dark:border-gray-700 pt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Project Idea</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                    {registration.idea_title}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-3">
                    {registration.idea_description}
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <Link
                    to={`/mentor/competitions/${registration.id}/details`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MentorCompDashboard;