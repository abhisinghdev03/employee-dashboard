import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { employeeApi } from "../services/employeeApi";
import Header from "../components/Header";
import StatsSection from "../components/StatsSection";
import EmployeeList from "../components/EmployeeList";
import AddEmployeeForm from "../components/AddEmployeeForm";

function DashboardPage (){
  const user = {
    name: "Abhishek S",
    role: "Admin",
    lastLogin: "2026-07-18T09:30:00",
  };

  const [searchParams, setSearchParams] = useSearchParams();

  // --- Read ALL view state from the URL (defaults + conversion) ---
  const q     = searchParams.get("q")     ?? "";
  const sort  = searchParams.get("sort")  ?? "";
  const order = searchParams.get("order") ?? "asc";
  const page  = Number(searchParams.get("page")) || 1;  // pagination
  const pageSize = 20;

  // --- Data state ---
  const [employees, setEmployees] = useState([]);   // data
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // loading flag  
  const [error, setError] = useState(null);         // error holder

  const totalPages = Math.ceil(total / pageSize);

  // --- Helper: update params, preserving others, resetting page on filter changes ---
  function updateParams(changes, resetPage = true) {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      Object.entries(changes).forEach(([k, v]) => {
        if (v === "" || v == null) next.delete(k);
        else next.set(k, v);
      });
      if (resetPage) next.set("page", "1");
      return next;
    });
  }

  // --- Search: local input buffer + debounce → writes to URL ---
  const [queryInput, setQueryInput] = useState(q);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateParams({ q: queryInput });
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryInput]);

  // --- Sorting: toggle order if same field, else asc ---
  function handleSort(field) {
    const newOrder = sort === field && order === "asc" ? "desc" : "asc";
    updateParams({ sort: field, order: newOrder });
  }

  // --- Fetch: depends on ALL url params ---
  useEffect(() => {
    let ignore = false;

    // "When the dashboard appears, go get the employees from the server."
    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await employeeApi.list({ q, sort, order, page, pageSize });
        if (!ignore) {
          setEmployees(data.employees);
          setTotal(data.total);
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [q, sort, order, page]);   // re-fetch when search OR page changes

  // --- Local mutations (still local-only;
  function handleAddEmployee(employee) {
      setEmployees(prev => [...prev, employee]);   // new array, appended
  }

  function handleRemove(id) {
      setEmployees(prev => prev.filter(e => e.id !== id));
  }

  function handleToggleActive(id) {
      setEmployees(prev =>
          prev.map(e => e.id === id ? { ...e, active: !e.active } : e)
      );
  }

  return (
    <>
      <Header user={user} />
      <StatsSection employees={employees} />

      <AddEmployeeForm onAdd={handleAddEmployee} />
      
      <div style={{ padding: 16, display: "flex", gap: 12, alignItems: "center" }}>

        {/* ---------- SEARCH BOX --------- */}
        <input  
          type="text"
          value={queryInput}
          onChange={e => setQueryInput(e.target.value)}
          placeholder="Search by name…"
        />
      </div>

      {/* --------- EMPLOYEE TABLE --------- */}
      
      <EmployeeList
        employees={employees}
        isLoading={isLoading} 
        error={error}
        onRemove={handleRemove}
        onToggleActive={handleToggleActive}
        sort={sort}
        order={order}
        onSort={handleSort}
      />
       
      <div style={{ display: "flex", gap: 12, alignItems: "center", padding: 16 }}>
        <button onClick={() => updateParams({ page: page - 1 }, false)} disabled={page === 1}>Prev</button>
        <span>Page {page} of {totalPages || 1}</span>
        <button onClick={() => updateParams({ page: page + 1 }, false)} disabled={page >= totalPages}>Next</button>
      </div>
    </>
  );
}

export default DashboardPage;