function App() {
  const user = { name: "Abhi", role: "Admin", lastLogin: "2026-07-18T09:30:00" };
  const stats = { total: 248, active: 231, onLeave: 17 };

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

  const activePct = ((stats.active / stats.total) * 100).toFixed(1);

  return (
    <>
      <header style={{ display: "flex", justifyContent: "space-between", padding: 16 }}>
        <h1>Employee Dashboard</h1>
        <div>
          {user.name} ({user.role}) — last login {formatDate(user.lastLogin)}
        </div>
      </header>
      <section style={{ padding: 16 }}>
        <p>Total employees: {stats.total}</p>
        <p>Active: {stats.active} ({activePct}%)</p>
        <p>On leave: {stats.onLeave}</p>
      </section>
    </>
  );
}

export default App;