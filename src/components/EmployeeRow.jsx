import { Link } from "react-router-dom";

function EmployeeRow({ employee, onRemove, onToggleActive }) {
  return (
    <tr>
      <td>{employee.id}</td>
      <td>
        <Link to={`/employees/${employee.id}`}>
          {employee.firstName} {employee.lastName}
        </Link>
      </td>
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
