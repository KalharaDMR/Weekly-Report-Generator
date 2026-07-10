import axios from "../api/axios";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const ProjectService = {
  getAll(page = 1, limit = 100) {
    return axios.get(`/projects?page=${page}&limit=${limit}`, auth());
  },

  create(data: any) {
    return axios.post("/projects", data, auth());
  },

  update(id: string, data: any) {
    return axios.patch(`/projects/${id}`, data, auth());
  },

  remove(id: string) {
    return axios.delete(`/projects/${id}`, auth());
  },
};