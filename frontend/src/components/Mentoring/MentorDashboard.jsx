import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchMentorProjects } from '../../api/mentoring';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { MessageSquare, Users, Clock, BookOpen } from 'lucide-react';

const MentorDashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        console.log(user);
        const response = await fetchMentorProjects(user.id);
        setProjects(response.data.projects);
      } catch (err) {
        console.error('Error fetching mentor projects:', err);
        setError('Failed to load your assigned projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      loadDashboard();
    }
  }, [user]);
  
  if (loading) return <LoadingSpinner />;
  
  // Group projects by status (recent updates, pending feedback, etc.)
  const pendingFeedback = projects.filter(project => 
    project.updates?.some(update => !update.has_feedback)
  );
  
  const recentProjects = projects.slice(0, 5);
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          This is your mentor dashboard where you can monitor projects and provide feedback to students.
        </p>
      </div>
      
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Overview */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 border border-blue-100 dark:border-blue-800">
            <div className="flex items-start">
              <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <Users className="h-6 w-6 text-blue-700 dark:text-blue-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  {projects.length}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Assigned Projects
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-6 border border-amber-100 dark:border-amber-800">
            <div className="flex items-start">
              <div className="p-3 bg-amber-100 dark:bg-amber-800 rounded-lg">
                <MessageSquare className="h-6 w-6 text-amber-700 dark:text-amber-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  {pendingFeedback.length}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Pending Feedback
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-6 border border-purple-100 dark:border-purple-800">
            <div className="flex items-start">
              <div className="p-3 bg-purple-100 dark:bg-purple-800 rounded-lg">
                <Clock className="h-6 w-6 text-purple-700 dark:text-purple-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  {projects.reduce((acc, project) => acc + (project.updates?.length || 0), 0)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Updates
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 border border-green-100 dark:border-green-800">
            <div className="flex items-start">
              <div className="p-3 bg-green-100 dark:bg-green-800 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-700 dark:text-green-300" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  {projects.reduce((acc, project) => acc + (project.feedbacks?.length || 0), 0)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Total Feedback
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pending Feedback */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Pending Feedback
          </h2>
          
          {pendingFeedback.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <p>No pending feedback requests at the moment.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingFeedback.map((project) => (
                <div key={project.id} className="border dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Student: {project.student?.name || "Unknown Student"}
                  </p>
                  
                  <div className="mt-3 space-y-2">
                    {project.updates?.filter(update => !update.has_feedback).map((update) => (
                      <div key={update.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{update.title}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(update.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                          {update.description}
                        </p>
                        <Link
                          to={`/mentor/projects/${project.id}/feedback`}
                          className="mt-2 inline-block text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          Provide Feedback
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* All Assigned Projects */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Assigned Projects
          </h2>
          
          {projects.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <p>No projects assigned to you yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <Link 
                  key={project.id}
                  to={`/mentor/projects/${project.id}/feedback`}
                  className="block p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">{project.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {project.student?.name || "Unknown Student"}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.updates?.some(u => !u.has_feedback)
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                    }`}>
                      {project.updates?.some(u => !u.has_feedback) ? 'Needs Feedback' : 'Up to date'}
                    </span>
                  </div>
                </Link>
              ))}
              
              {projects.length > 5 && (
                <div className="text-center text-sm text-blue-600 dark:text-blue-400 mt-4">
                  View all projects →
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;