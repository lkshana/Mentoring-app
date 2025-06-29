import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTeamMembers, createTeamMember, deleteTeamMember } from '../../api/competitions';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { UserPlus, Trash2 } from 'lucide-react';

const TeamMemberForm = () => {
  const { registrationId } = useParams();
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const response = await fetchTeamMembers(registrationId);
        setTeamMembers(response.data);
      } catch (err) {
        console.error('Error loading team members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, [registrationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await createTeamMember({
        registration_id: registrationId,
        student_id: studentId
      });
      
      // Refresh the list
      const response = await fetchTeamMembers(registrationId);
      setTeamMembers(response.data);
      setStudentId('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add team member. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (teamMemberId) => {
    try {
      await deleteTeamMember(teamMemberId);
      // Refresh the list
      const response = await fetchTeamMembers(registrationId);
      setTeamMembers(response.data);
    } catch (err) {
      setError('Failed to remove team member.');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Team Members</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          Back to Registrations
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Student ID
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
                className="flex-1 form-input rounded-l-md"
                placeholder="Enter student ID"
              />
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary rounded-l-none flex items-center"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Add Member
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Current Team Members</h2>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{member.student.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ID: {member.student.reg_no}</p>
                </div>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-2"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            {teamMembers.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No team members added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberForm;