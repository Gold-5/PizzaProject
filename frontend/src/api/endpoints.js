import apiClient from './axiosConfig';

export const projectsApi = {
  getAll: () => apiClient.get('/projects'),
  getById: (id) => apiClient.get(`/projects/${id}`),
  create: (data) => apiClient.post('/projects', data),
  update: (id, data) => apiClient.put(`/projects/${id}`, data),
  delete: (id) => apiClient.delete(`/projects/${id}`),
};

export const tasksApi = {
  getAll: () => apiClient.get('/tasks'),
  getById: (id) => apiClient.get(`/tasks/${id}`),
  getByProject: (projectId) => apiClient.get(`/tasks/by-project/${projectId}`),
  create: (data) => apiClient.post('/tasks', data),
  update: (id, data) => apiClient.put(`/tasks/${id}`, data),
  updateStatus: (id, status) => apiClient.patch(`/tasks/${id}/status`, { status }),
  delete: (id) => apiClient.delete(`/tasks/${id}`),
};

export const authApi = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
};
