import api from '../api/axiosConfig';
import { Project } from '../types';

// Note: We export 'projectService' as an object containing the functions
export const projectService = {
  getAllProjects: async () => {
    const response = await api.get<Project[]>('/projects');
    return response.data;
  },
  
  getProjectById: async (id: string) => {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  createProject: async (projectData: Partial<Project>) => {
    const response = await api.post<Project>('/projects', projectData);
    return response.data;
  },

  deleteProject: async (id: string) => {
    await api.delete(`/projects/${id}`);
  }
};