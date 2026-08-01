const BASE = "https://dummyjson.com";

export async function fetchEmployees() {
  const res = await fetch(`${BASE}/users?limit=20`);
  if (!res.ok) throw new Error(`Failed to load employees (HTTP ${res.status})`);
  const data = await res.json();
  // Map DummyJSON's shape to YOUR app's shape — the "anti-corruption layer"
  return data.users.map(u => ({
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    department: u.company?.department ?? "Unknown",
    active: true,   // DummyJSON has no active flag; default it
  }));
}