import { apiClient } from "./apiClient";

const toEmployee = (u) => ({
  id: u.id,
  firstName: u.firstName,
  lastName: u.lastName,
  department: u.company?.department ?? "Unknown",
  active: true,
});

export const employeeApi = {
  async getAll() {
    const data = await apiClient.get("/users?limit=20");
    return data.users.map(toEmployee);
  },
  async getById(id) {
    return toEmployee(await apiClient.get(`/users/${id}`));
  },
  async create(employee) {
    return apiClient.post("/users/add", employee);
  },
  async remove(id) {
    return apiClient.delete(`/users/${id}`);
  },
};