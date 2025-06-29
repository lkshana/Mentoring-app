import api from './auth';

// Project operations
export const createProject = (data) => api.post('/mentoring/project', data);
export const fetchStudentProjects = (studentId) => 
  api.get(`/mentoring/project/student/${studentId}`);

export const fetchRecentProjects = () => 
  api.get(`/mentoring/project/recent`);

export const fetchProjectById = (projectId) => 
  api.get(`/mentoring/project/${projectId}`);
export const fetchMentorProjects = (mentorId) => 
  api.get(`/mentoring/project/mentor/my`);


// Update operations
export const createUpdate = (data) => api.post(`/mentoring/update/${data.project_id}`, data);
export const fetchUpdates = (projectId) => 
  api.get(`/mentoring/update?project_id=${projectId}`);

// Feedback operations
export const createFeedback = (data) => api.post(`/mentoring/projectFeedback/${data.project_id}`, data);
export const fetchFeedbacks = (projectId) => 
  api.get(`/mentoring/projectFeedback?project_id=${projectId}`);

// Report operations
export const createReport = (data) => api.post('/mentoring/report', data);
export const fetchReports = (projectId) => 
  api.get(`/mentoring/report?project_id=${projectId}`);

// Mentor operations
export const fetchAllMentors = () => api.get('/user/mentor/list-mentors');

// Team Member operations
export const addProjectMember = (projectId, email) => api.post(`/mentoring/member/${projectId}`, { email });
export const removeProjectMember = (project_member_id) => api.delete(`/mentoring/member/${project_member_id}`);

export const fetchProjectMembers = (projectId) => api.get(`/mentoring/member/${projectId}`);