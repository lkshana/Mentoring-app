import api from './auth';

// Event operations
export const fetchEvents = (params) => api.get('/competitions/event', { params });
export const fetchEventById = (eventId) => api.get(`/competitions/event/${eventId}`);
export const createEvent = (data) => api.post('/competitions/event', data);
export const updateEvent = (eventId, data) => api.put(`/competitions/event/${eventId}`, data);

// Registration operations
export const fetchRegistrations = (eventId) => 
  api.get(`/competitions/registration?event_id=${eventId}`);
export const createRegistration = (data) => api.post('/competitions/registration', data);

// Team operations
export const fetchTeamMembers = (registrationId) => 
  api.get(`/competitions/team?registration_id=${registrationId}`);
export const createTeamMember = (data) => api.post('/competitions/team', data);
export const deleteTeamMember = (teamMemberId) => api.delete(`/competitions/team/${teamMemberId}`);

// Approval operations
export const approveByDepartment = (registrationId) => 
  api.put(`/competitions/approval/department/${registrationId}`);
export const approveByAdmin = (registrationId) => 
  api.put(`/competitions/approval/admin/${registrationId}`);
export const fetchPendingApprovals = () => api.get('/competitions/approval/pending');