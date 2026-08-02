import { Routes, Route, NavLink } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import EmployeeDetailPage from "./pages/EmployeeDetailPage";

function App() {
  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: isActive ? "underline" : "none",
  });

  return (
    <>
      <nav style={{ padding: 16, borderBottom: "1px solid #ddd", display: "flex", gap: 16 }}>
        <NavLink to="/" style={linkStyle} end>Dashboard</NavLink>
        <NavLink to="/settings" style={linkStyle}>Settings</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/employees/:id" element={<EmployeeDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;