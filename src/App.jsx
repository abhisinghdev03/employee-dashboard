import Header from "./components/Header.jsx";
import StatsSection from "./components/StatsSection.jsx";

function App() {

  const user = { name: "Abhishek S" , role: "Admin", lastLogin: "2026-07-18T09:30:00" };

  return (
    <>
      <Header user={user}/>
      <StatsSection/>
    </>
  );
}

export default App;