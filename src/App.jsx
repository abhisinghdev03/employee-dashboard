import Header from "./components/Header.jsx";
import StatsSection from "./components/StatsSection.jsx";
import EmployeeList from "./components/EmployeeList.jsx";

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

// ...
<EmployeeList employees={employees} />

  return (
    <>
      <Header user={user} />
      <StatsSection employees={employees} />
      <EmployeeList employees={employees} />
    </>
  );
}

export default App;
