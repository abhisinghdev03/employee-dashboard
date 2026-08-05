import { apiClient } from "./apiClient";

const toEmployee = (u) => ({
  id: u.id,
  firstName: u.firstName,
  lastName: u.lastName,
  department: u.company?.department ?? "Unknown",
  active: true,

  // extra detail fields — available on the single-user endpoint
  email: u.email,
  phone: u.phone,
  age: u.age,
});

export const employeeApi = {
  async getPage({ page = 1, pageSize = 20 }) {
    const skip = (page - 1) * pageSize;
    const data = await apiClient.get(`/users?limit=${pageSize}&skip=${skip}`);
    return {
      employees: data.users.map(toEmployee),
      total: data.total,
    };
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
  async search({ q, page = 1, pageSize = 20 }) {
    const skip = (page - 1) * pageSize;
    const data = await apiClient.get(`/users/search?q=${encodeURIComponent(q)}&limit=${pageSize}&skip=${skip}`);
    return { employees: data.users.map(toEmployee), total: data.total };
  }
};