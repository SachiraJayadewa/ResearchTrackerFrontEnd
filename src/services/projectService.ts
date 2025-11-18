import api from '../api/axiosConfig';
import { Project } from '../types';

export const projectService = {
  // GET /api/projects
  getAllProjects: async () => {
    const response = await api.get<Project[]>('/projects');
    return response.data;
  },

  // GET /api/projects/{id}
  getProjectById: async (id: string) => {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  // POST /api/projects (ADMIN Only)
  createProject: async (projectData: Partial<Project>) => {
    const response = await api.post<Project>('/projects', projectData);
    return response.data;
  },

  // DELETE /api/projects/{id} (ADMIN Only)
  deleteProject: async (id: string) => {
    await api.delete(`/projects/${id}`);
  },

  
  // PUT /api/projects/{id}/status?status=ACTIVE
  updateStatus: async (id: string, status: string) => {
    const response = await api.put(`/projects/${id}/status`, null, {
      params: { status } 
    });
    return response.data;
  }
};