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
    await projectsApi.update(id, data);
  },

  async deleteProject(id) {
    await projectsApi.delete(id);
  },
};

export const TaskService = {
  async getAllTasks() {
    const response = await tasksApi.getAll();
    return response.data;
  },

  async getTasksByProject(projectId) {
    const response = await tasksApi.getByProject(projectId);
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
    await tasksApi.update(id, data);
  },

  async updateTaskStatus(id, status) {
    await tasksApi.updateStatus(id, status);
  },

  async deleteTask(id) {
    await tasksApi.delete(id);
  },
};
