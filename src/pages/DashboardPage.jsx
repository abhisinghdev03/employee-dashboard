import { useState, useEffect } from "react";
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

  /*
  const [employees, setEmployees] = useState();
  */
  const [employees, setEmployees] = useState([]);   // data
  const [isLoading, setIsLoading] = useState(true); // loading flag  
  const [error, setError] = useState(null);         // error holder

  //const saved = JSON.parse(localStorage.getItem("empDashFilters") || "{}");
  const [selectedDept, setSelectedDept] = useState("All");    // filters - dropdown
  const [activeOnly, setActiveOnly] = useState(false);  // filter - checkbox/toggle
  const [query, setQuery] = useState("");   // search-box filter
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const departments = ["All", "Engineering", "Marketing", "Finance"];

  // pagination settings
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 20;
  const totalPages = Math.ceil(total / pageSize);
  
  
  useEffect(() => {
    let ignore = false;

    // "When the dashboard appears, go get the employees from the server."
    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const data = debouncedQuery
          ? await employeeApi.search({ q: debouncedQuery, page, pageSize })
          : await employeeApi.getPage({ page, pageSize });
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
  }, [debouncedQuery, page]);   // re-fetch when search OR page changes

  // Debounce query → debouncedQuery, and reset to page 1 on new search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

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

    function handleResetFilters() {
        setQuery("");
        setSelectedDept("All");
        setActiveOnly(false);
    }


   // DERIVED, not stored in state — recomputed each render (best practice #4)
  const visibleEmployees = employees
    .filter(e => selectedDept === "All" || e.department === selectedDept)
    .filter(e => !activeOnly || e.active);

  return (
    <>
      <Header user={user} />
      <StatsSection employees={visibleEmployees} />

      <AddEmployeeForm onAdd={handleAddEmployee} />
      
      <div style={{ padding: 16, display: "flex", gap: 12, alignItems: "center" }}>

        {/* ---------- SEARCH BOX --------- */}
        <input  
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name…"
        />

        {/* --------- DROP-DOWN BOX --------- */}
        <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)}>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        {/* --------- CHECK BOX --------- */}
        <label>
          <input
            type="checkbox"
            checked={activeOnly}
            onChange={e => setActiveOnly(e.target.checked)}
          />
          {" "}Active only
        </label>

        <button onClick={handleResetFilters}>Reset</button>
      </div>

      {/* --------- EMPLOYEE TABLE --------- */}
      <div style={{ display: "flex", gap: 16, padding: 16 }}>
        <div style={{ flex: 2 }}>
          <EmployeeList
            employees={visibleEmployees}
            isLoading={isLoading} 
            error={error}
            onRemove={handleRemove}
            onToggleActive={handleToggleActive}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", padding: 16 }}>
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
          ← Prev
        </button>
        <span>Page {page} of {totalPages || 1}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}>
          Next →
        </button>
      </div>
    </>
  );
}

export default DashboardPage;