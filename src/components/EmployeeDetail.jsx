function EmployeeDetail({ employee }) {
  if (!employee) return <p style={{ color: "#888" }}>Select an employee to see details.</p>;

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}>
      <h3>{employee.firstName} {employee.lastName}</h3>
      <p>ID: {employee.id}</p>
      <p>Department: {employee.department}</p>
      <p>Status: {employee.active ? "Active" : "On leave"}</p>
    </div>
  );
}

export default EmployeeDetail;