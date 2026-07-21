function EmployeeRow({ employee }) {
  return (
    <tr>
      <td>{employee.id}</td>
      <td>{employee.firstName} {employee.lastName}</td>
      <td>{employee.department}</td>
      <td>
        <span style={{ color: employee.active ? "#2e7d32" : "#757575", fontWeight: 600 }}>
          {employee.active ? "Active" : "On leave"}
        </span>
      </td>
    </tr>
  );
}

export default EmployeeRow;