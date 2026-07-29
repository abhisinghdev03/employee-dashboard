import Header from "./components/Header.jsx";
import StatsSection from "./components/StatsSection.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import { useState } from "react";

function App() {
  const user = {
    name: "Abhishek S",
    role: "Admin",
    lastLogin: "2026-07-18T09:30:00",
  };

  const [employees, setEmployees] = useState([
    { id: 1, firstName: "Priya",  lastName: "Sharma", department: "Engineering", active: true },
    { id: 2, firstName: "Rahul",  lastName: "Verma",  department: "Marketing",   active: true },
    { id: 3, firstName: "Anita",  lastName: "Desai",  department: "Engineering", active: false },
    { id: 4, firstName: "Vikram", lastName: "Singh",  department: "Finance",     active: true },
  ]);

  const [selectedDept, setSelectedDept] = useState("All");    // filters - dropdown
  const [activeOnly, setActiveOnly] = useState(false);  // filter - checkbox/toggle
  const [query, setQuery] = useState("");   // search-box filter

  const departments = ["All", "Engineering", "Marketing", "Finance"];
    
   // DERIVED, not stored in state — recomputed each render (best practice #4)
  const visibleEmployees = employees
  .filter(e => selectedDept === "All" || e.department === selectedDept)
  .filter(e => !activeOnly || e.active)
  .filter(e =>
    `${e.firstName} ${e.lastName}`.toLowerCase().includes(query.trim().toLowerCase())
  );

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

  return (
    <>
      <Header user={user} />
      <StatsSection employees={visibleEmployees} />
 
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
      <EmployeeList 
        employees={visibleEmployees}
        onRemove={handleRemove}
        onToggleActive={handleToggleActive}
        />
    </>
  );
}

export default App;
