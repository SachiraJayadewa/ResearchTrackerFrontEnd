import api from '../api/axiosConfig';
import { Document } from '../types';

export const documentService = {
  // GET /api/documents - List all
  getAllDocuments: async () => {
    const response = await api.get<Document[]>('/documents');
    return response.data;
  },

  // POST /api/documents/{projectId}/upload/{userId}
  uploadDocument: async (docData: Partial<Document>, projectId: string, userId: string) => {
    const response = await api.post<Document>(`/documents/${projectId}/upload/${userId}`, docData);
    return response.data;
  },

  // DELETE /api/documents/{id} (Admin Only)
  deleteDocument: async (id: string) => {
    await api.delete(`/documents/${id}`);
  }
};