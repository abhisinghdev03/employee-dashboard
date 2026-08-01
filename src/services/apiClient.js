// src/services/apiClient.js
const BASE_URL = import.meta.env.VITE_API_URL;   // from .env, like @Value

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} on ${endpoint}`);
  }
  // 204 No Content has no body to parse
  return res.status === 204 ? null : res.json();
}

export const apiClient = {
  get:    (endpoint)        => request(endpoint),
  post:   (endpoint, body)  => request(endpoint, { method: "POST",   body: JSON.stringify(body) }),
  put:    (endpoint, body)  => request(endpoint, { method: "PUT",    body: JSON.stringify(body) }),
  delete: (endpoint)        => request(endpoint, { method: "DELETE" }),
};