import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createProject, fetchAllMentors } from '../../api/mentoring';
import LoadingSpinner from '../Shared/LoadingSpinner';

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    github_url: '',
    mentor_id: ''
  });
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadMentors = async () => {
      try {
        const response = await fetchAllMentors();
        
        setMentors(response.data);
        console.log(response);
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setError('Failed to load mentors. Please try again later.');
      }
    };

    loadMentors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(formData);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createProject({
        ...formData,
        created_by: user.id
      });
      navigate('/student/projects');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Project</h1>

      {error && (
        <div className="mb-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 form-input"
            placeholder="Enter project title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 form-input"
            placeholder="Describe your project"
          />
        </div>

        <div>
          <label htmlFor="github_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            GitHub URL
          </label>
          <input
            type="url"
            id="github_url"
            name="github_url"
            value={formData.github_url}
            onChange={handleChange}
            required
            className="mt-1 form-input"
            placeholder="https://github.com/username/repository"
          />
        </div>

        <div>
          <label htmlFor="mentor_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Preferred Mentor
          </label>
          <select
            id="mentor_id"
            name="mentor_id"
            value={formData.mentor_id}
            onChange={handleChange}
            className="mt-1 form-input"
          >
            <option value="">Select a mentor</option>
            {mentors.map(mentor => (
              <option key={mentor.mentor_id} value={mentor.mentor_id}>
                {mentor.name} - {mentor.department}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/student/projects')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;