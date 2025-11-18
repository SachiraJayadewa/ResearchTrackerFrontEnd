import api from '../api/axiosConfig';
import { Milestone } from '../types';

export const milestoneService = {
  // GET /api/milestones
  getAllMilestones: async () => {
    const response = await api.get<Milestone[]>('/milestones');
    return response.data;
  },

  // POST /api/milestones/{projectId}/create/{createdById}
  createMilestone: async (milestoneData: Partial<Milestone>, projectId: string, userId: string) => {
    const response = await api.post<Milestone>(
      `/milestones/${projectId}/create/${userId}`, 
      milestoneData
    );
    return response.data;
  },

  // PUT /api/milestones/{id}/complete
  markAsCompleted: async (id: string) => {
    const response = await api.put<Milestone>(`/milestones/${id}/complete`);
    return response.data;
  },

  // DELETE /api/milestones/{id} (Admin Only)
  deleteMilestone: async (id: string) => {
    await api.delete(`/milestones/${id}`);
  }
};