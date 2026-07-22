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

  const employees = [
    { id: 1, firstName: "Priya",  lastName: "Sharma", department: "Engineering", active: true },
    { id: 2, firstName: "Rahul",  lastName: "Verma",  department: "Marketing",   active: true },
    { id: 3, firstName: "Anita",  lastName: "Desai",  department: "Engineering", active: false },
    { id: 4, firstName: "Vikram", lastName: "Singh",  department: "Finance",     active: true },
  ];

  const [selectedDept, setSelectedDept] = useState("All");    // filters - dropdown
  const [activeOnly, setActiveOnly] = useState(false);  // filter - checkbox/toggle

  const departments = ["All", "Engineering", "Marketing", "Finance"];
    
   // DERIVED, not stored in state — recomputed each render (best practice #4)
  const visibleEmployees = employees
  .filter(e => selectedDept === "All" || e.department === selectedDept)
  .filter(e => !activeOnly || e.active);

  return (
    <>
      <Header user={user} />
      <StatsSection employees={visibleEmployees} />
      <div style={{ padding: 16 }}>
          <input  type="checkbox" id="activeOnly"
            onChange={e => setActiveOnly(e.target.checked)}
            checked={activeOnly}
          />
          <label htmlFor="activeOnly">Active only</label>
      </div>
      <div style={{paddingBottom: 16}}>
        <select value={selectedDept} 
          onChange={e => setSelectedDept(e.target.value)} 
          style={{ marginLeft: 12 }}>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <EmployeeList employees={visibleEmployees} />
    </>
  );
}

export default App;
