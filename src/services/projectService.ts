import axios from "axios";

const API_BASE = "http://localhost:8080/api/projects";

export const getAllProjects = async (token: string) => {
  const response = await axios.get(API_BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
