import EmployeeRow from "./EmployeeRow";

function EmployeeList({ employees = [], isLoading = false, error = null }) {
  if (isLoading) return <p>Loading employees…</p>;
  if (error) return <p style={{ color: "crimson" }}>Failed to load: {error}</p>;
  if (employees.length === 0) return <p>No employees found.</p>;

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Department</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <EmployeeRow key={emp.id} employee={emp} />
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeList;