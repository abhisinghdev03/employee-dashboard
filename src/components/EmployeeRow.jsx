function EmployeeRow({ employee, isSelected, onSelect, onRemove, onToggleActive }) {
  return (
    <tr
      onClick={() => onSelect(employee.id)}
      style={{ background: isSelected ? "#eef2ff" : "", cursor: "pointer" }}
    >
      <td>{employee.id}</td>
      <td>{employee.firstName} {employee.lastName}</td>
      <td>{employee.department}</td>
      <td>{employee.active ? "Active" : "On leave"}</td>
      <td>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{ width: "7em" }}
            onClick={(e) => { e.stopPropagation(); onToggleActive(employee.id); }}
          >
            {employee.active ? "Set on leave" : "Set active"}
          </button>
          <button
            style={{ width: "7em" }}
            onClick={(e) => { e.stopPropagation(); onRemove(employee.id); }}
          >
            Remove
          </button>
        </div>
      </td>
    </tr>
  );
}

export default EmployeeRow;
