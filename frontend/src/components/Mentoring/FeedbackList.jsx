import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFeedbacks } from '../../api/mentoring';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { MessageSquare } from 'lucide-react';

const FeedbackList = () => {
  const { projectId } = useParams();
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const response = await fetchFeedbacks(projectId);
        setFeedback(response.data);
      } catch (err) {
        console.error('Error loading feedback:', err);
        setError('Failed to load feedback. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadFeedback();
  }, [projectId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Feedback</h1>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {feedback.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">No feedback available yet.</p>
          </div>
        ) : (
          feedback.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.mentor_id
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                      : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  }`}>
                    {item.mentor_id ? 'Mentor Feedback' : 'Student Response'}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {item.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackList;