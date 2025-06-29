import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProjectById, createFeedback, addProjectMember, removeProjectMember, fetchProjectMembers } from '../../api/mentoring';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { Github, Mail, Phone, Calendar, BookOpen, GraduationCap, MapPin, Briefcase, User, FileText, Plus, MessageSquare, Send, UserPlus, UserMinus } from 'lucide-react';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [addingMember, setAddingMember] = useState(false);
  const { user } = useAuth();

  
  const loadProjectData = async () => {
    try {
      const response = await fetchProjectById(projectId);
      setProject(response.data.project);
      // setTeamMembers(response.data.project.projectMembers);
      
    } catch (err) {
      console.error('Error loading project data:', err);
      setError('Failed to load project details. Please try again later.');
    }
  };
  const loadMembersData = async () => {
    try{
      const memres = await fetchProjectMembers(projectId);
      console.log(memres);
      setTeamMembers(memres.data.members);
    }
    catch(err){
        console.error('Error loading project data:', err);
      setError('Failed to load members. Please try again later.');
 
    }
  }

  useEffect(() => {
    const loadAllData = async () => {
      try {
        await Promise.all([loadProjectData(), loadMembersData()]);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [projectId]);

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createFeedback({
        project_id: projectId,
        mentor_id: user.role === 'mentor' ? user.id : null,
        student_id: user.role === 'student' ? user.id : null,
        content: feedbackContent
      });
      
      await loadProjectData();
      setFeedbackContent('');
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMemberEmail) return;

    setAddingMember(true);
    try {
      await addProjectMember(projectId, newMemberEmail);
      await loadMembersData();
      setNewMemberEmail('');
    } catch (err) {
      setError('Failed to add team member. Please verify the email address.');
    } finally {
      setAddingMember(false);
    }
  };
  

  const handleRemoveMember = async (project_member_id) => {
    try {
      
      await removeProjectMember(project_member_id);
      await loadMembersData();
      console.log("Removed");
    } catch (err) {
      setError('Failed to remove team member.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!project) return null;

  const isProjectCreator = user.id === project.created_by;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Created on {new Date(project.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          {user.role === 'student' && user.id === project.created_by && (
            <Link
              to={`/student/projects/${projectId}/update`}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              New Update
            </Link>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Details Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
                <p className="mt-1 text-gray-900 dark:text-white">{project.description}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">GitHub Repository</h3>
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  <Github className="h-4 w-4" />
                  {project.github_url}
                </a>
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Team Members</h2>
            
            {/* Add Member Form - Only visible to project creator */}
            {isProjectCreator && (
              <form onSubmit={handleAddMember} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    placeholder="Enter member's email"
                    className="flex-1 form-input"
                    required
                  />
                  <button
                    type="submit"
                    disabled={addingMember}
                    className="btn btn-primary flex items-center gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    {addingMember ? 'Adding...' : 'Add Member'}
                  </button>
                </div>
              </form>
            )}

            {/* Current Team Members */}
            <div className="space-y-3">
              {teamMembers.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No team members yet.</p>
              ) : (
                teamMembers.map((member) => (
                  <div key={member.project_member_id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      {member.student.profile_picture && (
                        <img
                          src={member.student.profile_picture}
                          alt={member.student.name}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {member.student.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {member.student.email}
                        </p>
                      </div>
                    </div>
                    {isProjectCreator && member.id !== project.created_by && (
                      <button
                        onClick={() => handleRemoveMember(member.project_member_id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        title="Remove member"
                      >
                        <UserMinus className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Updates Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Updates</h2>
            <div className="space-y-4">
              {project.updates.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No updates yet.</p>
              ) : (
                project.updates.map((update) => (
                  <div key={update.update_id} className="border dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">{update.title}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(update.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{update.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Feedback Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Feedback</h2>
            
            {/* Feedback Form */}
            <form onSubmit={handleSubmitFeedback} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={feedbackContent}
                  onChange={(e) => setFeedbackContent(e.target.value)}
                  placeholder="Add your feedback..."
                  className="flex-1 form-input"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>

            {/* Feedback List */}
            <div className="space-y-4">
              {project.feedbacks.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No feedback yet.</p>
              ) : (
                project.feedbacks.map((feedback) => {
                  const isMentor = !!feedback.mentor_id;
                  const person = isMentor ? feedback.mentor : feedback.student;

                  return (
                    <div
                      key={feedback.feedback_id}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isMentor
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                              : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          }`}
                        >
                          {isMentor ? "Mentor Feedback" : "Student Feedback"}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(feedback.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        {person?.profile_picture && (
                          <img
                            src={person.profile_picture}
                            alt={person.name}
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                            {person?.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {person?.department} {isMentor ? "" : `| Year ${person?.year}`}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300">{feedback.content}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Student Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={project.creator.profile_picture}
                alt={project.creator.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.creator.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Project Creator</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>{project.creator.email}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <span>{project.creator.mobile}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="h-4 w-4 mr-2" />
                <span>DOB: {new Date(project.creator.date_of_birth).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>Reg No: {project.creator.reg_no}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <GraduationCap className="h-4 w-4 mr-2" />
                <span>{project.creator.department} - {project.creator.year} Year</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{project.creator.residential_address}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Bio</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{project.creator.bio}</p>
            </div>

            <div className="mt-6 flex flex-col space-y-2">
              <a
                href={project.creator.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm flex items-center"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Portfolio
              </a>
              <a
                href={project.creator.github_profile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm flex items-center"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub Profile
              </a>
              <a
                href={project.creator.linkedin_profile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm flex items-center"
              >
                <User className="h-4 w-4 mr-2" />
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Mentor Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Mentor</h2>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {project.mentor.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {project.mentor.department} Department
                </p>
                <a
                  href={`mailto:${project.mentor.email}`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm flex items-center mt-1"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  {project.mentor.email}
                </a>
              </div>
            </div>
          </div>

          {/* Project Stats Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Updates</span>
                </div>
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {project.updates.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span>Feedbacks</span>
                </div>
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {project.feedbacks.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <User className="h-4 w-4 mr-2" />
                  <span>Team Members</span>
                </div>
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {teamMembers.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;