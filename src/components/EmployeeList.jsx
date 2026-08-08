import EmployeeRow from "./EmployeeRow";

function EmployeeList({ employees = [], isLoading = false, 
    error = null, onRemove, onToggleActive,sort, order, onSort, }) {

  if (isLoading) return <p>Loading employees…</p>;
  if (error) return <p style={{ color: "crimson" }}>Failed to load: {error}</p>;
  if (employees.length === 0) return <p>No employees found.</p>;

  // Small helper to show the arrow on the active sort column
  const arrow = (field) =>
    sort === field ? (order === "asc" ? " ▲" : " ▼") : "";

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th onClick={() => onSort("firstName")} style={{ cursor: "pointer" }}>
            Name{arrow("firstName")}
          </th>
          <th onClick={() => onSort("company.department")} style={{ cursor: "pointer" }}>
            Department{arrow("company.department")}
          </th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <EmployeeRow 
            key={emp.id} 
            employee={emp} 
            onRemove={onRemove} 
            onToggleActive={onToggleActive}/>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeList;