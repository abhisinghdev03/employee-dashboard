import Header from "./components/Header.jsx";
import StatsSection from "./components/StatsSection.jsx";
import EmployeeList from "./components/EmployeeList.jsx";

function App() {
  const user = {
    name: "Abhishek S",
    role: "Admin",
    lastLogin: "2026-07-18T09:30:00",
  };

  return (
    <>
      <Header user={user} />
      <StatsSection />
      <EmployeeList employees={[]} />
    </>
  );
}

export default App;
