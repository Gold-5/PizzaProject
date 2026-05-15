import { projectsApi, tasksApi } from '../api/endpoints';

export const ProjectService = {
  async getAllProjects() {
    const response = await projectsApi.getAll();
    return response.data;
  },

  async getProjectById(id) {
    const response = await projectsApi.getById(id);
    return response.data;
  },

  async createProject(data) {
    const response = await projectsApi.create(data);
    return response.data;
  },

  async updateProject(id, data) {
    const response = await projectsApi.update(id, data);
    return response.data;
  },

  async deleteProject(id) {
    const response = await projectsApi.delete(id);
    return response.data;
  },
};

export const TaskService = {
  async getAllTasks(projectId = null) {
    const response = await tasksApi.getAll(projectId);
    return response.data;
  },

  async getTaskById(id) {
    const response = await tasksApi.getById(id);
    return response.data;
  },

  async createTask(data) {
    const response = await tasksApi.create(data);
    return response.data;
  },

  async updateTask(id, data) {
    const response = await tasksApi.update(id, data);
    return response.data;
  },

  async deleteTask(id) {
    const response = await tasksApi.delete(id);
    return response.data;
  },
};
