import axios from "../api/axios";

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const UserService = {
  getAll(page = 1, limit = 10, search = "") {
    return axios.get(
      `/users?page=${page}&limit=${limit}&search=${search}`,
      auth()
    );
  },

  updateRole(id: string, role: string) {
    return axios.patch(
      `/users/${id}/role`,
      { role },
      auth()
    );
  },

  updateStatus(id: string, status: string) {
    return axios.patch(
      `/users/${id}/status`,
      { status },
      auth()
    );
  },

  remove(id: string) {
    return axios.delete(
      `/users/${id}`,
      auth()
    );
  },
};