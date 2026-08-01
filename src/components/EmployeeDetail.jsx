import { useState, useEffect } from "react";
import { employeeApi } from "../services/employeeApi";

function EmployeeDetail({ selectedId }) {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // No selection → clear the panel, nothing to fetch
    if (selectedId == null) {
      setEmployee(null);
      return;
    }

    let ignore = false; // this run's "am I still relevant?" flag

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await employeeApi.getById(selectedId);
        if (!ignore) setEmployee(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    load();

    // Cleanup: if selectedId changes (or unmount) before this fetch returns,
    // mark it stale so its late response is discarded.
    return () => {
      ignore = true;
    };
  }, [selectedId]); // re-fetch whenever the selection changes

  // Guard skeleton (L6): no-selection → loading → error → data
  if (selectedId == null) {
    return <p style={{ color: "#888" }}>Select an employee to see details.</p>;
  }
  if (isLoading) return <p>Loading details…</p>;
  if (error) return <p style={{ color: "crimson" }}>Failed to load: {error}</p>;
  if (!employee) return null; // brief gap between selection and loading turning on

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}>
      <h3>{employee.firstName} {employee.lastName}</h3>
      <p>ID: {employee.id}</p>
      <p>Department: {employee.department}</p>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Age: {employee.age}</p>
      <p>Status: {employee.active ? "Active" : "On leave"}</p>
    </div>
  );
}

export default EmployeeDetail;