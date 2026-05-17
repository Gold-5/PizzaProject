import apiClient from './axiosConfig';

// Projects API
export const projectsApi = {
  getAll: () => apiClient.get('/projects'),
  getById: (id) => apiClient.get(`/projects/${id}`),
  create: (data) => apiClient.post('/projects', data),
  update: (id, data) => apiClient.put(`/projects/${id}`, data),
  delete: (id) => apiClient.delete(`/projects/${id}`),
};

// Tasks API
export const tasksApi = {
  getAll: () => apiClient.get('/tasks'),
  getByProject: (projectId) => apiClient.get(`/tasks/project/${projectId}`),
  getById: (id) => apiClient.get(`/tasks/${id}`),
  create: (data) => apiClient.post('/tasks', data),
  update: (id, data) => apiClient.put(`/tasks/${id}`, data),
  updateStatus: (id, status) => apiClient.patch(`/tasks/${id}/status`, { status }),
  delete: (id) => apiClient.delete(`/tasks/${id}`),
};

// Auth API
export const authApi = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
};

// Weather API
export const weatherApi = {
  getForecast: () => apiClient.get('/weatherforecast'),
};

export default {
  projectsApi,
  tasksApi,
  authApi,
  weatherApi,
};
