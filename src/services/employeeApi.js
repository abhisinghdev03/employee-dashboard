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
  async list({ q = "", sort = "", order = "asc", page = 1, pageSize = 20 }) {
    const skip = (page - 1) * pageSize;
    
    const params = new URLSearchParams();
    params.set("limit", pageSize);
    params.set("skip", skip);
    if (sort) {
      params.set("sortBy", sort);
      params.set("order", order);
    }

    // Use the search endpoint when there's a query, else the plain list
    const endpoint = q
      ? `/users/search?q=${encodeURIComponent(q)}&${params}`
      : `/users?${params}`;

    const data = await apiClient.get(endpoint);
    return {
      employees: data.users.map(toEmployee),
      total: data.total,
    };
  },

  async getById(id) {
    return toEmployee(await apiClient.get(`/users/${id}`));
  }
};