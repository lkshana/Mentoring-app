import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createRegistration, fetchEventById } from '../../api/competitions';
import { fetchAllMentors } from '../../api/mentoring';
import LoadingSpinner from '../Shared/LoadingSpinner';

const StudentRegForm = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [formData, setFormData] = useState({
    idea_title: '',
    idea_description: '',
    mentor_id: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [eventResponse, mentorsResponse] = await Promise.all([
          fetchEventById(eventId),
          fetchAllMentors()
        ]);
        setEvent(eventResponse.data);
        setMentors(mentorsResponse.data);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load event details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await createRegistration({
        event_id: eventId,
        team_lead_id: user.id,
        mentor_id: formData.mentor_id || null,
        idea_title: formData.idea_title,
        idea_description: formData.idea_description
      });
      navigate('/student/competitions');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!event) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Register for Event</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{event.title}</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Event Details</h2>
        <div className="space-y-3">
          <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <span className="font-medium mr-2">Date:</span>
            {new Date(event.event_date).toLocaleDateString()}
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <span className="font-medium mr-2">Type:</span>
            {event.type}
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <span className="font-medium mr-2">Category:</span>
            {event.category}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="idea_title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Idea Title
            </label>
            <input
              type="text"
              id="idea_title"
              name="idea_title"
              value={formData.idea_title}
              onChange={handleChange}
              required
              className="mt-1 form-input"
              placeholder="Enter your idea title"
            />
          </div>

          <div>
            <label htmlFor="idea_description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Idea Description
            </label>
            <textarea
              id="idea_description"
              name="idea_description"
              value={formData.idea_description}
              onChange={handleChange}
              required
              rows="6"
              className="mt-1 form-input"
              placeholder="Describe your idea in detail..."
            />
          </div>

          <div>
            <label htmlFor="mentor_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Preferred Mentor (Optional)
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
                <option key={mentor.id} value={mentor.id}>
                  {mentor.name} - {mentor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/student/competitions')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentRegForm;