import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchStudentProjects } from '../../api/mentoring';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { Plus, Clipboard, BookOpen } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await fetchStudentProjects(user.id);
        setProjects(response.data.projects?.slice(0, 3) || []); // Get just the most recent 3 projects
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load your projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      loadDashboard();
    }
  }, [user]);
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          This is your student dashboard where you can manage your mentoring projects.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link 
              to="/student/projects/new" 
              className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <Plus className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
              <span className="text-blue-700 dark:text-blue-300 font-medium">Create New Project</span>
            </Link>
            
            <Link 
              to="/student/projects" 
              className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <Clipboard className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3" />
              <span className="text-purple-700 dark:text-purple-300 font-medium">View All Projects</span>
            </Link>
            
            <Link 
              to="/student/projects" 
              className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
              <span className="text-green-700 dark:text-green-300 font-medium">Browse Resources</span>
            </Link>
          </div>
        </div>
        
        {/* Recent Projects */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Projects
          </h2>
          
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}
          
          {!error && projects.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <p>You haven't created any projects yet.</p>
              <Link 
                to="/student/projects/new"
                className="mt-2 inline-block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Create your first project
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => (
                <Link 
                  key={project.project_id}
                  to={`/student/projects/${project.project_id}`}
                  className="block p-3 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                    {project.description}
                  </p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(project.created_at).toLocaleDateString()}
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                      {project.mentor?.name || "No mentor assigned"}
                    </span>
                  </div>
                </Link>
              ))}
              
              {projects.length > 0 && (
                <Link 
                  to="/student/projects"
                  className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mt-4"
                >
                  View all projects →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* System Announcements */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 dark:from-blue-800 dark:to-indigo-700 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-xl font-semibold mb-3">Announcements</h2>
        <div className="space-y-3">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <p className="font-medium">Welcome to the Mentoring Portal!</p>
            <p className="text-sm text-blue-100 mt-1">
              Connect with mentors, track your project progress, and get valuable feedback on your work.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <p className="font-medium">Project Guidelines Updated</p>
            <p className="text-sm text-blue-100 mt-1">
              Please review the updated project submission guidelines before creating new projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;