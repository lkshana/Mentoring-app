import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchPendingApprovals, approveByDepartment, approveByAdmin } from '../../api/competitions';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const ApprovalDashboard = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const loadApprovals = async () => {
      try {
        const response = await fetchPendingApprovals();
        setApprovals(response.data);
      } catch (err) {
        console.error('Error loading approvals:', err);
        setError('Failed to load pending approvals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadApprovals();
  }, []);

  const handleDepartmentApproval = async (registrationId) => {
    try {
      await approveByDepartment(registrationId);
      // Refresh the list
      const response = await fetchPendingApprovals();
      setApprovals(response.data);
    } catch (err) {
      setError('Failed to update department approval status.');
    }
  };

  const handleAdminApproval = async (registrationId) => {
    try {
      await approveByAdmin(registrationId);
      // Refresh the list
      const response = await fetchPendingApprovals();
      setApprovals(response.data);
    } catch (err) {
      setError('Failed to update admin approval status.');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pending Approvals</h1>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Registration ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Event Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Team Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Department Approval
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Admin Approval
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {approvals.map((approval) => (
                <tr key={approval.registration_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    #{approval.registration_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {approval.event_title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {approval.team_lead_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {approval.department_approved ? (
                      <span className="inline-flex items-center text-green-700 dark:text-green-400">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-yellow-700 dark:text-yellow-400">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {approval.admin_approved ? (
                      <span className="inline-flex items-center text-green-700 dark:text-green-400">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-yellow-700 dark:text-yellow-400">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      {user.role === 'admin' && !approval.department_approved && (
                        <button
                          onClick={() => handleDepartmentApproval(approval.registration_id)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          Approve Dept
                        </button>
                      )}
                      {user.role === 'master' && !approval.admin_approved && approval.department_approved && (
                        <button
                          onClick={() => handleAdminApproval(approval.registration_id)}
                          className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                        >
                          Approve Admin
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {approvals.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No pending approvals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApprovalDashboard;