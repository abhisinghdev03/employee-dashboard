import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { employeeApi } from "../services/employeeApi";

function EmployeeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await employeeApi.getById(id);   // id is a string — fine for URL building
        if (!ignore) setEmployee(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [id]);   // re-fetch whenever the URL id changes

  if (isLoading) return <p style={{ padding: 16 }}>Loading…</p>;
  if (error) return <p style={{ padding: 16, color: "crimson" }}>Error: {error}</p>;
  if (!employee) return null;

  return (
    <div style={{ padding: 16 }}>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>{employee.firstName} {employee.lastName}</h1>
      <p>ID: {employee.id}</p>
      <p>Department: {employee.department}</p>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Age: {employee.age}</p>
      <p>Status: {employee.active ? "Active" : "On leave"}</p>
      <p><Link to="/">Back to dashboard</Link></p>
    </div>
  );
}

export default EmployeeDetailPage;