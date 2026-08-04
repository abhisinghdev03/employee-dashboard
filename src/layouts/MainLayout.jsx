import { NavLink, Outlet } from "react-router-dom";

function MainLayout() {
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
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;