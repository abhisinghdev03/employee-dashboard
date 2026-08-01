import Header from "./components/Header.jsx";
import StatsSection from "./components/StatsSection.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import EmployeeDetail from "./components/EmployeeDetail.jsx"
import AddEmployeeForm from "./components/AddEmployeeForm.jsx";
import { useState, useEffect } from "react";
import { fetchEmployees } from "./services/employeeApi";

function App() {
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

  useEffect(() => {
    // "When the dashboard appears, go get the employees from the server."
    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);                         // runs whether success or failure
      }
    }
    load();
  }, []);   // [] = fetch once when the component appears

  const saved = JSON.parse(localStorage.getItem("empDashFilters") || "{}");

  const [selectedDept, setSelectedDept] = useState(saved.selectedDept ?? "All");    // filters - dropdown
  const [activeOnly, setActiveOnly] = useState(saved.activeOnly ?? false);  // filter - checkbox/toggle
  const [query, setQuery] = useState(saved.query ?? "");   // search-box filter

  const departments = ["All", "Engineering", "Marketing", "Finance"];
    
   // DERIVED, not stored in state — recomputed each render (best practice #4)
  const visibleEmployees = employees
    .filter(e => selectedDept === "All" || e.department === selectedDept)
    .filter(e => !activeOnly || e.active)
    .filter(e =>
      `${e.firstName} ${e.lastName}`.toLowerCase().includes(query.trim().toLowerCase())
    );

  const [selectedId, setSelectedId] = useState(null);

  // Derived — the selected employee object, found by id. NOT separate state.
  const selectedEmployee = employees.find(e => e.id === selectedId) ?? null;

  function handleSelect(id) {
    setSelectedId(id);
  }

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  function handleResetFilters() {
    setQuery("");
    setSelectedDept("All");
    setActiveOnly(false);
  }

  function handleRemove(id) {
    setEmployees(prev => prev.filter(e => e.id !== id));
  }

  function handleAllOnLeave() {
    setEmployees(prev => prev.map(e => ({ ...e, active: false })));
  }

  function handleToggleActive(id) {
    setEmployees(prev =>
      prev.map(e => e.id === id ? { ...e, active: !e.active } : e)
    );
  }

  function handleAddEmployee(employee) {
    setEmployees(prev => [...prev, employee]);   // new array, appended
  }

  // preserve applied filter on browser refresh
  useEffect(() => {
    localStorage.setItem("empDashFilters", JSON.stringify({ selectedDept, activeOnly, query }));
  }, [selectedDept, activeOnly, query]);   // re-sync storage whenever any filter changes

  // display employee count in browser tab
  useEffect(() => {
    document.title = `Employees (${employees.length})`;
  }, [employees.length]);   // re-sync when the count changes

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
          onChange={handleQueryChange}
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
        <button onClick={handleAllOnLeave}>Set all on leave</button>
      </div>

      {/* --------- EMPLOYEE TABLE --------- */}
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 2 }}>
          <EmployeeList
            isLoading={isLoading} 
            error={error}
            employees={visibleEmployees}
            selectedId={selectedId}
            onSelect={handleSelect}
            onRemove={handleRemove}
            onToggleActive={handleToggleActive}
          />
        </div>
        <div style={{ flex: 1 }}>
          <EmployeeDetail employee={selectedEmployee} />
        </div>
      </div>
    </>
  );
}

export default App;
