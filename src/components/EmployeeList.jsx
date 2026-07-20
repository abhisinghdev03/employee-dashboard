function EmployeeList({ employees = [], isLoading = false, error = null }) {
  if (isLoading) return <p>Loading employees…</p>;
  if (error) return <p style={{ color: "crimson" }}>Failed to load: {error}</p>;
  if (employees.length === 0) return <p>No employees found.</p>;

  return (
    <p>{employees.length} employees loaded. (Table arrives in Lesson 7.)</p>
  );
}

export default EmployeeList;
