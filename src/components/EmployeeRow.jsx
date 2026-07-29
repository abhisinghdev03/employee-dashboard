function EmployeeRow({ employee, onRemove, onToggleActive }) {
  return (
    <tr>
      <td>{employee.id}</td>
      <td>
        {employee.firstName} {employee.lastName}
      </td>
      <td>{employee.department}</td>
      <td>
        <span
          style={{
            color: employee.active ? "#2e7d32" : "#757575",
            fontWeight: 600,
          }}
        >
          {employee.active ? "Active" : "On leave"}
        </span>
      </td>
      <td>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            style={{ width: "7em" }}
            onClick={() => onToggleActive(employee.id)}
          >
            {employee.active ? "Set on leave" : "Set active"}
          </button>
          <button
            style={{ width: "7em" }}
            onClick={() => onRemove(employee.id)}
          >
            Remove
          </button>
        </div>
      </td>
    </tr>
  );
}

export default EmployeeRow;
